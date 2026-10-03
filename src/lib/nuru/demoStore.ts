/** Session-memory store: never persisted, transmitted to relays or used for analytics. */
import type { NostrEvent } from '@nostrify/nostrify';
const events = new Map<string, NostrEvent>();
export const demoStore = {
  save(event: NostrEvent) { events.set(event.id, event); },
  all() { return [...events.values()]; },
  clear() { events.clear(); },
};
