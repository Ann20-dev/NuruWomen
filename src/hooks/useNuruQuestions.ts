import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

import { NURU_TAG, QUESTION_KIND } from '@/lib/nuru/protocol';
import type { Question, SeedQuestion } from '@/lib/nuru/types';
import { SEED_QUESTIONS } from '@/data/questions';
import { demoStore } from '@/lib/nuru/demoStore';
import { isHiddenContent } from '@/lib/nuru/moderation';
import { queryWithTimeout } from '@/lib/nuru/relayQuery';
import { sanitizeUrl } from '@/lib/utils';

export function eventToQuestion(event: NostrEvent): Question {
  const subject = event.tags.find(([n]) => n === 'subject')?.[1];
  const topics = event.tags
    .filter(([n, v]) => n === 't' && v && v !== NURU_TAG)
    .map(([, v]) => v);

  const firstLine = event.content.split('\n')[0];
  const title = subject ?? (firstLine.length > 72 ? `${firstLine.slice(0, 72)}…` : firstLine);

  // Attached image: `image` tag first, then a NIP-94 imeta url. https only.
  const imageRaw =
    event.tags.find(([n]) => n === 'image')?.[1] ??
    event.tags.find(([n]) => n === 'imeta')?.slice(1).find((v) => v.startsWith('url '))?.slice(4);

  return {
    id: event.id,
    title,
    content: event.content,
    topics,
    authorPubkey: event.pubkey,
    createdAt: event.created_at,
    isSeed: false,
    image: sanitizeUrl(imageRaw),
    event,
  };
}

/** Root questions = kind-1 notes tagged for the commons, with no `e` reply tag. */
function isRootQuestion(event: NostrEvent): boolean {
  return !event.tags.some(([n]) => n === 'e');
}

function seedToQuestion(q: SeedQuestion): Question {
  return {
    id: q.id,
    title: q.title,
    content: q.content,
    topics: q.topics,
    authorPubkey: q.authorPubkey,
    authorName: q.authorName,
    createdAt: q.createdAt,
    isSeed: true,
    evidenceCard: q.evidenceCard,
    image: q.image,
    signal: q.signal,
  };
}

function seedQuestions(excludeIds: Set<string>): Question[] {
  return SEED_QUESTIONS.filter((q) => !excludeIds.has(q.id)).map(seedToQuestion);
}

/** Live events from relays merged over session-memory events (deduped by id). */
function mergeLive(relayEvents: NostrEvent[]): NostrEvent[] {
  const byId = new Map<string, NostrEvent>();
  for (const e of relayEvents) byId.set(e.id, e);
  for (const e of demoStore.all()) byId.set(e.id, e);
  return [...byId.values()];
}

/**
 * All commons questions: live relay events merged over the bundled seed set.
 * The bundled seeds render instantly as placeholder data — slow or
 * unreachable relays can never leave the page on skeletons; live questions
 * simply merge in when (and if) the network answers within the deadline.
 */
export function useNuruQuestions() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-questions'],
    queryFn: async (c) => {
      const relayEvents = await queryWithTimeout(
        nostr,
        [{ kinds: [QUESTION_KIND], '#t': [NURU_TAG], limit: 100 }],
        { signal: c.signal },
      );

      const live = mergeLive(relayEvents)
        .filter((e) => e.kind === QUESTION_KIND && e.tags.some(([n, v]) => n === 't' && v === NURU_TAG))
        .filter(isRootQuestion)
        .filter((e) => !isHiddenContent(e))
        .map(eventToQuestion);

      const liveIds = new Set(live.map((q) => q.id));
      return [...live, ...seedQuestions(liveIds)].sort((a, b) => b.createdAt - a.createdAt);
    },
    placeholderData: () => seedQuestions(new Set()),
    staleTime: 30_000,
  });
}

/** A single question by id (session memory, then seeds, then relays). */
export function useNuruQuestion(id: string | undefined) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-question', id],
    enabled: Boolean(id),
    queryFn: async (c) => {
      if (!id) return undefined;

      const local = demoStore.all().find((e) => e.kind === QUESTION_KIND && e.id === id);
      if (local && !isHiddenContent(local)) return eventToQuestion(local);

      // Bundled seeds resolve without any network wait.
      const seed = SEED_QUESTIONS.find((q) => q.id === id);
      if (seed) return seedToQuestion(seed);

      const [event] = await queryWithTimeout(
        nostr,
        [{ kinds: [QUESTION_KIND], ids: [id], limit: 1 }],
        { signal: c.signal },
      );
      if (event && !isHiddenContent(event) && event.tags.some(([n, v]) => n === 't' && v === NURU_TAG)) {
        return eventToQuestion(event);
      }

      return undefined;
    },
    placeholderData: () => {
      const seed = SEED_QUESTIONS.find((q) => q.id === id);
      return seed ? seedToQuestion(seed) : undefined;
    },
    staleTime: 30_000,
  });
}
