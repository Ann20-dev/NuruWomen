import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

import {
  ANSWER_KIND,
  ANSWER_TYPE_NAMESPACE,
  ANSWER_TYPES,
  HELPFUL_KIND,
  type AnswerType,
} from '@/lib/nuru/protocol';
import type { Answer, SeedAnswer } from '@/lib/nuru/types';
import { CLINICIAN_PUBKEYS, clinicianForPubkey } from '@/data/clinicians';
import { seedQuestionById } from '@/data/questions';

/** NIP-32 self-label wins; verified clinicians default to clinical; everyone else is lived experience. */
function classifyAnswer(event: NostrEvent): AnswerType {
  const label = event.tags.find(
    ([n, , ns]) => n === 'l' && (!ns || ns === ANSWER_TYPE_NAMESPACE),
  )?.[1];

  if (label && (ANSWER_TYPES as string[]).includes(label)) return label as AnswerType;
  if (CLINICIAN_PUBKEYS.has(event.pubkey)) return 'clinical-response';
  return 'lived-experience';
}

function eventToAnswer(event: NostrEvent): Answer {
  const clinician = clinicianForPubkey(event.pubkey);
  return {
    id: event.id,
    type: classifyAnswer(event),
    authorPubkey: event.pubkey,
    role: clinician ? `Verified Clinician · ${clinician.role}` : undefined,
    text: event.content,
    helpful: 0,
    createdAt: event.created_at,
    isSeed: false,
    event,
  };
}

function seedToAnswer(a: SeedAnswer): Answer {
  return {
    id: a.id,
    type: a.type,
    authorPubkey: a.authorPubkey,
    authorName: a.authorName,
    role: a.role,
    experienceTag: a.experienceTag,
    text: a.text,
    helpful: a.helpful,
    createdAt: a.createdAt,
    isSeed: true,
  };
}

export interface AnswersResult {
  livedExperience: Answer[];
  clinical: Answer[];
  helpfulCounts: Record<string, number>;
}

/** All answers for a question, split into the separated knowledge layers. */
export function useNuruAnswers(questionId: string | undefined) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nuru-answers', questionId],
    enabled: Boolean(questionId),
    queryFn: async (c) => {
      if (!questionId) throw new Error('missing question id');

      const replyEvents = await nostr.query(
        [{ kinds: [ANSWER_KIND], '#e': [questionId], limit: 200 }],
        { signal: c.signal },
      );

      const live = replyEvents.map(eventToAnswer);
      const liveIds = new Set(live.map((a) => a.id));

      const seedAnswers = (seedQuestionById(questionId)?.answers ?? [])
        .filter((a) => !liveIds.has(a.id))
        .map(seedToAnswer);

      const all = [...live, ...seedAnswers].sort((a, b) => a.createdAt - b.createdAt);

      // Helpful votes for every answer (one relay round-trip)
      const ids = all.map((a) => a.id);
      const helpfulCounts: Record<string, number> = {};
      if (ids.length > 0) {
        try {
          const reactions = await nostr.query(
            [{ kinds: [HELPFUL_KIND], '#e': ids, limit: 500 }],
            { signal: c.signal },
          );
          const seen = new Set<string>();
          for (const r of reactions) {
            const target = r.tags.find(([n]) => n === 'e')?.[1];
            const dedupeKey = `${r.pubkey}:${target}`;
            if (!target || seen.has(dedupeKey)) continue;
            seen.add(dedupeKey);
            helpfulCounts[target] = (helpfulCounts[target] ?? 0) + 1;
          }
        } catch {
          // reaction counts are best-effort
        }
      }

      return {
        livedExperience: all.filter((a) => a.type === 'lived-experience'),
        clinical: all.filter((a) => a.type === 'clinical-response'),
        helpfulCounts,
      } satisfies AnswersResult;
    },
    staleTime: 30_000,
  });
}
