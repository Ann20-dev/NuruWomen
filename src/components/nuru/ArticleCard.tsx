import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Clock3 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { getArea } from '@/lib/nuru/topics';
import type { Article } from '@/lib/nuru/types';

export function ArticleCard({ article }: { article: Article }) {
  const area = getArea(article.area);

  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25">
      <CardContent className="p-5 flex flex-col h-full gap-3">
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="text-primary">{area?.name ?? article.area}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="size-3" />{article.minutes} min</span>
        </div>
        <Link to={`/library/${article.slug}`}>
          <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.summary}</p>
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-clinical font-medium">
            <BadgeCheck className="size-3.5" /> Clinical review pending
          </span>
          <Link
            to={`/library/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all"
          >
            Read <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
