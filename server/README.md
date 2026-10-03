# NuruWomen gateway

Use the root README and Dockerfile for the consolidated deployment. This component validates synthetic browser requests, adds the service-only key, forwards to Python, serves the built React app and checks Python readiness at `/api/health`.

Standalone development: install dependencies with `npm ci`, copy `.env.example` to `.env`, set the service key to match Python and run `npm run dev`. Run Python separately if you do not use root `scripts/start.py`. Local Vite uses port 8080 and proxies to this gateway on port 3000.

Build/typecheck: `npm run typecheck` and `npm run build`. Root Docker deployment runs compiled JS with Node 24. Production requires same-origin browser requests unless ALLOWED_ORIGINS explicitly allows additional origins. Origin restrictions do not authenticate non-browser clients.
