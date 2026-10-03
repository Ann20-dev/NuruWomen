# Render deployment

Use this folder's contents as your GitHub repository root. For a separate folder inside a monorepo, update the Blueprint paths/root directory deliberately; the included configuration assumes the repository root.

1. Create a review branch and replace the deployable project with these files. Confirm the diff, commit, then push the branch. Do not push secrets or generated dependencies.
2. In Render, select **New > Blueprint**, connect the repository and choose the branch.
3. Render reads root `render.yaml`: one Docker web service with the Free plan and `/api/health` health path. `WHC_API_KEY` is generated automatically.
4. Wait for the Docker build and health checks. Open the provided URL. Both Node and Python must be ready.
5. Check the home, `/ask`, `/library`, `/research`, `/blind-spots`, and refresh a nested route. Use only fictional examples. Test English/Kiswahili analysis, blocked save before a successful check, local demo save and reload clearing it.

Manual Web Service alternative:

| Setting | Value |
| --- | --- |
| Language | Docker |
| Dockerfile path | `./Dockerfile` |
| Docker command | Leave blank |
| Health check | `/api/health` |
| Instance | Free for demo, or an appropriate paid instance |
| WHC_API_KEY | Random printable ASCII token, 32+ characters; do not use template value |
| Other variables | Image defaults cover NODE_ENV, WHC_DEMO_MODE and loopback AI_SERVICE_URL |

Render supplies the public `PORT`; Node listens on it. Python is internal on loopback port 8000. No database or API-provider subscription is needed for this synthetic build.

## Troubleshooting

- `npm ci` fails: commit both npm lockfiles and package manifests together; use the supplied Node 24 Docker build.
- Missing build data: include `data/`, `scripts/sync-data.mjs`, and `ai/evidence/` in the repository and Docker build context.
- Invalid WHC_API_KEY: generate a real random token. Do not place it in any VITE variable.
- `/api/health` returns 503: inspect process logs and dependency installation/model initialization. Do not change health to return 200 blindly.
- Memory/startup failure: try an instance with more memory; actual Render resource usage has not been measured here.
- First request is slow after idling: Free services sleep after 15 minutes of no inbound traffic and can take about a minute to wake.

Deployment status: prepared and locally checked; not deployed to Render, and the Docker image itself was not built in this environment because Docker is unavailable.

Official documentation checked 3 October 2026:
- https://render.com/docs/docker
- https://render.com/docs/blueprint-spec
- https://render.com/docs/health-checks
- https://render.com/docs/free
