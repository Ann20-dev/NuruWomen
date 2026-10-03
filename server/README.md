# NuruWomen API gateway

A small Node/Express/TypeScript server that sits between the browser and the
private Python AI service in `ai/`.

The AI service does privacy redaction, safety checks and bilingual
(English/Kiswahili) topic routing. It requires an `X-API-Key` and must never be
reachable from a browser. This gateway holds that key, exposes two same-origin
routes, and serves the built React app.

## Read this first: what this does not do

**Questions are still published to public Nostr relays.** When someone presses
"Post anonymously" on the Ask page, the frontend signs a kind 1 event with
`useNuruPublish` and sends it to the configured public relays. That is
permanent and public. The gateway is not involved in publishing.

The privacy check here is advisory. It suggests redactions and the person
decides whether to use them. It cannot guarantee anonymity: it matches
patterns, and it misses names, places and stories it has no pattern for.

The AI handoff (`docs/ai-handoff/TEAM_HANDOFF.md`, deleted from `main`, see
`docs/backend-review-notes.md`) says personal questions should go through a
private, moderated submission workflow and not to public relays. That workflow,
its database, and clinician verification are not built. They are planned for
after the hackathon.

## What it does

- Accepts `POST /api/ai/nuru/analyze` and `POST /api/ai/translation-check`.
- Validates each body against a strict Zod schema that mirrors
  `ai/app/schemas.py`: same fields, same limits, counted in Unicode codepoints
  as Python's `len()` does. Unknown fields are rejected, not forwarded.
- Adds `X-API-Key` and calls exactly one fixed upstream path per route, with an
  8 second deadline. No caller-controlled URLs, no general proxy.
- Returns the service's JSON unchanged on success.
- Maps every failure to a generic error with a `request_id`. Upstream bodies
  and caller input are never echoed back.
- Rate limits the AI routes to 30 requests per IP per 5 minutes (in memory,
  per instance).
- Rejects browser requests from origins not in `ALLOWED_ORIGINS`.
- Sends `Cache-Control: no-store`, `X-Content-Type-Options: nosniff` and
  `Referrer-Policy: no-referrer` on every response.
- Serves the Vite build from `../dist` with a fallback to `index.html` for
  client-side routes.

### What it logs

Request ids, route names, failure reasons and HTTP status codes. Never request
or response text, never the API key, never IP addresses. The rate limiter keeps
per-IP counters in memory for the 5 minute window only.

## Routes

| Method | Path | Upstream | Notes |
|---|---|---|---|
| `GET` | `/api/health` | none | `{"status":"ok"}`. Does not call the AI service. |
| `POST` | `/api/ai/nuru/analyze` | `/v1/nuru/analyze` | `title` (≤120), `content` (≤2879), `response_language` (`en` \| `sw`), `synthetic_only: true`, optional `include_demo_cards` |
| `POST` | `/api/ai/translation-check` | `/v1/translation-check` | `source_text`, `target_text` (≤3000 each), `source_version`, `translated_from_version`, `synthetic_only: true` |

Request bodies are capped at 64 KiB.

### Errors

Every error body has the shape
`{"error": {"code", "message"}, "request_id"}`.

| Status | `code` | Cause |
|---|---|---|
| 400 | `invalid_request` | Body failed the schema. `fields` lists which. |
| 400 | `invalid_json` | Body is not valid JSON. |
| 403 | `forbidden_origin` | `Origin` header not in `ALLOWED_ORIGINS`. |
| 413 | `payload_too_large` | Body over 64 KiB. |
| 415 | `invalid_request` | Unsupported charset or encoding. |
| 429 | `rate_limited` | Over the per-IP limit. |
| 500 | `server_error` | Our fault, including the AI service rejecting our key. |
| 502 | `ai_error` | AI service returned an error or unreadable response. |
| 503 | `ai_unavailable` | AI service unreachable. |
| 504 | `ai_timeout` | AI service did not answer within 8 seconds. |

## Environment variables

The server validates these at startup and exits with a list of problems if any
are wrong. See `server/.env.example`.

| Variable | Required | Description |
|---|---|---|
| `AI_SERVICE_URL` | yes | Base URL of the Python service, e.g. `http://127.0.0.1:8000`. |
| `WHC_API_KEY` | yes | Shared secret. Must equal `WHC_API_KEY` on the Python service. At least 32 printable ASCII characters, no whitespace. |
| `PORT` | no | Listen port. Defaults to `3000`. Render sets this for you. |
| `ALLOWED_ORIGINS` | no | Comma-separated browser origins, e.g. `https://nuru.example.org`. Empty skips the check. Set it in production. |
| `NODE_ENV` | no | `development`, `production` or `test`. |

None of these may be given a `VITE_` prefix. Vite inlines every `VITE_`
variable into the public JavaScript bundle.

## Running locally

You need Node 22.9 or newer (for `--env-file-if-exists`) and Python 3.12.

### 1. Generate a shared key

```sh
python3 -c "import secrets; print(secrets.token_urlsafe(48))"
```

Use the same value in both services below. Do not commit it.

### 2. Start the AI service

From `ai/`:

```sh
python3.12 -m venv .venv
.venv/bin/pip install -r requirements-lock.txt
WHC_API_KEY=<key> WHC_DEMO_MODE=true \
  .venv/bin/python -m uvicorn app.main:create_app --factory \
  --host 127.0.0.1 --port 8000 --no-access-log
```

The AI service does not read a `.env` file; pass the variables on the command
line or export them. Bind to `127.0.0.1`, not `0.0.0.0`, so it is not reachable
from your network.

### 3. Start the gateway

From `server/`:

```sh
cp .env.example .env    # then set WHC_API_KEY to the key from step 1
npm install
npm run dev             # tsx watch, reloads on change
```

`npm run build && npm start` runs the compiled version instead.

### 4. Start the frontend

From the repository root:

```sh
npm run dev
```

Open http://localhost:8080. Vite proxies `/api` to `http://127.0.0.1:3000`, so
the browser only ever talks to its own origin.

### Check it works

```sh
curl -s -X POST localhost:3000/api/ai/nuru/analyze \
  -H 'Content-Type: application/json' \
  --data @../ai/examples/nuru_analyze_sw.json
```

The response's `privacy.content.redacted_text` should read
`... Naitwa [NAME], simu [PHONE].`

### Typecheck

```sh
npm --prefix server run typecheck   # gateway
npx tsc --noEmit                    # frontend, from the root
```

## Deploying on Render

Two services in the **same Render region**, so they share a private network:

1. A **Private Service** for the Python AI app. It has no public URL.
2. A **Web Service** for this gateway. It serves the frontend and the API on
   one public origin.

Create the private service first, because the web service needs its address.

### Private Service: AI app

| Setting | Value |
|---|---|
| Type | Private Service |
| Runtime | Docker |
| Root directory | `ai` |
| Dockerfile path | `./Dockerfile` |
| Environment | `WHC_API_KEY` = the generated key, `WHC_DEMO_MODE` = `true` |

The Dockerfile runs uvicorn on port 8000 as a non-root user with access logs
off. Once deployed, copy the internal address from the service's **Connect**
panel. It looks like `http://<service-name>:8000`.

### Web Service: gateway and frontend

| Setting | Value |
|---|---|
| Type | Web Service |
| Runtime | Node |
| Root directory | (repository root) |
| Build command | `npm ci --include=dev && npm run build && npm --prefix server ci --include=dev && npm --prefix server run build` |
| Start command | `npm --prefix server start` |
| Health check path | `/api/health` |

Environment variables:

| Variable | Value |
|---|---|
| `AI_SERVICE_URL` | The private service's internal address, e.g. `http://nuru-ai:8000` |
| `WHC_API_KEY` | The same key as the private service |
| `ALLOWED_ORIGINS` | The web service's public URL, e.g. `https://nuruwomen.onrender.com`, plus any custom domain |
| `NODE_ENV` | `production` |
| `NODE_VERSION` | `22` or newer |

The build has to run from the repository root because the gateway serves the
frontend from `../dist` relative to `server/dist`. `--include=dev` is needed
because Vite and TypeScript are dev dependencies, and npm skips those when
`NODE_ENV=production`.

Store `WHC_API_KEY` as a secret in both services, or in a shared environment
group. Never set it, or `AI_SERVICE_URL`, as a `VITE_` variable or in the root
`.env`.

### Notes

- `trust proxy` is set to exactly one hop, which matches Render's load
  balancer. Rate limiting depends on this being right.
- The rate limiter is in memory. With more than one gateway instance each
  counts separately, so the effective limit multiplies. Use a shared store if
  you scale out.
- To rotate the key, set the new value on the private service first, then on
  the web service. Requests fail with a 500 in between.
