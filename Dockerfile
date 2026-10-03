# One image: React assets + Node gateway + loopback-only Python AI.
FROM node:24-bookworm-slim AS build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY server/package.json server/package-lock.json ./server/
RUN npm --prefix server ci --include=dev
COPY . .
RUN npm run build && npm --prefix server run build
RUN npm --prefix server prune --omit=dev

FROM python:3.12-slim-bookworm AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 NODE_ENV=production \
    PORT=10000 WHC_DEMO_MODE=true AI_SERVICE_URL=http://127.0.0.1:8000 \
    OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=build /usr/local/bin/node /usr/local/bin/node
COPY ai/requirements-runtime-lock.txt /app/ai/requirements-runtime-lock.txt
RUN pip install --no-cache-dir -r /app/ai/requirements-runtime-lock.txt
COPY --from=build /build/dist /app/dist
COPY --from=build /build/server/dist /app/server/dist
COPY --from=build /build/server/node_modules /app/server/node_modules
COPY server/package.json /app/server/package.json
COPY ai/app /app/ai/app
COPY ai/data /app/ai/data
COPY scripts/start.py /app/scripts/start.py
RUN useradd --uid 10001 --create-home nuru && chown -R nuru:nuru /app
USER nuru
EXPOSE 10000
CMD ["python", "scripts/start.py"]
