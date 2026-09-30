# Nuru AI service 0.2.0

Start with `../README_START_HERE.md` and `../docs/TEST_AND_INSTALL.md` for the Windows and Linux setup commands. This folder is the complete updated Python AI contribution, suitable for a synthetic demonstration only.

Run commands from this `ai` directory. Install `requirements-lock.txt` in a Python 3.12 virtual environment. Run `python -m pytest -q`, `python -m scripts.nuru_demo` and `python -m scripts.smoke_http` using that environment. The server entry point is `app.main:create_app --factory`; `WHC_API_KEY` is generated locally by `scripts.new_key`.

The original endpoints remain: `/v1/privacy`, `/v1/classify`, `/v1/retrieve`, `/v1/analyze`, `/v1/translation-check`, `/v1/gaps`. The new `/v1/nuru/analyze` route takes title/body fields, uses existing Shakespeare topic slugs, and returns separate redaction previews. All processing routes require `X-API-Key`. `/health` reports status without authentication. See `docs/openapi.json`.

This is not a diagnostic agent or a privacy enforcement system. No database, outbound LLM call, arbitrary translation generator, public relay publisher or production submission backend is included. Every shipped educational card and language rule remains unreviewed. Approved card results are empty by default and publication is always disallowed by the analysis contract.

The five-class TF-IDF/logistic-regression baseline and synthetic analytics demonstration remain available. The Nuru detailed-topic matcher is separate deterministic routing, not an 18-class trained model. The mapping and shared rules are exported by `python -m scripts.export_nuru_rules`; run it while this folder is beside `shakespeare/` in the correction package.

Read `../docs/TEAM_HANDOFF.md`, `../docs/FILE_GUIDE.md` and `../docs/VERIFICATION.md`. Other documents here explain the retained model, translation, retrieval and analytics limitations.
