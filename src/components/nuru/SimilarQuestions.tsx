import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

import type { SimilarMatch } from '@/lib/nuru/similar';
import { formatNumber } from '@/lib/nuru/format';

/**
 * "You are not the first to ask this" - shown live while a question is being
 * written. Turns a private worry into evidence of a shared knowledge gap,
 * and points the writer to existing threads before they publish.
 */
export function SimilarQuestions({ matches, count }: { matches: SimilarMatch[]; count: number }) {
  if (count === 0) return null;

  return (
    <aside className="rounded-xl border border-gold/40 bg-gold-soft/70 p-5 space-y-3" aria-live="polite">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold text-white">
          <TrendingUp className="size-4.5" />
        </span>
        <div className="space-y-1">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-gold">You are not alone in asking</p>
          <p className="font-display font-semibold text-lg leading-snug">
            {formatNumber(count)} similar question{count === 1 ? ' has' : 's have'} been asked in the commons.
          </p>
        </div>
      </div>

      {matches.length > 0 && (
        <ul className="space-y-1.5 pl-12">
          {matches.map(({ question }) => (
            <li key={question.id}>
              <Link
                to={`/question/${question.id}`}
                className="text-sm font-medium text-foreground/90 hover:text-primary hover:underline leading-snug line-clamp-1"
              >
                {question.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-muted-foreground pl-12">
        Your words are matched on this device only. Nothing is sent anywhere until you publish.
      </p>
    </aside>
  );
}
