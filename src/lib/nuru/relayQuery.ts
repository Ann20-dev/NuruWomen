import type { NostrEvent, NostrFilter } from '@nostrify/nostrify';

interface Queryable {
  query(filters: NostrFilter[], opts?: { signal?: AbortSignal }): Promise<NostrEvent[]>;
}

/**
 * Relay queries wait for EOSE from every connected read relay. A slow or
 * unreachable relay (common on mobile networks and restrictive ISPs) would
 * otherwise hang a page on skeletons indefinitely. This races the query
 * against a deadline and degrades to an empty result — pages always render
 * bundled content first and live events merge in when relays respond.
 */
export async function queryWithTimeout(
  nostr: Queryable,
  filters: NostrFilter[],
  opts: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<NostrEvent[]> {
  const { signal, timeoutMs = 7_000 } = opts;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      nostr.query(filters, { signal }),
      new Promise<NostrEvent[]>((resolve) => {
        timer = setTimeout(() => resolve([]), timeoutMs);
      }),
    ]);
  } catch {
    return [];
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
