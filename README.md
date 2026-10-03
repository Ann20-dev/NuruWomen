# NuruWomen: one-folder Render deployment

NuruWomen is a privacy-first women's health knowledge commons for Africa. This consolidation combines the supplied React interface, Node gateway, Python analysis service, clinical reference manifest and data-science coverage snapshots.

**Release status: early preview.** Anonymous questions, responses and helpful votes are published to public Nostr relays under one-time keys that are discarded after signing. Local session copies disappear after reload or 15 minutes of inactivity. No clinician has been verified by this build, and bundled summaries have no clinical approval.

## Deploy on Render

1. Extract this folder. Use its **contents as the repository root**: `Dockerfile`, `render.yaml`, `package.json`, `src/`, `server/`, `ai/` and `data/` must be at the root.
2. Push to your GitHub repository, preferably on a review branch. Preserve the original contributions in Git history. Do not copy `.env`, `node_modules`, virtual environments or build output.
3. Open Render, choose **New > Blueprint**, connect the repository and select the branch. Render reads `render.yaml` and creates one Docker web service. The Blueprint generates `WHC_API_KEY` automatically.
4. Let the deploy finish, then open the Render URL and `/api/health`. Healthy response: `status: ok`, `ai: ready`.
5. Test `/ask` with invented examples in English and Kiswahili, `/research` for 20 source records, `/blind-spots` for the imported coverage dashboard, and refresh a nested route.

Manual alternative: **New > Web Service**, Language **Docker**, Dockerfile `./Dockerfile`, Health Check Path `/api/health`. Leave Docker Command blank. Set a randomly generated `WHC_API_KEY` of at least 32 ASCII characters. The image already sets the other runtime defaults. Do not choose Static Site: the app needs its gateway and Python service.

The Blueprint uses the Free plan for a demonstration. Free services sleep after inactivity and have usage limitations. Render deployment was not performed in this workspace; Docker is not installed here, so the actual image build remains a deployment check. The application builds and runtime were verified locally without Docker.

## Local development

Prerequisites: Node 24, Python 3.12, npm. In the project root:

```bash
npm ci
npm --prefix server ci
python3 -m venv .venv
.venv/bin/python -m pip install -r ai/requirements-dev.txt
npm run build:all
```

Run the complete built app (Bash/WSL):

```bash
export WHC_API_KEY="$(python3 -c 'import secrets; print(secrets.token_urlsafe(48))')"
export PORT=10000
export NODE_ENV=production
.venv/bin/python scripts/start.py
```

Open `http://localhost:10000`. For hot reload, keep the supervisor running with `PORT=3000` and start `npm run dev` in another terminal. Vite uses port 8080 and proxies `/api` to port 3000. For local development set `NODE_ENV=development`; production origin checks accept same-origin requests only unless configured otherwise.

With Docker installed:

```bash
docker build -t nuruwomen .
docker run --rm -p 10000:10000 -e WHC_API_KEY="$WHC_API_KEY" nuruwomen
```

## Structure

| Folder/file | Purpose |
| --- | --- |
| `src/`, `public/`, `index.html` | React interface and assets |
| `server/` | Validated, rate-limited public gateway and SPA serving |
| `ai/app/`, `ai/data/` | Internal FastAPI analysis, bilingual rules, synthetic classifier and evidence drafts |
| `ai/evidence/` | Supplied research manifest, bibliography and index |
| `data/` | Canonical imported country/topic CSV snapshots |
| `scripts/sync-data.mjs` | Validates and regenerates frontend research/coverage data before builds |
| `scripts/start.py` | Starts Python on loopback, waits for readiness, then starts Node; supervises shutdown/failure |
| `docs/` | Integration decisions, deployment guide, validation results and retained source designs |
| `Dockerfile`, `render.yaml` | One-container, one-service deployment |

## Features and limits

- Five broad AI categories: menstrual health, sexual health, healthy ageing, postpartum and mental health. Fine-grained browser labels are additional subtopics.
- Regex-style privacy redaction suggestions and safety cues; these are incomplete, unreviewed rules, not diagnosis or anonymity guarantees.
- TF-IDF + logistic regression on synthetic English/Kiswahili training examples, plus explicit bilingual routing cues. No generative AI provider or chatbot answer generation.
- Three presentation layers: lived experience, clinical responses, evidence drafts.
- Research catalogue: 20 imported bibliographic references dated 2020 onward. No full-text PDFs are included and article summaries are not automatically generated from these references.
- Country coverage: 265 imported rows for five topics and 53 countries, rendered as an interactive gap heatmap with a Kenya indicator focus. The data scientist's extraction notebook is retained at `docs/source-contributions/nuru-data.ipynb`. This is not live analytics or disease prevalence.
- Nostr event formats are documented in `NIP.md`. Questions, answers and helpful votes publish live to public relays; profile reads are relay-backed when available.
- No working database, RBAC, payment, wallet, private consultation, moderator queue or professional registration process is claimed.

## Validate

```bash
npm test
npm --prefix server run typecheck
npm --prefix server run build
cd ai
../.venv/bin/python -m pytest -q
```

Review `docs/VALIDATION.md` and `docs/INTEGRATION_REVIEW.md`. Existing Python tests cover the API contract, privacy, safety, routing, evidence, translations and aggregates. They do not certify medical safety.

## Rights

The original AI component's `LICENSE` and `NOTICE` are retained. No repository-wide license was supplied for the frontend/backend contributions. Confirm contributor permissions and a shared license before describing the whole repository as open source. Third-party research rights remain with their authors/publishers.
