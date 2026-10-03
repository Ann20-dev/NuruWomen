import type { RequestHandler } from 'express';

import { config, isProduction } from '../config.js';

/**
 * Allow only configured browser origins and answer their CORS preflights.
 *
 * A request with no Origin header is allowed through. Non-browser clients
 * (curl, server-to-server) send none, and blocking them would break testing
 * without stopping anyone determined: headers are trivially forged outside
 * a browser. This middleware constrains browser behaviour only. It is not
 * authentication.
 *
 * With no ALLOWED_ORIGINS configured, development permits the Vite proxy.
 * Production permits only the current browser origin.
 */
export const originCheck: RequestHandler = (req, res, next) => {
  if (config.allowedOrigins.length === 0 && !isProduction) {
    next();
    return;
  }

  const origin = req.get('origin');
  if (origin === undefined) {
    next();
    return;
  }

  // Render sets the actual host; do not trust a forwarded host supplied by the caller.
  const sameOrigin = `${req.protocol}://${req.get('host')}`;
  if (origin === sameOrigin || config.allowedOrigins.includes(origin)) {
    res.vary('Origin');
    res.setHeader('Access-Control-Allow-Origin', origin);

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Max-Age', '600');
      res.status(204).end();
      return;
    }

    next();
    return;
  }

  const requestId = String(res.locals.requestId ?? 'unknown');
  console.warn(`[request ${requestId}] rejected: disallowed origin`);

  res.status(403).json({
    error: { code: 'forbidden_origin', message: 'This origin is not permitted.' },
    request_id: requestId,
  });
};