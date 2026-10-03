import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import express from 'express';
import { existsSync } from 'node:fs';
import { errorHandler } from './middleware/errorHandler.js';
import { originCheck } from './middleware/originCheck.js';
import { aiRateLimit } from './middleware/rateLimit.js';
import { aiRouter } from './routes/ai.js';

/** Matches MAX_BODY_BYTES in ai/app/config.py. */
const MAX_BODY_BYTES = 64 * 1024;

export function createApp() {
  const app = express();

  // Do not advertise the framework.
  app.disable('x-powered-by');

  // Render terminates TLS at a proxy, so the client address arrives in
  // X-Forwarded-For. Trust exactly one hop. Trusting all hops would let a
  // caller forge the header and evade the rate limiter.
  app.set('trust proxy', 1);

  // One id per request so a log line and a user's error report can be matched.
  app.use((_req, res, next) => {
    res.locals.requestId = randomUUID();
    next();
  });

  app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use(express.json({ limit: MAX_BODY_BYTES, type: 'application/json' }));

  app.use('/api/ai', originCheck, aiRateLimit, aiRouter);

  // Unknown /api path. Without this Express returns an HTML 404 page.
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Unknown endpoint.' } });
  });

    // Serve the built React app. The API is registered above, so /api never
  // reaches this. In development Vite serves the frontend instead and this
  // directory does not exist, hence the guard.
  const here = path.dirname(fileURLToPath(import.meta.url));
  const clientDir = path.resolve(here, '../../dist');

  if (existsSync(clientDir)) {
    app.use(express.static(clientDir, { index: false, maxAge: '1h' }));

    // Client-side routing: any non-API path returns index.html so React
    // Router can handle it. Without this, a refresh on /ask returns 404.
    app.get(/.*/, (_req, res) => {
      res.setHeader('Cache-Control', 'no-store');
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  }

  // Last, always.
  app.use(errorHandler);

  return app;
}