# Folder layout and file guide

This folder is an AI/ML contribution, not the complete team application. Keep the outer layout when running the provided cross-language checks or regenerating rules.

| Folder | Role |
|---|---|
| `ai/app/` | Python API and service implementations |
| `ai/data/` | Synthetic examples, review-aware card fixtures, glossary and routing/alert rules |
| `ai/tests/` | Python regression and boundary tests |
| `ai/scripts/` | Build, evaluation, contract export, demo and HTTP smoke commands |
| `ai/examples/` | Requests and a Python API client |
| `ai/reports/` | Test/demo/evaluation evidence |
| `ai/docs/` | Detailed retained service documentation and OpenAPI request contract |
| `shakespeare/overlay/src/lib/nuru/` | Exactly six app utility files, preserving their target paths |
| `shakespeare/verification/` | Standalone Node checks, outside the app test suite |
| `scripts/` | Guarded installer and original-file hashes |
| `docs/` | Your current setup, responsibilities, changes and verification |

After the team merges, the app keeps its existing `src/pages`, `src/components`, `src/hooks` and other folders. Your contribution occupies `ai/` (at the location agreed with backend) and the six utility paths. The other engineers decide backend, UI and deployment structure.

## Every shipped file

| Path relative to Nuru_AI_Corrections | What it does |
|---|---|
| `.gitignore` | Excludes dependency folders, caches and actual secrets from the correction repository. |
| `LICENSE` | Apache 2.0 for the newly authored correction contribution; existing project licensing is unchanged. |
| `NOTICE` | Scope of authorship and distinction between prototype data, third-party sources and the existing app. |
| `README_START_HERE.md` | Read first: scope, included deliverables and your explanation to the team. |
| `ai/.dockerignore` | Excludes local files from the optional container build context. |
| `ai/.env.example` | Documents environment variable names and a deliberately unusable key placeholder; never a working secret. The app does not automatically read it. |
| `ai/.github/workflows/ci.yml` | Retained standalone Python CI example. In a monorepo, the integration owner must place/configure a root workflow; not run remotely here. |
| `ai/.gitignore` | Excludes local environments, caches, secrets and other machine-specific files from Git. |
| `ai/CONTRIBUTING.md` | How to propose changes, run checks, keep sensitive data out and request appropriate review. |
| `ai/Dockerfile` | Optional Python 3.12 container recipe running as a non-root user. Not executed in this verification environment. |
| `ai/LICENSE` | Apache License 2.0 for this authored code and synthetic demonstration material. |
| `ai/NOTICE` | Authorship/licensing scope and third-party source distinction. |
| `ai/README.md` | Service entry point and pointer to the current Windows/Linux setup guide. |
| `ai/app/__init__.py` | Marks the application package and declares its version. |
| `ai/app/config.py` | Resolves bundled data paths, validates the service credential and restricts the release to demo mode. |
| `ai/app/main.py` | Builds FastAPI, loads the classifier on startup, enforces authentication/body limits, prevents input echo in validation errors and connects the endpoints to services. |
| `ai/app/schemas.py` | Validates JSON fields, text limits, languages and synthetic metadata. Rejects unexpected fields. |
| `ai/app/services/__init__.py` | Marks the service modules as a Python package. |
| `ai/app/services/analytics.py` | Builds the synthetic content-gap board with minimum-cell and complementary-count suppression. It does not authorise public analytics. |
| `ai/app/services/nuru.py` | Explicit detailed-topic suggestions and five-category routing with legacy detail compatibility; unsupported/ambiguous retrieval abstains. |
| `ai/app/services/privacy.py` | Detects selected identifiers and suggests redaction; returns spans for user confirmation. Does not guarantee anonymity. |
| `ai/app/services/retrieval.py` | Ranks evidence cards in the selected language and checks version-bound approval metadata. Separates draft demo cards from approved results. |
| `ai/app/services/safety.py` | Checks broad draft English/Swahili alert patterns. No match does not mean a person is safe. |
| `ai/app/services/topics.py` | Fits TF-IDF plus logistic regression, routes questions into five topics and reports weak/unknown inputs where detected. Scores are not calibrated probabilities. |
| `ai/app/services/translation.py` | Checks English/Swahili editorial pairs for stale versions, numbers and negation; suggests glossary entries. It does not perform general translation. |
| `ai/compose.yaml` | Optional local container configuration, environment settings and localhost port binding. |
| `ai/data/evidence_cards.json` | 12 draft editions: six subjects in two languages, source links, versions and empty review fields. Editorial/clinical/language reviewers own eventual approval. |
| `ai/data/gap_demo.json` | Synthetic metadata only, demonstrating a sufficiently large gap cell and suppression of a small cell. |
| `ai/data/glossary_sw.json` | Draft bilingual terminology for editorial checks; fluent reviewers should revise and approve it. |
| `ai/data/nuru_taxonomy.json` | Versioned English/Swahili keywords, 18 existing slugs and nullable broad-category mapping. |
| `ai/data/safety_rules.json` | Draft alert patterns and response notices; changes require clinical and language review before any real-world use. |
| `ai/data/taxonomy.json` | Four routing labels and their definitions; AI engineer and data scientist agree changes. |
| `ai/data/topic_test.json` | 60 separate synthetic examples used in development evaluation. Related language variants stay together by family; this is not an untouched blind benchmark. |
| `ai/data/topic_train.json` | 120 synthetic English, Swahili and mixed-language examples used to fit the classifier. |
| `ai/docs/DATA_SCIENTIST_HANDOFF.md` | Independent benchmark work, error analysis, analytics definitions and collaboration responsibilities. |
| `ai/docs/FILE_GUIDE.md` | Points to this complete correction-package inventory. |
| `ai/docs/INTEGRATION.md` | Points to the app-specific route and ownership contract. |
| `ai/docs/MODEL_CARD.md` | Model design, synthetic data, development history, performance limits and intended use. |
| `ai/docs/SECURITY_AND_REVIEW.md` | Existing controls, remaining gaps and the reviews needed before a real-user pilot. |
| `ai/docs/SOURCES.md` | Official technical/health reference links used for this handoff. Linked source material is not automatically licensed by this repository. |
| `ai/docs/TRANSLATION_WORKFLOW.md` | Swahili-first human translation/review workflow, version linkage and adding later languages. |
| `ai/docs/openapi.json` | Exported machine-readable request contract. Response schemas are generic; use the documented field definitions and example outputs too. |
| `ai/examples/analyze_en.json` | English request to paste into `/docs` or send from the backend. |
| `ai/examples/analyze_sw.json` | Swahili request to test the bilingual flow. |
| `ai/examples/client.py` | Python HTTP client example for a running local API; read its environment settings before running. |
| `ai/examples/nuru_analyze_en.json` | Fictional English title/body input for the new endpoint. |
| `ai/examples/nuru_analyze_sw.json` | Fictional Swahili title/body input for the new endpoint. |
| `ai/examples/translation_check.json` | An editorial translation-check request. |
| `ai/pyproject.toml` | Pytest configuration: where tests live and how results are reported. |
| `ai/reports/EVALUATION.md` | Human-readable synthetic topic evaluation and observed errors. |
| `ai/reports/VERIFICATION.md` | Points to the current correction-package verification results. |
| `ai/reports/demo_output.json` | Real outputs from bundled synthetic requests; useful to frontend/backend engineers. |
| `ai/reports/evaluation.json` | Machine-readable metrics and error records for the current classifier. |
| `ai/reports/http_smoke.json` | Results from the real local HTTP server check. |
| `ai/reports/initial_baseline_evaluation.json` | Earlier synthetic baseline evaluation retained for transparency; the evaluation set was inspected in development. |
| `ai/reports/model_build.json` | Current five-topic model build metadata and training-data digest; not clinical validation. |
| `ai/reports/nuru_demo_response.json` | Actual synthetic response used by the browser parser checks; no credential included. |
| `ai/requirements-dev.txt` | Adds test and HTTP-client dependencies to the runtime list. |
| `ai/requirements-lock.txt` | Complete dependency versions from the tested environment; use for the first install. |
| `ai/requirements.txt` | Pinned direct dependencies needed by the running API and classifier. |
| `ai/scripts/__init__.py` | Makes the scripts runnable using `python -m scripts.<name>`. |
| `ai/scripts/demo.py` | Exercises the API internally with synthetic examples and writes outputs; `python -m scripts.demo`. |
| `ai/scripts/evaluate.py` | Measures topic predictions by language and writes evaluation reports; `python -m scripts.evaluate`. |
| `ai/scripts/export_nuru_rules.py` | Regenerates the browser aiRules.ts from the three Python JSON catalog/rule files. |
| `ai/scripts/export_openapi.py` | Regenerates the API schema after endpoint changes; `python -m scripts.export_openapi`. |
| `ai/scripts/new_key.py` | Generates a new local API credential; `python -m scripts.new_key`. |
| `ai/scripts/nuru_demo.py` | Runs an authenticated synthetic Nuru request internally and saves the response for contract checks. |
| `ai/scripts/smoke_http.py` | Starts a real temporary local server, checks HTTP authentication and a Swahili request, then stops the server; `python -m scripts.smoke_http`. |
| `ai/scripts/train.py` | Fits the tiny model and writes training metadata; `python -m scripts.train`. The API rebuilds the model at startup. |
| `ai/tests/conftest.py` | Shared test application, temporary credential and API-client fixtures. |
| `ai/tests/test_analytics.py` | Consent filtering, minimum cells, complementary suppression and duplicate IDs. |
| `ai/tests/test_api.py` | Authentication, input validation, oversized bodies, non-echoing errors and demo-mode boundaries. |
| `ai/tests/test_nuru.py` | Regression cases for the reviewed bugs, bilingual routing, auth, field limits and unsupported-topic retrieval. |
| `ai/tests/test_privacy.py` | Selected identifier formats, redaction overlap and Unicode offsets. |
| `ai/tests/test_retrieval.py` | Draft exclusion, approval/version/digest checks, translated-edition linkage, expiry and withdrawal. |
| `ai/tests/test_safety.py` | Selected English/Swahili alert phrases and the distinction between no match and safety. |
| `ai/tests/test_topics.py` | Topic behaviour, an unknown input and training/evaluation family separation. |
| `ai/tests/test_translation.py` | Version, number, negation and draft-review behaviour. |
| `docs/CHANGES.md` | Explains why each AI correction was made and what remains owned by teammates. |
| `docs/TEAM_HANDOFF.md` | Exact backend routes, frontend state/confirmation steps, ownership boundaries and outstanding blockers. |
| `docs/TEST_AND_INSTALL.md` | Commands to install Python, run tests, try the API and safely merge the six AI app files. |
| `docs/VERIFICATION.md` | Actual passed checks, the independently confirmed dashboard type error and untested areas. |
| `scripts/apply_shakespeare.py` | Preview or install only the six approved AI utility paths; checks baseline hashes and backs up replacements. |
| `scripts/patch_manifest.json` | Hashes of the original three replacement targets and an allowlist of three additions. |
| `shakespeare/overlay/src/lib/nuru/aiClient.ts` | Browser-to-backend analysis and translation checker with runtime response validation, timeout and stale-result invalidation. |
| `shakespeare/overlay/src/lib/nuru/aiRules.ts` | Generated browser constants from the Python topic/safety data; regenerate rather than editing separately. |
| `shakespeare/overlay/src/lib/nuru/classify.ts` | Replacement detailed matcher: complete-word bilingual rules, privacy cleaning and existing TOPICS objects. |
| `shakespeare/overlay/src/lib/nuru/privacy.ts` | Replacement local PII helper: scoped spans, overlap handling and exact redaction preview; no anonymity guarantee. |
| `shakespeare/overlay/src/lib/nuru/safety.ts` | Replacement draft alert scanner, matching shared rules and English/Swahili demo notices. |
| `shakespeare/verification/check.mjs` | Standalone Node 24 synthetic regression and Python/browser contract checks; makes no real network calls. |
| `docs/FILE_GUIDE.md` | This inventory: purpose of every shipped file, grouped by folder. |

## Added in the five-topic release

| File | What it does |
|---|---|
| `ai/app/services/demo_topics.py` | Explicit bilingual five-category routing, overlapping categories, abortion subtopic, ambiguous-loss and outside-scope flags. |
| `ai/examples/five_topic_demo.json` | Thirteen fictional requests with expected categories, covering both languages and overlaps. |
| `ai/scripts/five_topic_demo.py` | Runs those requests against the API locally and checks the expected category lists. |
| `ai/reports/five_topic_demo.json` | Actual saved responses from that demonstration. No service key is included. |
| `shakespeare/overlay/src/lib/nuru/demoTopics.ts` | Local frontend five-category catalog and cue matcher, separate from the existing granular topic helper. |
| `docs/UPDATE_GUIDE.md` | Website findings, exact corrections, team integration sequence, hosting/voice boundaries. |
| `docs/TEAM_STEPS.md` | Practical role-by-role integration checklist and completion conditions. |

## Final contribution folder

```text
Nuru_AI_Corrections/
  README_START_HERE.md
  LICENSE
  NOTICE
  ai/
    app/                 # Python API and processing services
    data/                # Five-topic catalog, rules and fictional fixtures
    examples/            # Requests to try locally
    scripts/             # Training, demonstrations and schema export
    tests/               # Python checks
    reports/             # Actual test/demo/evaluation outputs
    docs/                # Model, translation, security and API notes
    requirements*.txt
    pyproject.toml
    Dockerfile
    compose.yaml
  shakespeare/
    overlay/src/lib/nuru/
      privacy.ts
      classify.ts
      safety.ts
      aiRules.ts
      aiClient.ts
      demoTopics.ts
    verification/check.mjs
  scripts/
    apply_shakespeare.py
    patch_manifest.json
  docs/
    UPDATE_GUIDE.md
    TEAM_STEPS.md
    TEAM_HANDOFF.md
    TEST_AND_INSTALL.md
    FILE_GUIDE.md
    CHANGES.md
    VERIFICATION.md
```

The Python service is the complete `ai/` folder. Keep it together: `app/` expects `data/` beside it. The six TypeScript files belong in the existing app's `src/lib/nuru/` directory. The ZIP does not include or replace the full website. Read `TEST_AND_INSTALL.md` before merging.
