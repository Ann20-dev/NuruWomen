import { randomUUID } from 'node:crypto';
import express from 'express';

import { errorHandler } from './middleware/errorHandler.js';
import { aiRouter } from './routes/ai.js';

/** Matches MAX_BODY_BYTES in ai/app/config.py. */
const MAX_BODY_BYTES = 64 * 1024;

export function createApp() {
  const app = express();

  // Do not advertise the framework.
  app.disable('x-powered-by');

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

  app.use('/api/ai', aiRouter);

  // Unknown /api path. Without this Express returns an HTML 404 page.
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Unknown endpoint.' } });
  });

  // Last, always.
  app.use(errorHandler);

  return app;
}