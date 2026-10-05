import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Image as ImageIcon, MessageCircle, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { TopicChips } from '@/components/nuru/TopicChips';
import { QuestionComments } from '@/components/nuru/QuestionComments';
import { timeAgo } from '@/lib/nuru/format';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/nuru/types';

export function QuestionCard({
  question,
  answerCount,
  similarCount,
}: {
  question: Question;
  answerCount?: number;
  /** Live-computed count of similar threads (seed questions carry their own curated signal). */
  similarCount?: number;
}) {
  const [open, setOpen] = useState(false);

  const countLabel =
    typeof answerCount === 'number'
      ? `${answerCount} ${answerCount === 1 ? 'answer' : 'answers'}`
      : 'Answers';

  const similar = question.signal?.similarCount ?? similarCount;

  return (
    <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Link to={`/question/${question.id}`} className="min-w-0">
            <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
              {question.title}
            </h3>
          </Link>
          <span className="flex items-center gap-1.5 shrink-0">
            {question.image && (
              <span
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-secondary/70 text-muted-foreground px-2.5 py-1 text-[0.7rem] font-semibold"
                title="A non-graphic image is attached to this question"
              >
                <ImageIcon className="size-3" />
                Photo
              </span>
            )}
            {!question.isSeed && (
              <span
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-clinical/30 bg-clinical-soft text-clinical px-2.5 py-1 text-[0.7rem] font-semibold"
                title="Published live by the community"
              >
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinical opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-clinical" />
                </span>
                Live
              </span>
            )}
            {typeof similar === 'number' && similar > 0 && (
              <span
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gold-soft text-gold px-2.5 py-1 text-[0.7rem] font-semibold"
                title="Similar questions asked in the commons"
              >
                <TrendingUp className="size-3" />
                {similar.toLocaleString()} similar
              </span>
            )}
          </span>
        </div>

        <Link to={`/question/${question.id}`} className="block">
          <p className="text-muted-foreground text-[0.95rem] leading-relaxed line-clamp-2">
            {question.content}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <TopicChips slugs={question.topics} />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Hide answers' : `Show ${countLabel}`}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold transition-colors',
                open ? 'bg-accent text-accent-foreground' : 'hover:bg-muted hover:text-foreground',
              )}
            >
              <MessageCircle className="size-3.5" />
              {countLabel}
              <ChevronDown className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
            </button>
            <time>{timeAgo(question.createdAt)}</time>
          </div>
        </div>

        {/* Comments dropdown - answers nested under their question */}
        <div
          className={cn(
            'grid transition-all duration-300 ease-out',
            open ? '[grid-template-rows:1fr] opacity-100' : '[grid-template-rows:0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            {open && (
              <div className="mt-1 rounded-xl bg-muted/40 border p-4">
                <QuestionComments questionId={question.id} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
