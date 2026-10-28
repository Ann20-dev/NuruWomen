import { AuthorLine } from '@/components/nuru/AuthorLine';
import { LayerBadge, LayerDisclaimer } from '@/components/nuru/LayerBadge';
import { HelpfulButton } from '@/components/nuru/HelpfulButton';
import { ReportLink } from '@/components/nuru/ReportLink';
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
        'rounded-xl border p-5 space-y-4 bg-card transition-all duration-300 hover:shadow-sm',
        clinical
          ? 'border-clinical/30 bg-clinical-soft/20 accent-clinical pattern-corner'
          : 'border-clay/30 bg-clay-soft/20 accent-clay pattern-corner',
      )}
      aria-labelledby={`answer-${answer.id}`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <LayerBadge layer={answer.type} />
        <span className="text-xs text-muted-foreground">
          {clinical
            ? 'Reviewed health education, not a consultation'
            : 'Personal story, not medical advice'}
        </span>
      </div>

      <AuthorLine
        pubkey={answer.authorPubkey}
        name={answer.authorName}
        role={answer.role}
        experienceTag={answer.experienceTag}
        createdAt={answer.createdAt}
      />

      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{answer.text}</p>

      <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
        <LayerDisclaimer layer={answer.type} />
        <div className="flex items-center gap-3">
          <ReportLink />
          <HelpfulButton
            targetId={answer.id}
            targetPubkey={answer.authorPubkey}
            targetKind={answer.event?.kind ?? 1}
            questionId={questionId}
            count={answer.helpful + helpfulCount}
          />
        </div>
      </div>
    </article>
  );
}
