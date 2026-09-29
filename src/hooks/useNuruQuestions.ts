import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

import { NURU_TAG, QUESTION_KIND } from '@/lib/nuru/protocol';
import type { Question } from '@/lib/nuru/types';
import { SEED_QUESTIONS } from '@/data/questions';

export function eventToQuestion(event: NostrEvent): Question {
  const subject = event.tags.find(([n]) => n === 'subject')?.[1];
  const topics = event.tags
    .filter(([n, v]) => n === 't' && v && v !== NURU_TAG)
    .map(([, v]) => v);

  const firstLine = event.content.split('\n')[0];
  const title = subject ?? (firstLine.length > 72 ? `${firstLine.slice(0, 72)}…` : firstLine);

  return {
    id: event.id,
    title,
    content: event.content,
    topics,
    authorPubkey: event.pubkey,
    createdAt: event.created_at,
    isSeed: false,
    event,
  };
}

/** Root questions = kind-1 notes tagged for the commons, with no `e` reply tag. */
function isRootQuestion(event: NostrEvent): boolean {
  return !event.tags.some(([n]) => n === 'e');
}

/**
 * All commons questions: live Nostr events merged over the bundled seed set.
 */
export function useNuruQuestions() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-questions'],
    queryFn: async (c) => {
      const events = await nostr.query(
        [{ kinds: [QUESTION_KIND], '#t': [NURU_TAG], limit: 200 }],
        { signal: c.signal },
      );

      const live = events.filter(isRootQuestion).map(eventToQuestion);
      const liveIds = new Set(live.map((q) => q.id));

      const seeds: Question[] = SEED_QUESTIONS.filter((q) => !liveIds.has(q.id)).map((q) => ({
        id: q.id,
        title: q.title,
        content: q.content,
        topics: q.topics,
        authorPubkey: q.authorPubkey,
        authorName: q.authorName,
        createdAt: q.createdAt,
        isSeed: true,
        evidenceCard: q.evidenceCard,
        signal: q.signal,
      }));

      return [...live, ...seeds].sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 30_000,
  });
}

/** A single question by id (checks live events first, then seeds). */
export function useNuruQuestion(id: string | undefined) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-question', id],
    enabled: Boolean(id),
    queryFn: async (c) => {
      if (!id) return undefined;

      // Live event?
      try {
        const events = await nostr.query(
          [{ kinds: [QUESTION_KIND], ids: [id], limit: 1 }],
          { signal: c.signal },
        );
        if (events[0]) return eventToQuestion(events[0]);
      } catch {
        // fall through to seeds
      }

      const seed = SEED_QUESTIONS.find((q) => q.id === id);
      if (!seed) return undefined;

      const question: Question = {
        id: seed.id,
        title: seed.title,
        content: seed.content,
        topics: seed.topics,
        authorPubkey: seed.authorPubkey,
        authorName: seed.authorName,
        createdAt: seed.createdAt,
        isSeed: true,
        evidenceCard: seed.evidenceCard,
        signal: seed.signal,
      };
      return question;
    },
    staleTime: 30_000,
  });
}
