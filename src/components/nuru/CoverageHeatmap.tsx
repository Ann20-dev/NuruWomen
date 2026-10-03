import { useMemo, useState } from 'react';
import { Database, Flag } from 'lucide-react';

import { cn } from '@/lib/utils';
import coverage from '@/data/researchCoverage.json';

/**
 * Knowledge gap dashboard: topics × countries coverage heatmap.
 *
 * Natively renders the data scientist's imported coverage snapshots
 * (canonical CSVs in `data/`, synced to `src/data/researchCoverage.json`).
 * Levels: 0 = gap, 1 = partial data, 2 = well covered.
 */

const LEVEL_NOTES: Record<number, string> = {
  0: 'No reliable data found yet for this topic in this country.',
  1: 'Some data exists, but it is thin or out of date.',
  2: 'Good data coverage found.',
};

const LEVEL_LABELS: Record<number, string> = {
  0: 'Gap — no data',
  1: 'Some data',
  2: 'Well covered',
};

const LEVEL_CELL: Record<number, string> = {
  0: 'bg-accent hover:bg-accent/70',
  1: 'bg-primary/30 hover:bg-primary/40',
  2: 'bg-primary hover:bg-primary/85',
};

interface DetailRow {
  mvp_topic: string;
  country: string;
  records: number;
  level: number;
}

export function CoverageHeatmap() {
  const topics = useMemo(() => {
    const seen: string[] = [];
    for (const row of coverage.detail) {
      if (!seen.includes(row.mvp_topic)) seen.push(row.mvp_topic);
    }
    return seen;
  }, []);

  const countries = useMemo(
    () => [...new Set(coverage.detail.map((r) => r.country))].sort(),
    [],
  );

  const cellByKey = useMemo(() => {
    const map = new Map<string, DetailRow>();
    for (const row of coverage.detail) map.set(`${row.mvp_topic}::${row.country}`, row);
    return map;
  }, []);

  const summaryByTopic = useMemo(
    () => new Map(coverage.summary.map((s) => [s.mvp_topic, s] as const)),
    [],
  );

  const [selected, setSelected] = useState<DetailRow>(
    () => cellByKey.get('Healthy ageing::Algeria') ?? coverage.detail[0],
  );

  const selectedSummary = summaryByTopic.get(selected.mvp_topic);

  return (
    <section aria-label="Knowledge gap dashboard" className="space-y-5">
      {/* Per-topic coverage stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {topics.map((topic) => {
          const summary = summaryByTopic.get(topic);
          if (!summary) return null;
          return (
            <div
              key={topic}
              className={cn(
                'relative rounded-xl border bg-card p-4 text-center',
                summary.is_proxy && 'border-gold',
              )}
            >
              {summary.is_proxy && (
                <span className="absolute top-2 right-2 rounded border border-gold px-1 py-0.5 text-[0.6rem] font-bold text-gold">
                  PROXY
                </span>
              )}
              <p className="font-display text-2xl font-semibold text-primary">
                {Math.round(summary.coverage_pct)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">{topic}</p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-primary" /> Well covered
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-primary/30" /> Some data
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-accent border" /> Gap — no data
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-gold" /> Research estimate
        </span>
        <span className="ml-auto hidden sm:inline">Select a cell for detail</span>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="border-collapse text-xs" role="grid">
          <caption className="sr-only">
            Coverage heatmap of five topics across {countries.length} African countries
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card border-b border-r p-2 text-left font-semibold whitespace-nowrap"
              >
                Topic \ Country
              </th>
              {countries.map((country) => (
                <th
                  key={country}
                  scope="col"
                  className="border-b p-1 align-bottom font-medium"
                >
                  <span
                    className="block whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {country}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => {
              const summary = summaryByTopic.get(topic);
              return (
                <tr key={topic}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card border-r border-t p-2 text-left font-semibold whitespace-nowrap"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {topic}
                      {summary?.is_proxy && (
                        <span
                          className="inline-block size-2.5 rounded-sm bg-gold"
                          title="Research estimate"
                        />
                      )}
                    </span>
                  </th>
                  {countries.map((country) => {
                    const cell = cellByKey.get(`${topic}::${country}`);
                    const level = cell?.level ?? 0;
                    const isSelected =
                      selected.mvp_topic === topic && selected.country === country;
                    return (
                      <td key={country} className="border-t p-0.5">
                        <button
                          type="button"
                          onClick={() => cell && setSelected(cell)}
                          aria-label={`${topic} — ${country}: ${LEVEL_LABELS[level]}`}
                          aria-pressed={isSelected}
                          className={cn(
                            'block h-5 w-6 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                            LEVEL_CELL[level],
                            isSelected && 'ring-2 ring-foreground ring-offset-1',
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cell detail */}
      <div
        aria-live="polite"
        className="rounded-xl border bg-card p-4 sm:p-5 text-sm leading-relaxed flex items-start gap-3"
      >
        {selected.level === 0 ? (
          <Flag className="size-4 shrink-0 mt-0.5 text-gold" />
        ) : (
          <Database className="size-4 shrink-0 mt-0.5 text-primary" />
        )}
        <p>
          <strong className="text-primary">
            {selected.mvp_topic} — {selected.country}:
          </strong>{' '}
          {LEVEL_NOTES[selected.level]}
          {selected.records > 0 && ` ${selected.records.toLocaleString()} data points.`}
          {selectedSummary?.data_source && ` Source: ${selectedSummary.is_proxy ? 'published research (Iyanda et al., 2020)' : 'World Health Organization'}.`}
        </p>
      </div>
    </section>
  );
}
