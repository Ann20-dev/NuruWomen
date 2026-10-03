import type { ErrorRequestHandler } from 'express';
import type { ZodError } from 'zod';

import { ValidationError } from '../errors.js';
import { AiServiceError, type AiFailureReason } from '../services/aiService.js';

interface ClientError {
  status: number;
  code: string;
  message: string;
}

/**
 * How each upstream failure is presented to the browser.
 *
 * `unauthorised` is a 500 on purpose: a rejected service key is our
 * misconfiguration, not the caller's mistake, so it must not be reported as
 * a client error. `rejected` is a 502 for the same reason: the caller passed
 * our schema, so a 4xx from upstream means our contract has drifted from
 * theirs. Both are our bugs.
 */
const UPSTREAM: Record<AiFailureReason, ClientError> = {
  timeout: {
    status: 504,
    code: 'ai_timeout',
    message: 'The privacy check took too long. Please try again.',
  },
  unreachable: {
    status: 503,
    code: 'ai_unavailable',
    message: 'The privacy check is unavailable. Please try again shortly.',
  },
  unauthorised: {
    status: 500,
    code: 'server_error',
    message: 'The privacy check is unavailable. Please try again shortly.',
  },
  rejected: {
    status: 502,
    code: 'ai_error',
    message: 'The privacy check could not process this request.',
  },
  upstream_error: {
    status: 502,
    code: 'ai_error',
    message: 'The privacy check failed. Please try again shortly.',
  },
  malformed_response: {
    status: 502,
    code: 'ai_error',
    message: 'The privacy check failed. Please try again shortly.',
  },
};

/**
 * Field-level detail safe to return. Only messages authored in
 * schemas/aiRequests.ts are forwarded. Unrecognised-key errors are collapsed,
 * because Zod names the offending key and we do not echo caller input.
 */
function describeIssues(error: ZodError): Array<{ field: string; message: string }> {
  const described: Array<{ field: string; message: string }> = [];
  let sawUnknownKey = false;

  for (const issue of error.issues) {
    if (issue.code === 'unrecognized_keys') {
      sawUnknownKey = true;
      continue;
    }
    described.push({
      field: issue.path.join('.') || '(body)',
      message: issue.message,
    });
  }

  if (sawUnknownKey) {
    described.push({
      field: '(body)',
      message: 'Request contains fields this endpoint does not accept.',
    });
  }

  return described;
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // Something already started writing. Let Express tear the connection down.
  if (res.headersSent) {
    next(err);
    return;
  }

  const requestId = String(res.locals.requestId ?? 'unknown');
  res.setHeader('Cache-Control', 'no-store');

  if (err instanceof ValidationError) {
    console.warn(`[request ${requestId}] rejected: invalid_request`);
    res.status(400).json({
      error: {
        code: 'invalid_request',
        message: 'The request did not match the expected shape.',
        fields: describeIssues(err.zodError),
      },
      request_id: requestId,
    });
    return;
  }

  if (err instanceof AiServiceError) {
    const mapped = UPSTREAM[err.reason];
    console.warn(`[request ${requestId}] upstream failure: ${err.reason}`);
    res.status(mapped.status).json({
      error: { code: mapped.code, message: mapped.message },
      request_id: requestId,
    });
    return;
  }

  // Malformed JSON from express.json()
  if (err instanceof SyntaxError && 'body' in err) {
    console.warn(`[request ${requestId}] rejected: malformed JSON`);
    res.status(400).json({
      error: { code: 'invalid_json', message: 'Request body is not valid JSON.' },
      request_id: requestId,
    });
    return;
  }

  // Body over the configured limit
  if (
    typeof err === 'object' &&
    err !== null &&
    (err as { type?: unknown }).type === 'entity.too.large'
  ) {
    console.warn(`[request ${requestId}] rejected: body too large`);
    res.status(413).json({
      error: { code: 'payload_too_large', message: 'Request body is too large.' },
      request_id: requestId,
    });
    return;
  }

  // Anything unanticipated. Log the error class only: a message, stack or
  // attached property can carry request text (JSON.parse messages quote
  // the input, body-parser errors carry the raw body), and question text
  // must never reach the logs.
  const name = err instanceof Error ? err.name : typeof err;
  const type =
    typeof err === 'object' && err !== null && typeof (err as { type?: unknown }).type === 'string'
      ? ` type=${(err as { type: string }).type}`
      : '';
  console.error(`[request ${requestId}] unhandled error: ${name}${type}`);
  res.status(500).json({
    error: { code: 'server_error', message: 'Something went wrong.' },
    request_id: requestId,
  });
};