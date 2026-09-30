# Nuru Commons: AI/ML contribution

Version 0.3.0 · 30 September 2026 · Synthetic demo only

This folder updates your AI contribution for the five-topic demo. It does not replace the Shakespeare app. The original export and live website were reviewed; no live changes or public posts were made.

## Start here

1. Read `docs/UPDATE_GUIDE.md` for the changes, website findings and the order of team integration.
2. Follow `docs/TEST_AND_INSTALL.md` to test locally before sharing.
3. Share this entire ZIP. Frontend/backend engineers should read `docs/TEAM_HANDOFF.md`; the data scientist should read `ai/docs/DATA_SCIENTIST_HANDOFF.md`.
4. Check `docs/VERIFICATION.md` for actual test results and outstanding app issues.

## The five categories

| Display label | Stable API identifier | Existing library area |
|---|---|---|
| Menstrual health | `menstrual_health` | `menstrual-health` |
| Healthy aging | `healthy_aging` | `healthy-ageing` |
| Postpartum | `postpartum` | `postpartum` |
| Sexual health | `sexual_health` | `sexual-health` |
| Mental health | `mental_health` | `mental-health` |

Abortion is a subtopic under sexual health. Add the mental-health category only when the text explicitly discusses emotions, mental health or support. This is a navigation label, never a claim that abortion implies mental illness. Ambiguous pregnancy-loss language needs a human reviewer.

The healthy-aging category includes menopause/perimenopause education. Menstrual health includes explicitly named PCOS/endometriosis/fibroids as editorial routes; the software does not diagnose these conditions. Postpartum questions can also receive a mental-health label. Questions outside these five categories remain reviewable; safety checks still run.

## What is included

- `ai/`: FastAPI service, five-class TF-IDF/logistic-regression baseline, explicit bilingual multi-label routing, privacy suggestions, draft concern flags, exact-language reviewed-card retrieval, translation checks and synthetic aggregate calculations.
- `shakespeare/overlay/`: six AI utilities only. Three replacements and three additions. `demoTopics.ts` gives the frontend the new five-category catalog; existing detailed tags remain a compatibility layer.
- `scripts/`: a dry-run-first installer that accepts the original export or the previous 0.2 AI utilities, backs up existing files and refuses unrecognised changes.
- `docs/`: role handoff, changes, test steps and per-file explanations.
- `shakespeare/verification/`: runnable local utility/contract checks.

No UI page, backend publishing flow, reviewer registry, Nostr provider, application configuration or teammate-owned topic catalog was edited. Installing the utilities does not wire the website to Python or switch its visible 18-topic chooser to five categories.

## Software and APIs

Use VS Code, Python 3.12, Node.js 24 and Git. Windows PowerShell commands are included. Git Bash or WSL may be needed for the app's existing Unix-style npm script. No GPU, database, Moonshot key or voice API is needed to test this folder. Docker is optional and untested here.

Translation checks assess supplied drafts; they do not generate or certify translations. All Kiswahili labels/examples need human review. The evidence fixtures contain placeholders, not medical guidance. The service always returns `publication_allowed: false`.

## Explain your role

“My contribution is an AI assistance service for topic labeling, privacy suggestions, concern flags, reviewed-content retrieval and English/Kiswahili translation checks. It supports our five demo categories and tells the app when human review or approved content is missing. The data scientist evaluates its performance; the frontend and backend engineers integrate it.”
