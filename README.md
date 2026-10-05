# NuruWomen

**NuruWomen** is a privacy-first women’s health knowledge commons for Africa, built during **Hack4Freedom Nairobi 2026**.

Women can ask sensitive health questions anonymously, explore community knowledge, browse recent research, and see where women’s health evidence is strong or still missing.

**Live platform:** https://nuruwomen.onrender.com/  
**Repository:** https://github.com/Ann20-dev/NuruWomen

> **Current status:** Deployed hackathon build on Render. NuruWomen is an educational and community platform, not a medical service. It does not replace diagnosis, emergency care, or advice from a qualified healthcare professional.

## What NuruWomen does

NuruWomen brings together privacy-aware question asking, bilingual health-topic analysis, research evidence, community discussion, and research-gap visualization in one platform.

### Key features

- **Ask anonymously** — users can submit sensitive women’s health questions without creating an account or providing an email or phone number.
- **Privacy check before publishing** — the platform scans questions for identifying information and can suggest a redacted version before a public post is made.
- **English and Kiswahili support** — language cues help route questions and analysis in either language.
- **Five women’s health areas** — menstrual health, sexual and reproductive health, healthy ageing, postpartum health, and mental health.
- **Safety cues** — the analysis layer can identify safety-sensitive content and surface cautionary guidance. These rules are supportive checks, not diagnosis.
- **Community questions** — anonymous questions can be explored by topic, with new questions published through Nostr.
- **Three clearly separated knowledge layers** — lived experience, clinical-response content, and evidence are presented separately so users can understand what kind of information they are reading.
- **Knowledge library** — educational women’s health articles can be searched and browsed by topic.
- **Research catalogue** — the platform includes 20 research references from 2020 onward across the five health areas, with links back to source records.
- **Research blind spots** — an interactive coverage view uses 265 imported country/topic rows across 53 African countries to show where evidence is available and where gaps remain, with a Kenya-focused section.
- **Nostr-based publishing** — questions, responses, and helpful votes can be published to public Nostr relays without conventional user accounts.
- **One-service deployment** — the React frontend, Node/Express gateway, and Python/FastAPI analysis service run together in a Docker-based Render deployment.

## How the platform works

```text
User
  ↓
React + TypeScript interface
  ↓
Node.js / Express gateway
  ↓
Python / FastAPI analysis service
  ↓
Privacy, safety, topic and evidence analysis

Community publishing
  ↓
Nostr relays
```

The public web service also serves the built React application and exposes the application API through the same deployment.

## Main pages

| Route | Purpose |
| --- | --- |
| `/` | Home and project overview |
| `/ask` | Ask an anonymous health question and run privacy/topic checks |
| `/questions` | Browse community questions by topic |
| `/library` | Search educational women’s health content |
| `/research` | Browse the research catalogue |
| `/blind-spots` | Explore research coverage and evidence gaps across Africa |
| `/about` | Learn about the project, privacy model and roadmap |
| `/api/health` | Deployment health check |

## Technology stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

### Backend
- Node.js
- Express
- TypeScript
- Zod validation

### AI and analysis
- Python
- FastAPI
- TF-IDF + logistic regression classifier
- Privacy redaction rules
- Safety rules
- Topic classification
- Evidence retrieval
- English/Kiswahili routing

### Freedom technology
- Nostr
- Relay-based publishing
- One-time signing keys for anonymous public posts

### Data and research
- Women’s health research catalogue
- Clinical evidence metadata
- Country/topic coverage datasets
- Kenya-focused health indicators
- Research-gap visualization

### Deployment
- Docker
- Render
- GitHub

## Project structure

| Folder/file | Purpose |
| --- | --- |
| `src/` | React application |
| `public/` | Static assets |
| `server/` | Node/Express API gateway and SPA serving |
| `ai/app/` | FastAPI analysis service |
| `ai/data/` | Taxonomy, safety, privacy and classifier resources |
| `ai/evidence/` | Research manifest, bibliography and index |
| `data/` | Canonical country/topic and evidence datasets |
| `scripts/sync-data.mjs` | Validates and regenerates frontend research data |
| `scripts/start.py` | Starts and supervises Python + Node services |
| `docs/` | Deployment, integration and validation documentation |
| `Dockerfile` | Unified container build |
| `render.yaml` | Render Blueprint configuration |

## Local development

### Requirements

- Node.js 24
- Python 3.12
- npm

Install and build:

```bash
npm ci
npm --prefix server ci

python3 -m venv .venv
.venv/bin/python -m pip install -r ai/requirements-dev.txt

npm run build
npm --prefix server run build
```

Run the complete built application:

```bash
export WHC_API_KEY="$(python3 -c 'import secrets; print(secrets.token_urlsafe(48))')"
export PORT=10000
export NODE_ENV=production

.venv/bin/python scripts/start.py
```

Open:

```text
http://localhost:10000
```

For frontend development with hot reload:

```bash
npm run dev
```

## Deploy on Render

The current hackathon deployment is live at:

**https://nuruwomen.onrender.com/**

The repository is configured as a single Docker web service through `render.yaml`.

For a new deployment:

1. Connect the GitHub repository to Render.
2. Choose **Blueprint** or create a Docker Web Service.
3. Use `./Dockerfile`.
4. Set the health-check path to `/api/health`.
5. Configure a secure `WHC_API_KEY` if it is not generated through the Blueprint.
6. Deploy and verify `/api/health`.

## Validation

Useful project checks:

```bash
npm run build
npm --prefix server run build
npm audit --omit=dev
npm --prefix server audit --omit=dev
npm test
```

The final integration build passed the frontend TypeScript/Vite production build and the Node server build. Production dependency audits returned no known vulnerabilities at the final validation checkpoint.

Additional validation notes are available in:

- `docs/VALIDATION.md`
- `docs/INTEGRATION_REVIEW.md`

## Important privacy and medical limitations

- Public Nostr posts cannot be guaranteed removable once published.
- Automated privacy scans can miss identifying information.
- Users should not submit names, phone numbers, medical records, addresses, or other identifying details.
- Current privacy and safety checks are rule-based assistance, not guarantees of anonymity or medical safety.
- The current build does not provide diagnosis or emergency care.
- No clinician identity-verification system is active in this build.
- Research references are educational resources and do not automatically make platform summaries clinically approved.
- No database, private consultation service, wallet/payment system, RBAC system, or professional-registration workflow is currently claimed.

## Current hackathon status

The deployed build integrates work across:

- Frontend development
- Backend development
- AI / machine learning
- Data science
- UI / UX
- Privacy and cybersecurity
- Research and documentation

The platform is now deployed for demonstration, testing, and continued open development.

## Next steps

- Add verified clinician workflows and human moderation
- Expand Kiswahili review and add more African languages
- Strengthen privacy and safety testing
- Expand the research catalogue
- Improve evidence retrieval and citation
- Add more country-specific women’s health datasets
- Improve Nostr identity and community workflows
- Explore appropriate Bitcoin and Lightning use cases
- Conduct structured user testing with women and health professionals
- Adopt a clear repository-wide open-source license

## Rights and research

The original AI component’s `LICENSE` and `NOTICE` remain in the repository. A repository-wide license should be agreed by contributors before making broad licensing claims about all frontend and backend code.

Rights to third-party research remain with their respective authors and publishers.

