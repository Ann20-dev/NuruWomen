import { useEffect, useState } from 'react';
import { Activity, HeartPulse, Info, LifeBuoy } from 'lucide-react';

import { cn } from '@/lib/utils';
import { KENYA_BARS, KENYA_STATS } from '@/data/kenyaHealth';

const STAT_ICONS = [HeartPulse, Activity, LifeBuoy] as const;

/**
 * "Kenya in focus" — a bar chart of real WHO indicator values for Kenyan
 * women, with per-100k and years-based measures as stat tiles alongside.
 * Bars animate open on first view; reduced-motion users get final values.
 */
export function KenyaHealthChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const max = Math.max(...KENYA_BARS.map((b) => b.value));

  return (
    <div className="space-y-6">
      {/* Percentage bars */}
      <div className="space-y-4" role="list" aria-label="Kenya women's health indicators in percent">
        {KENYA_BARS.map((bar, i) => (
          <div key={bar.id} role="listitem" className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="text-sm font-medium">{bar.label}</p>
              <p className="text-sm font-bold tabular-nums text-primary">
                {bar.value}%
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">{bar.year}</span>
              </p>
            </div>
            <div
              className="h-3.5 rounded-full bg-muted/70 overflow-hidden"
              role="img"
              aria-label={`${bar.label}: ${bar.value}% (${bar.year})`}
            >
              <div
                className={cn(
                  'h-full rounded-full transition-[width] duration-1000 ease-out motion-reduce:transition-none',
                  bar.id === 'caesarean' ? 'bg-gold' : 'bg-primary',
                )}
                style={{
                  width: mounted ? `${(bar.value / max) * 100}%` : '0%',
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            {bar.note && (
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <Info className="size-3 shrink-0 mt-0.5 text-gold" />
                {bar.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Per-100k and years stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {KENYA_STATS.map((stat, i) => {
          const Icon = STAT_ICONS[i % STAT_ICONS.length];
          return (
            <div key={stat.id} className="rounded-xl border bg-secondary/50 p-4 space-y-1">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                <Icon className="size-3.5 text-primary" />
                {stat.topic}
              </p>
              <p className="font-display text-2xl font-semibold text-primary tabular-nums">
                {stat.value}
                <span className="ml-1 text-sm font-sans font-normal text-muted-foreground">
                  {stat.unit === 'per-100k' ? 'per 100,000' : stat.unit}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.label} · {stat.year}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed border-t pt-3">
        Source: World Health Organization, latest available year for each indicator.
        Menstrual health has no global indicator — one reason it stays a blind spot.
      </p>
    </div>
  );
}
