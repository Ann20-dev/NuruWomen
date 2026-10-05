import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

import { CALENDAR_EVENT_KIND, NURU_TAG } from '@/lib/nuru/protocol';
import type { HealthEvent, HealthEventType } from '@/lib/nuru/types';
import { SEED_EVENTS } from '@/data/events';
import { demoStore } from '@/lib/nuru/demoStore';
import { isHiddenContent } from '@/lib/nuru/moderation';

const EVENT_TYPES = new Set<HealthEventType>(['screening', 'webinar', 'community', 'training', 'awareness']);

function eventToHealthEvent(event: NostrEvent): HealthEvent | undefined {
  const title = event.tags.find(([n]) => n === 'title')?.[1]?.trim();
  const startRaw = event.tags.find(([n]) => n === 'start')?.[1];
  const startsAt = startRaw ? Number(startRaw) : NaN;
  if (!title || !Number.isFinite(startsAt) || startsAt <= 0) return undefined;

  const endRaw = event.tags.find(([n]) => n === 'end')?.[1];
  const endsAt = endRaw && Number.isFinite(Number(endRaw)) ? Number(endRaw) : undefined;

  const location = event.tags.find(([n]) => n === 'location')?.[1]?.trim() || 'Online';
  const typeTag = event.tags
    .filter(([n]) => n === 't')
    .map(([, v]) => v)
    .find((v): v is HealthEventType => EVENT_TYPES.has(v as HealthEventType));

  return {
    id: event.id,
    title,
    summary: event.content.trim(),
    startsAt,
    endsAt: endsAt && endsAt > startsAt ? endsAt : undefined,
    location,
    isOnline: /online|zoom|meet|teams|youtube/i.test(location),
    type: typeTag ?? 'community',
    organizer: event.tags.find(([n]) => n === 'organizer')?.[1]?.trim() || 'Community organizer',
    cost: event.tags.find(([n]) => n === 'cost')?.[1]?.trim() || 'Free',
    languages: event.tags.filter(([n]) => n === 'language').map(([, v]) => v).filter(Boolean),
    topics: event.tags
      .filter(([n, v]) => n === 't' && v && v !== NURU_TAG && !EVENT_TYPES.has(v as HealthEventType))
      .map(([, v]) => v),
    link: event.tags.find(([n]) => n === 'r')?.[1],
    isSeed: false,
    event,
  };
}

/**
 * Upcoming women's-health events: bundled seed calendar merged with live
 * NIP-52 calendar events tagged for the commons. Relay failures degrade to
 * the seed calendar, never an error screen. Past events are hidden.
 */
export function useNuruEvents() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-events'],
    queryFn: async (c) => {
      const relayEvents = await nostr
        .query(
          [{ kinds: [CALENDAR_EVENT_KIND], '#t': [NURU_TAG], limit: 60 }],
          { signal: c.signal },
        )
        .catch((): NostrEvent[] => []);

      const liveById = new Map<string, NostrEvent>();
      for (const e of relayEvents) liveById.set(e.id, e);
      for (const e of demoStore.all()) {
        if (e.kind === CALENDAR_EVENT_KIND) liveById.set(e.id, e);
      }

      const live = [...liveById.values()]
        .filter((e) => !isHiddenContent(e))
        .map(eventToHealthEvent)
        .filter((e): e is HealthEvent => Boolean(e));

      const liveIds = new Set(live.map((e) => e.id));
      const cutoff = Math.floor(Date.now() / 1000) - 3 * 3600; // hide events that ended 3h+ ago
      return [...live, ...SEED_EVENTS.filter((e) => !liveIds.has(e.id))]
        .filter((e) => (e.endsAt ?? e.startsAt) >= cutoff)
        .sort((a, b) => a.startsAt - b.startsAt);
    },
    staleTime: 60_000,
  });
}
