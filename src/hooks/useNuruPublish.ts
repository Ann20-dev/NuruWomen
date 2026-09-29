import { useNostr } from '@nostrify/react';
import { useMutation } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { finalizeEvent, generateSecretKey } from 'nostr-tools';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import {
  ANSWER_TYPE_NAMESPACE,
  HELPFUL_KIND,
  NURU_TAG,
  type AnswerType,
} from '@/lib/nuru/protocol';

const now = () => Math.floor(Date.now() / 1000);

/**
 * Publishing with identity choice:
 *  - `anonymous: true` (or logged out) → a one-time keypair signs the event.
 *    Nothing is stored; there is no account, email or phone number.
 *  - otherwise → the user's own signer (NIP-07 extension, nsec, bunker).
 */
export function useNuruPublish() {
  const { nostr } = useNostr();
  const { user } = useCurrentUser();

  const signAndPublish = async (
    template: { kind: number; content: string; tags: string[][] },
    anonymous: boolean,
  ): Promise<NostrEvent> => {
    const unsigned = { ...template, created_at: now() };

    let event: NostrEvent;
    if (anonymous || !user) {
      event = finalizeEvent(unsigned, generateSecretKey());
    } else {
      event = await user.signer.signEvent(unsigned);
    }

    await nostr.event(event, { signal: AbortSignal.timeout(8000) });
    return event;
  };

  const askQuestion = useMutation({
    mutationFn: async (input: {
      title: string;
      content: string;
      topics: string[];
      anonymous: boolean;
    }) =>
      signAndPublish(
        {
          kind: 1,
          content: input.content,
          tags: [
            ['t', NURU_TAG],
            ...input.topics.map((t) => ['t', t]),
            ['subject', input.title],
            ['alt', "Anonymous women's health question on Nuru Commons"],
          ],
        },
        input.anonymous,
      ),
  });

  const postAnswer = useMutation({
    mutationFn: async (input: {
      questionId: string;
      questionPubkey: string;
      text: string;
      type: AnswerType;
      anonymous: boolean;
    }) =>
      signAndPublish(
        {
          kind: 1,
          content: input.text,
          tags: [
            ['e', input.questionId, '', 'root'],
            ['p', input.questionPubkey],
            ['t', NURU_TAG],
            ['L', ANSWER_TYPE_NAMESPACE],
            ['l', input.type, ANSWER_TYPE_NAMESPACE],
            ['alt', `Labelled ${input.type} answer on Nuru Commons`],
          ],
        },
        input.anonymous,
      ),
  });

  const markHelpful = useMutation({
    mutationFn: async (input: {
      targetId: string;
      targetPubkey: string;
      targetKind: number;
      anonymous: boolean;
    }) =>
      signAndPublish(
        {
          kind: HELPFUL_KIND,
          content: '+',
          tags: [
            ['e', input.targetId],
            ['p', input.targetPubkey],
            ['k', String(input.targetKind)],
            ['alt', 'Helpful vote on Nuru Commons'],
          ],
        },
        input.anonymous,
      ),
  });

  return { askQuestion, postAnswer, markHelpful };
}
