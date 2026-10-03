import type { RequestHandler } from 'express';

import { config } from '../config.js';

/**
 * Reject browser requests from origins we do not serve.
 *
 * A request with no Origin header is allowed through. Non-browser clients
 * (curl, server-to-server) send none, and blocking them would break testing
 * without stopping anyone determined: headers are trivially forged outside
 * a browser. This middleware constrains browser behaviour only. It is not
 * authentication.
 *
 * With no ALLOWED_ORIGINS configured the check is skipped, so local
 * development works before the value is set.
 */
export const originCheck: RequestHandler = (req, res, next) => {
  if (config.allowedOrigins.length === 0) {
    next();
    return;
  }

  const origin = req.get('origin');
  if (origin === undefined || config.allowedOrigins.includes(origin)) {
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