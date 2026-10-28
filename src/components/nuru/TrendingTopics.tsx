import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

import { BLIND_SPOTS } from '@/data/blindspots';
import { formatNumber } from '@/lib/nuru/format';
import { cn } from '@/lib/utils';
import { TopicIcon } from '@/components/nuru/icons/TopicIcon';
import { TrendSparkline } from '@/components/nuru/TrendSparkline';

/**
 * Monthly ranking of the most-discussed health topics. Privacy rule (shared
 * with the rest of the dashboard): figures only ever appear in aggregate,
 * with group sizes far above the k-anonymity threshold - a ranking can never
 * be traced back to one woman or one question.
 */
const RANKED = [...BLIND_SPOTS].sort((a, b) => b.count - a.count);
const MAX = RANKED[0]?.count ?? 1;

const RANK_COLORS = ['bg-gold text-white', 'bg-gold/70 text-white', 'bg-gold/45 text-white'];

/** Shared ranked row - used by both the board and the strip. */
function TrendingRow({
  stat,
  i,
  variant,
}: {
  stat: (typeof RANKED)[number];
  i: number;
  variant: 'board' | 'strip';
}) {
  const isTop3 = i < 3;
  const barWidth = Math.max(6, Math.round((stat.count / MAX) * 100));
  const trendColor = isTop3 ? 'var(--gold)' : 'var(--pattern-terracotta)';

  const rankBadge = (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold',
        variant === 'board' ? 'size-8 text-sm' : 'size-6 text-xs',
        i < 3 ? RANK_COLORS[i] : 'bg-secondary text-muted-foreground',
      )}
    >
      {i + 1}
    </span>
  );

  const deltaPill = (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full bg-gold-soft text-gold px-2 py-0.5 text-xs font-bold',
        variant === 'board' ? 'px-2.5 py-1' : '',
      )}
      title="Change vs last month"
    >
      <TrendingUp className={cn('size-3', variant === 'board' && 'size-3.5')} />
      +{stat.deltaPct}%
    </span>
  );

  const sparkline = (
    <TrendSparkline
      trendPct={stat.deltaPct}
      size={variant === 'board' ? 96 : 72}
      height={variant === 'board' ? 34 : 26}
      color={trendColor}
    />
  );

  const baseLink = cn(
    'group transition-all duration-300',
    variant === 'board'
      ? 'flex items-center gap-3 sm:gap-4 rounded-xl border bg-card px-3.5 sm:px-5 py-3 hover:-translate-y-0.5 hover:shadow-md hover:border-gold/50'
      : 'inline-flex items-center gap-2 rounded-full border bg-card pl-1.5 pr-3.5 py-1.5 text-sm font-medium hover:-translate-y-0.5 hover:shadow-sm hover:border-gold/50',
  );

  return (
    <li key={stat.topic}>
      <Link to={`/topics/${stat.topic}`} className={baseLink}>
        {variant === 'board' ? rankBadge : null}

        {variant === 'strip' ? (
          <div className="flex items-center gap-2">
            {rankBadge}
            <TopicIcon slug={stat.topic} size="sm" />
          </div>
        ) : (
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-3 flex-wrap">
              <span className="font-semibold truncate group-hover:text-primary transition-colors">
                {stat.label}
              </span>
              <span className="text-sm tabular-nums text-muted-foreground">
                {formatNumber(stat.count)} questions
              </span>
            </span>
            <span
              aria-hidden
              className="mt-1.5 block h-1.5 rounded-full bg-secondary overflow-hidden"
            >
              <span
                className={cn('block h-full rounded-full', isTop3 ? 'bg-gold' : 'bg-muted-foreground/35')}
                style={{ width: `${barWidth}%` }}
              />
            </span>
          </span>
        )}

        <div className="shrink-0 flex items-center gap-1.5">
          {variant === 'board' ? (
            <>
              {sparkline}
              {deltaPill}
            </>
          ) : (
            <>
              <span className="group-hover:text-primary transition-colors">{stat.label}</span>
              {deltaPill}
            </>
          )}
        </div>
      </Link>
    </li>
  );
}

/** Full ranked leaderboard - the Coverage dashboard version. */
export function TrendingBoard({ limit = RANKED.length }: { limit?: number }) {
  return (
    <ol className="space-y-2.5">
      {RANKED.slice(0, limit).map((stat, i) => (
        <TrendingRow key={stat.topic} stat={stat} i={i} variant="board" />
      ))}
    </ol>
  );
}

/** Compact ranked pills - the home-page strip version. */
export function TrendingStrip({ limit = 5 }: { limit?: number }) {
  return (
    <ol className="flex flex-wrap gap-2">
      {RANKED.slice(0, limit).map((stat, i) => (
        <TrendingRow key={stat.topic} stat={stat} i={i} variant="strip" />
      ))}
    </ol>
  );
}
