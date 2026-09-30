# Verification: AI-only correction package

30 September 2026 · Python service 0.3.0 · Linux, Python 3.12.14, Node 24.19.0

| Check | Result |
|---|---|
| Python suite including the Nuru bridge regressions | **106 passed**, one non-failing Starlette/httpx deprecation warning |
| Node utility/contract suite | **37 passed**, using actual Python synthetic response output |
| Real HTTP smoke | Health 200, unauthenticated analysis 401, authenticated generic and Nuru analysis 200 |
| Six supplied TypeScript files plus imported original topic types | Strict TypeScript check passed |
| ESLint on the six AI files | Passed |
| Existing app Vitest tests, run independently | 3 files, **5 tests passed** |
| Vite production bundle, run independently | Passed |
| Full exported `npm test` gate | **Blocked** by the existing dashboard type error described below |
| Model evaluation, rerun | 60 inspected synthetic evaluation cases: EN 85%, SW 95%, mixed 90%; not an independent benchmark |
| Guarded overlay installer | Previous 0.2 overlay upgraded on the validation copy; fresh original preview/apply verified; repeat installation rejected without changing files |
| Five-topic API demonstration | 13 fictional English/Kiswahili/overlap/unknown cases passed and responses saved |

## The existing app blocker

With the same resolved dependencies, both the unmodified app copy and the corrected app copy fail full TypeScript checking at **`src/pages/BlindSpotsPage.tsx:92`**. The Recharts tooltip formatter declares `value: number`, but the current formatter contract can supply an undefined or other supported value type. TypeScript reports TS2322.

This is outside AI/ML engineer’s AI patch. The dashboard/frontend owner should narrow/format the supported value type before numeric use, then rerun the whole `npm test` script. We did not change this file. The whole app must not be described as passing its complete test gate.

The focused AI check used the installed TypeScript compiler with `--ignoreConfig --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --lib ESNext,DOM --skipLibCheck` and the six AI files. The normal app compiler also reached the dashboard error without reporting an AI-file type error. The normal script stopped before lint/tests/build, so those were run separately for the scope described above.

## What these checks do not establish

No Windows, macOS, Docker or remote CI execution was performed. Windows commands are supplied for AI/ML engineer to try. No whole-form browser interaction, deployed backend integration, public relay publication, Moonshot request, clinical credential verification or real-user pilot was performed.

The frontend regression script uses a small taxonomy interface fixture to run utility functions outside React. Strict checking and the bundle used the actual exported app and its original `topics.ts`. Client network checks use controlled fetch responses and one real Python response sample; the Python HTTP smoke uses a real local server. These are complementary checks, not a deployed end-to-end test.

Privacy and safety rules, Swahili drafts and educational cards remain unreviewed. Neither software tests nor synthetic classification accuracy establish medical validity, comprehensive detection, anonymity or public release approval. Every service analysis still returns `publication_allowed: false`.

Original-upload integrity: 520 original files were compared with the uploaded ZIP and matched byte-for-byte. The shared browser rule export was regenerated. No live website, relay, backend or deployment was changed.
