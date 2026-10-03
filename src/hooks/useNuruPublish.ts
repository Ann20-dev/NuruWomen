import { useMutation } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { useNostr } from '@nostrify/react';
import { finalizeEvent, generateSecretKey } from 'nostr-tools';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { demoStore } from '@/lib/nuru/demoStore';
import {
  ANSWER_TYPE_NAMESPACE,
  HELPFUL_KIND,
  NURU_TAG,
  type AnswerType,
} from '@/lib/nuru/protocol';

const now = () => Math.floor(Date.now() / 1000);

/**
 * Publishes Nostr events to the configured write relays.
 *
 * Anonymous posting signs with a fresh one-time keypair that is discarded
 * immediately — no account and no durable identity (identity-decisions.md).
 * The event is also mirrored in session memory so it renders instantly
 * while relay propagation catches up.
 */
export function useNuruPublish() {
  const { nostr } = useNostr();
  const { user } = useCurrentUser();

  const signAndPublish = async (
    template: { kind: number; content: string; tags: string[][] },
    anonymous: boolean,
  ): Promise<NostrEvent> => {
    const unsigned = { ...template, created_at: now() };

    const event: NostrEvent = anonymous || !user
      ? finalizeEvent(unsigned, generateSecretKey())
      : await user.signer.signEvent(unsigned);

    await nostr.event(event);
    demoStore.save(event);
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
            ['alt', "Anonymous women's health question on NuruWomen"],
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
      topics: string[];
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
            ...input.topics.map((t) => ['t', t]),
            ['L', ANSWER_TYPE_NAMESPACE],
            ['l', input.type, ANSWER_TYPE_NAMESPACE],
            ['alt', `Labelled ${input.type} answer on NuruWomen`],
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
            ['alt', 'Helpful vote on NuruWomen'],
          ],
        },
        input.anonymous,
      ),
  });

  return { askQuestion, postAnswer, markHelpful };
}
