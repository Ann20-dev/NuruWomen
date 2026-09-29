import { TrendingUp } from 'lucide-react';

import { formatNumber } from '@/lib/nuru/format';

/**
 * The aggregate "community signal" — turns one woman's question into
 * evidence of a wider knowledge gap, without exposing anyone.
 */
export function CommunitySignal({ similarCount, insight }: { similarCount: number; insight?: string }) {
  return (
    <aside className="rounded-xl border border-gold/40 bg-gold-soft/70 p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold text-white">
          <TrendingUp className="size-4.5" />
        </span>
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-gold mb-1">Community signal</p>
          <p className="font-display font-semibold text-lg leading-snug">
            {formatNumber(similarCount)} similar questions have been asked in the commons.
          </p>
          {insight && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{insight}</p>}
          <p className="mt-2 text-xs text-muted-foreground">
            Aggregate only — no individual question or person can be identified from this statistic.
          </p>
        </div>
      </div>
    </aside>
  );
}
