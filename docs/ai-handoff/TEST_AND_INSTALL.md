# Test your contribution, then merge the AI files

## 1. Open the correct folder

Extract the ZIP. Open **Nuru_AI_Corrections** in VS Code. Open a PowerShell terminal. The current folder should contain `ai`, `shakespeare`, `scripts` and `README_START_HERE.md`. These commands are not for the Python `>>>` prompt.

Check the installed interpreters:

```powershell
py -3.12 --version
node --version
```

Python should be 3.12.x and Node should be 24.x. If a command is not recognised, install that interpreter and reopen VS Code. A Python extension alone does not install Python. No NVIDIA GPU is required.

## 2. Install Python dependencies and run the checks

From **Nuru_AI_Corrections**:

```powershell
cd ai
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-lock.txt
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m scripts.nuru_demo
.\.venv\Scripts\python.exe -m scripts.smoke_http
cd ..
node shakespeare/verification/check.mjs
```

Expected: 106 Python tests, the HTTP smoke and 37 browser utility/contract checks pass. See `VERIFICATION.md` for the current totals. A known Starlette/httpx deprecation warning is non-failing. `nuru_demo` writes synthetic output consumed by the Node checks; it prints no API key. Neither command publishes to a relay. Passing software tests does not validate medicine or translation quality.

The explicit `.venv` interpreter path avoids PowerShell activation-policy issues. Select that interpreter in VS Code using **Python: Select Interpreter**.

Linux/macOS alternative, from `ai`:

```bash
python3.12 -m venv .venv
.venv/bin/python -m pip install -r requirements-lock.txt
.venv/bin/python -m pytest -q
.venv/bin/python -m scripts.nuru_demo
.venv/bin/python -m scripts.smoke_http
cd ..
node shakespeare/verification/check.mjs
```

## 3. Try the service yourself

From the `ai` folder in PowerShell:

```powershell
$env:WHC_API_KEY = (& .\.venv\Scripts\python.exe -m scripts.new_key)
$env:WHC_DEMO_MODE = "true"
$env:WHC_API_KEY
.\.venv\Scripts\python.exe -m uvicorn app.main:create_app --factory --host 127.0.0.1 --port 8000 --no-access-log
```

Copy the displayed temporary key locally. Do not put it in screenshots, Git, Vite variables, messages or browser app source. Keep the terminal open. Visit `http://127.0.0.1:8000/docs`, click **Authorize**, paste the key, and test **POST /v1/nuru/analyze** with `ai/examples/nuru_analyze_sw.json` or `nuru_analyze_en.json`. The documentation page may need internet for Swagger assets. The smoke/demo scripts work without those browser assets.

Expect separate title/content redaction previews, five-category suggestions plus separate legacy app slugs, a Swahili notice when selected rules match, and only draft cards when requested. `publication_allowed` stays false. Test **POST /v1/translation-check** with `examples/translation_check.json`; it checks a supplied translation and does not create one.

Stop with Ctrl+C. A 401 means the key is missing/wrong; 422 means the input violates the schema; 413 means the body is over 64 KiB. The Nuru endpoint requires explicit `en` or `sw`, `synthetic_only: true`, title 1-120 codepoints, content 1-2879 codepoints. Use invented examples only.

## 4. Preview the Shakespeare changes

Make a Git branch or local copy of the team's exported app. Return to **Nuru_AI_Corrections**. Replace the example path below with the actual app folder containing `package.json`:

```powershell
py -3.12 scripts/apply_shakespeare.py "C:\Users\USER\Downloads\nuru-commons"
```

The script lists three replacements and three additions. It writes nothing without `--apply`. It checks original-export or known v0.2 AI hashes before doing anything. If the app has changed, stop and ask the owners to merge the six files manually; do not force overwrite their work.

Apply to your local branch/copy when ready:

```powershell
py -3.12 scripts/apply_shakespeare.py "C:\Users\USER\Downloads\nuru-commons" --apply
```

It backs up every existing target file in a timestamped sibling folder (three originals on first install, five utilities on a v0.2 upgrade). It does not change pages, hooks, `topics.ts`, package configuration or publishing. To undo, restore the backed-up files and delete only files newly created by that installation, or revert your Git commit.

Copy the updated **`ai/`** folder into the agreed team repo location. If an `ai/` folder already exists, merge on your branch after comparing changes; do not overwrite a teammate's work. Exclude `.venv`, caches, `.env` and secrets when sharing. The ZIP already excludes these.

## 5. Verify the merged app

In the app folder run:

```powershell
npm test
```

The exported project's script installs dependencies, type-checks, lints, runs tests and builds. Its final `cp` command is Unix shell syntax; on Windows use Git Bash/WSL, or have the integration engineer agree a portable script. We do not change their package.json here.

The utility tests alone do not prove the whole UI is connected. Use the teammate checklist before a live demo. In particular, do not try the original “Post anonymously” button with real health text: this package does not alter that publishing hook.

## 6. Share your work

Send the entire **Nuru_AI_Corrections.zip** to your team. Ask the backend/frontend engineers to read `docs/TEAM_HANDOFF.md`; give the data scientist the taxonomy, evaluation data and limitations. Share generated service credentials separately only when an authorised deployment actually needs them. Each engineer can generate a separate local key.

## Five-topic walkthrough

After the basic checks, run `python -m scripts.five_topic_demo` with your virtual-environment interpreter from `ai/`. It runs the 13 fictional requests in `examples/five_topic_demo.json` and saves `reports/five_topic_demo.json`. Check every category, both languages, postpartum/mental-health overlap, abortion/support overlap and an unrelated question. Use any `request` object from that file in the interactive API docs.

For the five-topic local browser helper use `classifyDemoTopics`; `classifyTopics` intentionally remains the old detailed-tag compatibility helper. Installing this ZIP alone does not change the visible category buttons.
