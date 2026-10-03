import { Link } from 'react-router-dom';
import { ArrowRight, EyeOff, Layers3, LockKeyhole, TrendingUp } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { CountUp } from '@/components/nuru/CountUp';
import { Reveal } from '@/components/nuru/Reveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import { BLIND_SPOTS, BLIND_SPOT_TOTAL, SIGNALS } from '@/data/blindspots';
import { formatNumber } from '@/lib/nuru/format';

export default function BlindSpotsPage() {
  useSeoMeta({
    title: 'Women’s Health Blind Spots — Nuru Commons',
    description: 'A live, aggregate map of the health questions women keep having to learn from each other — because existing systems are failing to explain them.',
  });

  const isMobile = useIsMobile();

  const chartData = [...BLIND_SPOTS]
    .sort((a, b) => b.count - a.count)
    .map((s) => ({ name: s.label, count: s.count, delta: s.deltaPct, topic: s.topic }));

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold inline-flex items-center gap-1.5">
            <TrendingUp className="size-4" /> Knowledge Gap Observatory
          </p>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight">
            Women’s Health Blind Spots
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We’re not just answering one woman. We’re identifying what thousands of women were never taught.
            Every anonymous question is classified and counted — in aggregate only — revealing what the
            health system keeps failing to explain.
          </p>
          <div className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border bg-card px-5 py-3 max-w-full">
            <CountUp value={BLIND_SPOT_TOTAL} className="font-display text-4xl font-semibold text-primary" />
            <span className="text-sm text-muted-foreground">questions classified this month, across {BLIND_SPOTS.length} tracked topics</span>
          </div>
        </div>

        {/* Signals */}
        <div className="grid gap-5 md:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <Reveal key={s.title} delay={i * 130}>
              <Card className="border-gold/40 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6 space-y-2">
                  <p className="font-display text-4xl font-semibold text-gold">{s.headline}</p>
                  <h2 className="font-semibold leading-snug">{s.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Chart */}
        <Reveal>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="font-display font-semibold text-2xl">What women are asking about</h2>
              <p className="text-xs text-muted-foreground">Questions this month · click a bar to explore the topic</p>
            </div>
            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: isMobile ? 4 : 12, right: isMobile ? 24 : 48, top: 4, bottom: 4 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={isMobile ? 96 : 140}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: isMobile ? 11 : 13, fill: 'var(--foreground)' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      color: 'var(--popover-foreground)',
                      fontSize: 13,
                    }}
                    formatter={(value, _name, item) => [
                      `${formatNumber(Number(value ?? 0))} questions · +${(item.payload as { delta: number }).delta}%`,
                      'This month',
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={entry.topic}
                        fill={i < 3 ? 'var(--gold)' : 'var(--primary)'}
                        fillOpacity={1 - Math.min(i * 0.045, 0.55)}
                        cursor="pointer"
                        onClick={() => {
                          window.location.href = `/topics/${entry.topic}`;
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        </Reveal>

        {/* Topic notes */}
        <Reveal>
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="divide-y">
            {[...BLIND_SPOTS].sort((a, b) => b.deltaPct - a.deltaPct).map((s) => (
              <Link
                key={s.topic}
                to={`/topics/${s.topic}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 sm:justify-start sm:gap-3">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{s.label}</h3>
                    <span className="text-xs font-semibold text-gold shrink-0 tabular-nums">+{s.deltaPct}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2 sm:line-clamp-1">{s.note}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
        </Reveal>

        {/* Privacy methodology */}
        <Reveal className="grid gap-5 md:grid-cols-3">
          <Card className="md:col-span-1 border-clinical/35 bg-clinical-soft/40">
            <CardContent className="p-6 space-y-3">
              <LockKeyhole className="size-6 text-clinical" />
              <h2 className="font-display font-semibold text-xl">How this protects women</h2>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>Published only in aggregate — never individual questions or users.</li>
                <li>A number is only shown once at least 25 women have asked similar questions.</li>
                <li>No county-level or facility-level breakdowns below threshold.</li>
                <li>Questions are anonymized before publication; no accounts exist to correlate.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Layers3 className="size-5 text-primary" />
                <h2 className="font-display font-semibold text-xl">From a whisper to a public-health signal</h2>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                {[
                  'A woman asks anonymously; names, numbers and locations are removed first.',
                  'The question is classified by topic (transparent keyword matching today; clustered multilingual models on the roadmap).',
                  'Similar questions cluster: 500 variations of one confusion become one visible gap.',
                  'Aggregates above the privacy threshold publish here — for educators, clinicians, NGOs and county health teams.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="border-t pt-4 flex flex-wrap items-center gap-3">
                <Button asChild className="rounded-full">
                  <Link to="/ask"><EyeOff className="size-4" /> Add your anonymous question</Link>
                </Button>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Your question is never shown here individually. It only ever becomes part of a number too large to identify anyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
