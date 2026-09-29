import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { TopicChips } from '@/components/nuru/TopicChips';
import { timeAgo } from '@/lib/nuru/format';
import type { Question } from '@/lib/nuru/types';

export function QuestionCard({ question, answerCount }: { question: Question; answerCount?: number }) {
  return (
    <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Link to={`/question/${question.id}`} className="min-w-0">
            <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
              {question.title}
            </h3>
          </Link>
          {question.signal && (
            <span
              className="hidden sm:inline-flex items-center gap-1 shrink-0 rounded-full bg-gold-soft text-gold px-2.5 py-1 text-[0.7rem] font-semibold"
              title="Similar questions asked in the commons"
            >
              <TrendingUp className="size-3" />
              {question.signal.similarCount.toLocaleString()} similar
            </span>
          )}
        </div>

        <Link to={`/question/${question.id}`} className="block">
          <p className="text-muted-foreground text-[0.95rem] leading-relaxed line-clamp-2">
            {question.content}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <TopicChips slugs={question.topics} />
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {typeof answerCount === 'number' && (
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="size-3.5" />
                {answerCount} {answerCount === 1 ? 'answer' : 'answers'}
              </span>
            )}
            <time>{timeAgo(question.createdAt)}</time>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
