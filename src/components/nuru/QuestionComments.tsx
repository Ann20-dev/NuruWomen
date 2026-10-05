import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { AuthorLine } from '@/components/nuru/AuthorLine';
import { HelpfulButton } from '@/components/nuru/HelpfulButton';
import { LayerDisclaimer } from '@/components/nuru/LayerBadge';
import { useNuruAnswers } from '@/hooks/useNuruAnswers';
import { cn } from '@/lib/utils';
import type { Answer } from '@/lib/nuru/types';

const MAX_PER_LAYER = 3;

function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="size-8 rounded-full bg-muted shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3.5 w-1/3 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

/** One answer rendered as a compact threaded comment - left rule in its layer colour. */
function CommentRow({
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
    <div className={cn('border-l-2 pl-4 space-y-2.5', clinical ? 'border-clinical/50' : 'border-clay/50')}>
      <AuthorLine
        pubkey={answer.authorPubkey}
        name={answer.authorName}
        role={answer.role}
        experienceTag={answer.experienceTag}
        createdAt={answer.createdAt}
      />
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{answer.text}</p>
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
    </div>
  );
}

function LayerGroup({
  label,
  dot,
  answers,
  questionId,
  helpfulCounts,
}: {
  label: string;
  dot: string;
  answers: Answer[];
  questionId: string;
  helpfulCounts: Record<string, number>;
}) {
  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        <span className={cn('size-2 rounded-full', dot)} />
        {label} · {answers.length}
      </p>
      <div className="space-y-4">
        {answers.slice(0, MAX_PER_LAYER).map((a) => (
          <CommentRow key={a.id} answer={a} questionId={questionId} helpfulCount={helpfulCounts[a.id] ?? 0} />
        ))}
      </div>
    </div>
  );
}

/**
 * Inline comment thread for a question card. Fetches answers lazily - the
 * query only runs once the comments dropdown is opened.
 */
export function QuestionComments({ questionId }: { questionId: string }) {
  const { data, isLoading } = useNuruAnswers(questionId);
  const { t } = useUiLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );
  }

  const lived = data?.livedExperience ?? [];
  const clinical = data?.clinical ?? [];
  const total = lived.length + clinical.length;

  if (total === 0) {
    return (
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t('questions.noAnswers')}{' '}
        <Link to={`/question/${questionId}`} className="text-primary font-medium hover:underline">
          {t('questions.beFirst')}
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {lived.length > 0 && (
        <LayerGroup
          label={t('layer.lived')}
          dot="bg-clay"
          answers={lived}
          questionId={questionId}
          helpfulCounts={data?.helpfulCounts ?? {}}
        />
      )}
      {clinical.length > 0 && (
        <LayerGroup
          label={t('layer.clinical')}
          dot="bg-clinical"
          answers={clinical}
          questionId={questionId}
          helpfulCounts={data?.helpfulCounts ?? {}}
        />
      )}
      <Link
        to={`/question/${questionId}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {t('questions.fullThread')}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
