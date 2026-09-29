import { AuthorLine } from '@/components/nuru/AuthorLine';
import { LayerDisclaimer } from '@/components/nuru/LayerBadge';
import { HelpfulButton } from '@/components/nuru/HelpfulButton';
import { cn } from '@/lib/utils';
import type { Answer } from '@/lib/nuru/types';

export function AnswerCard({
  answer,
  questionId,
  helpfulCount,
}: {
  answer: Answer;
  questionId: string;
  helpfulCount: number;
}) {
  const clinical = answer.type === 'clinical-response';

  return (
    <article
      className={cn(
        'rounded-xl border p-5 space-y-4 bg-card',
        clinical ? 'border-clinical/30' : 'border-clay/30',
      )}
    >
      <AuthorLine
        pubkey={answer.authorPubkey}
        name={answer.authorName}
        role={answer.role}
        experienceTag={answer.experienceTag}
        createdAt={answer.createdAt}
      />

      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{answer.text}</p>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <LayerDisclaimer layer={answer.type} />
        <HelpfulButton
          targetId={answer.id}
          targetPubkey={answer.authorPubkey}
          targetKind={answer.event?.kind ?? 1}
          questionId={questionId}
          count={answer.helpful + helpfulCount}
        />
      </div>
    </article>
  );
}
