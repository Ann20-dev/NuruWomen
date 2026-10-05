import { useEffect, useState } from 'react';
import { Activity, HeartPulse, Info, LifeBuoy } from 'lucide-react';

import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { areaDisplayName } from '@/lib/nuru/topics';
import { cn } from '@/lib/utils';
import { KENYA_BARS, KENYA_STATS } from '@/data/kenyaHealth';

const STAT_ICONS = [HeartPulse, Activity, LifeBuoy] as const;

/**
 * "Kenya in focus" - a bar chart of real WHO indicator values for Kenyan
 * women, with per-100k and years-based measures as stat tiles alongside.
 * Bars animate open on first view; reduced-motion users get final values.
 */
export function KenyaHealthChart() {
  const { t, lang } = useUiLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const tm = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(tm);
  }, []);

  const max = Math.max(...KENYA_BARS.map((b) => b.value));
  const barLabel = (bar: (typeof KENYA_BARS)[number]) => (lang === 'sw' ? (bar.labelSw ?? bar.label) : bar.label);

  return (
    <div className="space-y-6">
      {/* Percentage bars */}
      <div className="space-y-4" role="list" aria-label={t('coverage.kenyaAria')}>
        {KENYA_BARS.map((bar, i) => (
          <div key={bar.id} role="listitem" className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="text-sm font-medium">{barLabel(bar)}</p>
              <p className="text-sm font-bold tabular-nums text-primary">
                {bar.value}%
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">{bar.year}</span>
              </p>
            </div>
            <div
              className="h-3.5 rounded-full bg-muted/70 overflow-hidden"
              role="img"
              aria-label={`${barLabel(bar)}: ${bar.value}% (${bar.year})`}
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
                {lang === 'sw' ? (bar.noteSw ?? bar.note) : bar.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Per-100k and years stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {KENYA_STATS.map((stat, i) => {
          const Icon = STAT_ICONS[i % STAT_ICONS.length];
          const unitLabel =
            stat.unit === 'per-100k' ? t('coverage.unitPer100k') : stat.unit === 'years' ? t('coverage.unitYears') : stat.unit;
          return (
            <div key={stat.id} className="rounded-xl border bg-secondary/50 p-4 space-y-1">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                <Icon className="size-3.5 text-primary" />
                {areaDisplayName(stat.topic, lang)}
              </p>
              <p className="font-display text-2xl font-semibold text-primary tabular-nums">
                {stat.value}
                <span className="ml-1 text-sm font-sans font-normal text-muted-foreground">
                  {unitLabel}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === 'sw' ? (stat.labelSw ?? stat.label) : stat.label} · {stat.year}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed border-t pt-3">
        {t('coverage.kenyaSource')}
      </p>
    </div>
  );
}
