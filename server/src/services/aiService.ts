import { config } from '../config.js';

/**
 * Deadline for a single upstream call.
 *
 * Must stay below the browser's own 10s timeout in src/lib/nuru/aiClient.ts,
 * so that we fail before the caller gives up on us.
 * 
 */
const UPSTREAM_TIMEOUT_MS = 8_000;

/** The only upstream endpoints this gateway is permitted to reach. */
const UPSTREAM_PATHS = {
  analyze: '/v1/nuru/analyze',
  translationCheck: '/v1/translation-check',
} as const;

export type UpstreamRoute = keyof typeof UPSTREAM_PATHS;

/** Why a call failed. Stays server-side; never sent to a browser verbatim. */
export type AiFailureReason =
  | 'timeout'
  | 'unreachable'
  | 'unauthorised'
  | 'rejected'
  | 'upstream_error'
  | 'malformed_response';

export class AiServiceError extends Error {
  readonly reason: AiFailureReason;
  readonly upstreamStatus: number | undefined;

  constructor(reason: AiFailureReason, upstreamStatus?: number) {
    super(`AI service call failed: ${reason}`);
    this.name = 'AiServiceError';
    this.reason = reason;
    this.upstreamStatus = upstreamStatus;
  }
}

/**
 * Call the private AI service and return its JSON response unchanged.
 *
 * The caller passes an already-validated body. This function adds the
 * service credential and enforces the deadline. It deliberately does not
 * interpret the response, because TEAM_HANDOFF.md requires the service
 * JSON to be preserved end to end.
 *
 * Never log `body`, and never attach an upstream response body to an error.
 * 
 * Note: some environments (WSL2 among them) drop packets to closed ports
 * rather than sending a TCP reset, so a dead upstream surfaces as 'timeout'
 * rather than 'unreachable'. Both branches are correct; which one fires
 * depends on the network stack.
 */
export async function callAiService(
  route: UpstreamRoute,
  body: unknown,
): Promise<unknown> {
  const url = `${config.aiServiceUrl}${UPSTREAM_PATHS[route]}`;

  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': config.aiServiceKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      redirect: 'error',
    });
  } catch (error: unknown) {
    const name =
      typeof error === 'object' && error !== null && 'name' in error
        ? String((error as { name: unknown }).name)
        : '';

    const reason: AiFailureReason =
      name === 'TimeoutError' ? 'timeout' : 'unreachable';

    logUpstreamFailure(route, reason);
    throw new AiServiceError(reason);
  }

  if (!response.ok) {
    const reason = classifyStatus(response.status);
    logUpstreamFailure(route, reason, response.status);
    throw new AiServiceError(reason, response.status);
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    logUpstreamFailure('analyze', 'malformed_response', response.status);
    throw new AiServiceError('malformed_response', response.status);
  }
}

function classifyStatus(status: number): AiFailureReason {
  if (status === 401 || status === 403) return 'unauthorised';
  if (status >= 400 && status < 500) return 'rejected';
  return 'upstream_error';
}

/** Route, reason and status only. Never the request or response text. */
function logUpstreamFailure(
  route: UpstreamRoute,
  reason: AiFailureReason,
  status?: number,
): void {
  const suffix = status === undefined ? '' : ` status=${status}`;
  console.warn(`[ai-service] route=${route} reason=${reason}${suffix}`);
}