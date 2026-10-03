import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Client-side moderation. Public relays are open, so obvious injection tests
 * and curated spam are hidden from the commons views. Rendering already
 * escapes text; this keeps test payloads out of the listings entirely.
 */
const HIDDEN_EVENT_IDS = new Set<string>([]);

const SUSPICIOUS_PATTERNS = [
  /<script/i,
  /<img/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /javascript:/i,
  /alert\s*\(/i,
  /<iframe/i,
  /Hacked!?/i,
];

/** Hide specific events from every commons view (curated blocklist). */
export function hideEvent(id: string): void {
  HIDDEN_EVENT_IDS.add(id);
}

export function isHiddenContent(event: NostrEvent): boolean {
  if (HIDDEN_EVENT_IDS.has(event.id)) return true;
  const haystack = `${event.content} ${event.tags.map((t) => t.join(' ')).join(' ')}`;
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(haystack));
}
