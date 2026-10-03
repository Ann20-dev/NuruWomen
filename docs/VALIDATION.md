# Consolidated release validation

Date: 3 October 2026. Source: supplied ZIP snapshot. No live GitHub fetch or push.

| Verification | Result |
| --- | --- |
| Root npm lockfile consistency | Updated to match consolidated package metadata/dependencies |
| Frontend TypeScript + ESLint | Passed |
| Existing frontend suites | 3 files, 5 tests passed |
| Production frontend build | Passed; routes split into separate chunks; animation engines use no eval |
| Node gateway typecheck/build | Passed |
| Existing Python tests | 106 passed |
| Combined process HTTP checks | 15 passed; see validation/http-smoke.json |
| Actual Docker image build | Not run: Docker unavailable |
| Actual Render deploy | Not performed |
| Browser visual/workflow automation | 10 checks passed; see validation/browser-smoke.json |

HTTP checks cover combined readiness, five SPA route responses, English/Kiswahili analysis, rejected non-synthetic requests, rejected foreign browser origin, unknown API JSON errors, translation review contract, CSP, graceful supervisor shutdown and required-child failure.

The existing frontend App smoke test emits a React act() warning from NostrLoginProvider. Existing Python tests emit a Starlette/httpx deprecation warning. Both suites pass. Test results do not certify clinical accuracy or privacy guarantees.

The deployment image uses Node 24 and Python 3.12 with separate npm lockfiles and a runtime-only Python lockfile. Actual image/library compatibility and Render resource behavior must be checked at deployment.

Browser checks exercised research rendering/search, coverage rows, save blocked before analysis, successful local save, reload clearing local data, Kiswahili analysis, mobile overflow, absence of public relay WebSockets, and absence of browser runtime errors. Verified with Chromium headless.
