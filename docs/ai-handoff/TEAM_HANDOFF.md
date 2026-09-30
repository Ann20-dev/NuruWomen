# Integration and ownership

This document is an integration contract, not a claim that the backend or UI has already been implemented. The reviewed Shakespeare export is a React/Vite app, not a Python host. Uploading the `ai` folder to the builder alone will not run FastAPI.

## Exact file boundary

AI/ML engineer owns the updated `ai/` service and these six app utility changes:

| App destination | Action | Purpose |
|---|---|---|
| `src/lib/nuru/privacy.ts` | Replace | Positioned local identifier suggestions and redaction |
| `src/lib/nuru/classify.ts` | Replace | Bilingual explicit topic suggestions using existing `TOPICS` objects |
| `src/lib/nuru/safety.ts` | Replace | Shared draft alert rules with optional `en`/`sw` notice |
| `src/lib/nuru/aiRules.ts` | Add | Generated browser copy of Python taxonomy/safety JSON |
| `src/lib/nuru/demoTopics.ts` | Add | Five-category bilingual catalog and explicit multi-label suggestions |
| `src/lib/nuru/aiClient.ts` | Add | Typed, runtime-validated app-backend requests and stale-result control |

No page, component, publishing hook, auth hook, relay provider, dashboard fixture, reviewer registry, build configuration or `topics.ts` is changed. Existing calls to `scanForPii`, `redactPii`, `classifyTopics` and `scanSafety` retain compatible signatures. Local scanner spans are UTF-16; Python spans are Unicode codepoints. Display Python's `redacted_text` directly; do not slice a JS string with Python offsets. `DEMO_TOPICS` includes English and draft Kiswahili category labels; the frontend owns complete UI localisation. The original detailed-topic labels remain unchanged.

## Backend engineer + AI/ML engineer

Implement two **same-origin application routes**, chosen to match the supplied browser client:

| Browser route | Private service route | Body |
|---|---|---|
| `POST /api/ai/nuru/analyze` | `POST /v1/nuru/analyze` | `title`, `content`, `response_language`, `synthetic_only`, optional `include_demo_cards` |
| `POST /api/ai/translation-check` | `POST /v1/translation-check` | `source_text`, `target_text`, `source_version`, `translated_from_version`, `synthetic_only` |

Forward only schema-approved fields. Add `X-API-Key` from server environment to the private service call. Never include it in `VITE_*`, browser code or the forwarded response. Set timeouts and body limits, return generic errors and `Cache-Control: no-store`, disable raw request/response text logging, and apply appropriate access controls, origin/CSRF controls and rate limits. Do not allow an arbitrary upstream URL or forward every service endpoint through an unrestricted proxy. Keep the demo on synthetic inputs. `synthetic_only` is a caller declaration, not an automatic detector of real data.

All original `/v1/*` endpoints remain for server-to-server work. The new endpoint returns `schema_version: nuru-ai-v2`, separate title/body privacy, safety, five-category and legacy routing, a review summary, the independent five-class baseline, evidence and `publication_allowed: false`. See `ai/docs/openapi.json` and `ai/reports/nuru_demo_response.json`. This release's OpenAPI defines requests; the example and client parser document the Nuru response projection. The backend should preserve the service JSON response.

The backend, with cybersecurity/full-stack, must implement the private consent/moderation/submission workflow and enforce publication rules server-side. Neither the browser nor AI output is a publication authority. Do not send personal questions to public Nostr relays. Public reviewed educational cards are a separate publisher workflow.

## Frontend engineer + AI/ML engineer

Wire `analyzeNuru` or `createLatestAnalyzer` into `AskPage` and any private reply form only after the backend route exists. Do not call FastAPI directly with its service key.

Sequence for the form:

1. On every title, content or language edit, clear displayed server results and confirmation, and immediately call `invalidate()` on the per-component analyzer. Also invalidate on unmount.
2. After a debounce or an explicit check button, pass the exact current title/body, selected response language and synthetic flag. Treat pending/error/null as unreviewed, never cleared.
3. Display title/body redaction previews separately. Only replace fields after the user explicitly accepts. Recheck the resulting edited fields.
4. Display five-category suggestions from `routing.category_ids` using `DEMO_TOPICS` exported by `demoTopics.ts`. These IDs are not old detailed slugs and must not go through `getTopic`. Keep optional `routing.suggestions` in a separate legacy section; only those use `getTopic`. Show `subtopic_ids`, `scope_status` and `review.reason_codes`. Let the user/moderator confirm topics. Counts are cue counts, not probabilities. `classification` is a separate experimental model output, not the source for diagnosis.
5. Display matched concern notices without claiming comprehensive clinical triage. An empty array does not prove safety. Remove wording suggesting the tool has guaranteed anonymity or that it is safe to publish.
6. Only render `approved_matches` as reviewed content. `demo_matches` need a visible synthetic/unreviewed label and must not acquire the existing “Clinically reviewed” badge. Render bodies as text or with the app's vetted sanitised renderer.
7. Send any eventual submission to the controlled private backend workflow after its required confirmations. The existing `useNuruPublish` call must not be the submission step for personal health questions.

Suggested replacements owned by frontend/design:

- “Privacy check passed” → “No identifiers matched these limited rules. Review your wording.”
- “Anonymous version applied” → “Redaction suggestions applied. Please review.”
- “PII stripped” / “we'll catch it” → a plain statement that automated checks can miss identifying details.
- Remove “You can still post your question” from the current safety banner until the private submission flow exists.

Minimal client use in a React component (illustrative wiring, not an installed page change):

```ts
const analyzer = useMemo(() => createLatestAnalyzer(), []);
// Call this immediately in title/body/language edit handlers:
analyzer.invalidate();
setResult(null);
setConfirmed(false);
// On a check action, using a snapshot of the CURRENT synthetic fields:
const result = await analyzer.analyze({
  title, content, response_language: language,
  synthetic_only: true, include_demo_cards: true,
});
if (result) setResult(result);
// useEffect cleanup: analyzer.invalidate();
```

Also handle exceptions visibly and reset pending state only for the current request. This sample intentionally omits UI-specific state/import details, owned by the frontend engineer. The new client is not automatically imported into existing pages.

## Data scientist + AI/ML engineer

Agree `taxonomy.json`, the five-category source of truth. `nuru_taxonomy.json` maps the old detailed tags for compatibility. The statistical model has five classes. The explicit routing layer can return several categories, a separate abortion subtopic or no category. The first category in catalog order is used for retrieval only when scope/wording permits. Clinical diagnoses must never be inferred from these labels.
Evaluate held-out English, Swahili and mixed-language cases independently: false positives, missed concerns, name removal errors, topic accuracy/coverage, retrieval relevance and translation omissions. Include negated/historical/quoted symptoms and indirect identifying details. Separate clinical and linguistic review from software evaluation. The earlier inspected synthetic evaluation set is not a blind benchmark.

The existing `/v1/gaps` demonstration stays metadata-only with consent/suppression, and is not wired to the app's hard-coded dashboard. DS owns real aggregation definitions and evaluation; AI/ML engineer provides service interfaces. The aggregate demo now uses minimum 25 and complementary suppression. The dashboard's hard-coded live claims still require a separate correction by its owner.

## Cybersecurity + backend/full-stack

Confirm no personal text reaches public relays, logs, analytics or external models. Review storage/retention/consent before real users. Implement trusted reviewer authorisation: a self-supplied clinical tag is not proof of a clinician. Review the demo clinician fixtures and badges. The AI package cannot verify credentials or enforce trust inside unchanged Nostr readers.

## Translation and optional Moonshot

`checkTranslationDraft` checks a translation that already exists. It does not generate Swahili text or verify medical equivalence. Version changes invalidate earlier review. Keep clinical approval and language approval separate and tied to exact content. Add language packs and qualified reviewers before enabling another language.

No Moonshot key is required or included. A later optional server-only provider can draft translations of approved/public educational source text for human review. Confirm the actual provider URL, model identifier and terms first; “Key M3” is not sufficient configuration. Never use a builder's API key as evidence that the generated runtime includes a model integration. Do not send raw private health questions to an external provider by default.

## Team acceptance demonstration

Use fictional text only. Check English/Swahili results, edit-during-request cancellation, unavailable service, unresolved identifiers, unsupported topics, a stale translation, empty approved retrieval and an attempted private-question submission. Backend/security should verify that no question event is published and no raw question enters logs. The demo should honestly show draft/unreviewed status and no live population statistics.

## v2 fields for this release

- `routing.category_ids`: zero or more of the five stable identifiers, in catalog order.
- `routing.categories`: ID, explicit cue count and matched dictionary cues. They are not extracted personal facts.
- `routing.subtopic_ids`: currently `abortion` only; do not display it as a sixth top-level category.
- `routing.scope_status`: `in_demo`, `mixed_scope` or `needs_human_routing`.
- `routing.ambiguous_pregnancy_loss_wording`: prompt a reviewer to clarify meaning without inferring intent.
- `routing.suggestions`: old detailed slugs, preserved for compatible app consumers.
- `review.required`: always true. `review.reason_codes` explain the needed workflow, and `knowledge_status` indicates whether approved content is available.
- `review.clinical_authority_verified_by_ai`: always false. Authorisation belongs to the trusted backend.

Serve the Python API and browser client from this same release. The parser rejects v1 responses. `GET /v1/nuru/topics` requires the service key and should only be called server-side; `DEMO_TOPICS` is available locally for frontend labels without another HTTP route. None of these suggestions is automatically persisted or published.
