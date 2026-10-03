import rateLimit from 'express-rate-limit';

/**
 * Per-IP limit on the AI routes.
 *
 * In-memory, so each server instance counts separately. On Render with more
 * than one instance the effective limit multiplies. A shared store (Redis)
 * is the fix when that matters. Adequate for a single-instance demo.
 */
export const aiRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: {
      code: 'rate_limited',
      message: 'Too many requests. Please wait a moment and try again.',
    },
  },
});