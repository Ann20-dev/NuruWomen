import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

import { BLIND_SPOTS } from '@/data/blindspots';
import { formatNumber } from '@/lib/nuru/format';
import { cn } from '@/lib/utils';

/**
 * Monthly ranking of the most-discussed health topics. Privacy rule (shared
 * with the rest of the dashboard): figures only ever appear in aggregate,
 * with group sizes far above the k-anonymity threshold - a ranking can never
 * be traced back to one woman or one question.
 */
const RANKED = [...BLIND_SPOTS].sort((a, b) => b.count - a.count);
const MAX = RANKED[0]?.count ?? 1;

/** Full ranked leaderboard - the Coverage dashboard version. */
export function TrendingBoard({ limit = RANKED.length }: { limit?: number }) {
  return (
    <ol className="space-y-2.5">
      {RANKED.slice(0, limit).map((stat, i) => (
        <li key={stat.topic}>
          <Link
            to={`/topics/${stat.topic}`}
            className="group flex items-center gap-3 sm:gap-4 rounded-xl border bg-card px-3.5 sm:px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold/50"
          >
            <span
              aria-hidden
              className={cn(
                'inline-flex size-8 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm',
                i === 0 && 'bg-gold text-white',
                i === 1 && 'bg-gold/70 text-white',
                i === 2 && 'bg-gold/45 text-white',
                i > 2 && 'bg-secondary text-muted-foreground',
              )}
            >
              {i + 1}
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3 flex-wrap">
                <span className="font-semibold truncate group-hover:text-primary transition-colors">
                  {stat.label}
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {formatNumber(stat.count)} questions
                </span>
              </span>
              <span aria-hidden className="mt-1.5 block h-1.5 rounded-full bg-secondary overflow-hidden">
                <span
                  className={cn('block h-full rounded-full', i < 3 ? 'bg-gold' : 'bg-muted-foreground/35')}
                  style={{ width: `${Math.max(6, Math.round((stat.count / MAX) * 100))}%` }}
                />
              </span>
            </span>

            <span
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold-soft text-gold px-2 py-0.5 text-xs font-bold"
              title="Change vs last month"
            >
              <TrendingUp className="size-3" />
              +{stat.deltaPct}%
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Compact ranked pills - the home-page strip version. */
export function TrendingStrip({ limit = 5 }: { limit?: number }) {
  return (
    <ol className="flex flex-wrap gap-2">
      {RANKED.slice(0, limit).map((stat, i) => (
        <li key={stat.topic}>
          <Link
            to={`/topics/${stat.topic}`}
            className="group inline-flex items-center gap-2 rounded-full border bg-card pl-1.5 pr-3.5 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-gold/50"
          >
            <span
              aria-hidden
              className={cn(
                'inline-flex size-6 items-center justify-center rounded-full font-display font-bold text-xs',
                i === 0 ? 'bg-gold text-white' : 'bg-secondary text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <span className="group-hover:text-primary transition-colors">{stat.label}</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-gold">
              <TrendingUp className="size-3" />
              {stat.deltaPct}%
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
