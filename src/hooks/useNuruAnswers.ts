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
import { demoStore } from '@/lib/nuru/demoStore';
import { isHiddenContent } from '@/lib/nuru/moderation';

/** Clinical authority requires the trusted registry; self-labels cannot establish it. */
function classifyAnswer(event: NostrEvent): AnswerType {
  const label = event.tags.find(
    ([n, , ns]) => n === 'l' && (!ns || ns === ANSWER_TYPE_NAMESPACE),
  )?.[1];

  // A self-label cannot establish clinical authority.
  if (label === 'lived-experience' && (ANSWER_TYPES as string[]).includes(label)) return 'lived-experience';
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

      // Relay replies first; session-memory events fill in instantly.
      let relayReplies: NostrEvent[] = [];
      try {
        relayReplies = await nostr.query(
          [{ kinds: [ANSWER_KIND], '#e': [questionId], limit: 200 }],
          { signal: c.signal },
        );
      } catch {
        relayReplies = [];
      }

      const replyById = new Map<string, NostrEvent>();
      for (const e of relayReplies) replyById.set(e.id, e);
      for (const e of demoStore.all()) {
        if (e.kind === ANSWER_KIND && e.tags.some(([n, v]) => n === 'e' && v === questionId)) {
          replyById.set(e.id, e);
        }
      }
      for (const [key, e] of replyById) {
        if (isHiddenContent(e)) replyById.delete(key);
      }

      const live = [...replyById.values()].map(eventToAnswer);
      const liveIds = new Set(live.map((a) => a.id));

      const seedAnswers = (seedQuestionById(questionId)?.answers ?? [])
        .filter((a) => !liveIds.has(a.id))
        .map(seedToAnswer);

      const all = [...live, ...seedAnswers].sort((a, b) => a.createdAt - b.createdAt);

      // Helpful votes target answers by `e` tag — one dedupe per voter per answer.
      const ids = all.map((a) => a.id);
      const helpfulCounts: Record<string, number> = {};
      if (ids.length > 0) {
        const idSet = new Set(ids);
        const seen = new Set<string>();
        const countVote = (r: NostrEvent) => {
          const target = r.tags.find(([n]) => n === 'e')?.[1];
          if (!target || !idSet.has(target)) return;
          const dedupeKey = `${r.pubkey}:${target}`;
          if (seen.has(dedupeKey)) return;
          seen.add(dedupeKey);
          helpfulCounts[target] = (helpfulCounts[target] ?? 0) + 1;
        };
        try {
          const votes = await nostr.query(
            [{ kinds: [HELPFUL_KIND], '#e': ids, limit: 500 }],
            { signal: c.signal },
          );
          for (const v of votes) countVote(v);
        } catch {
          // reaction counts are best-effort
        }
        for (const v of demoStore.all()) {
          if (v.kind === HELPFUL_KIND) countVote(v);
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
