import { useState } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  CalendarCheck2,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';

import { sanitizeUrl } from '@/lib/utils';
import type { EvidenceCardData } from '@/lib/nuru/types';

/**
 * The structured Evidence Card — the third knowledge layer.
 * Plum-coded, clearly reviewed, sources attached.
 */
export function EvidenceCardView({ card, compact = false }: { card: EvidenceCardData; compact?: boolean }) {
  const [open, setOpen] = useState(!compact);

  return (
    <section className="rounded-xl border border-plum/35 bg-plum-soft/60 overflow-hidden">
      <header className="p-5 pb-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-plum text-plum-foreground">
          <BookOpenCheck className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-plum mb-1">Evidence card</p>
          <h3 className="font-display font-semibold text-lg leading-snug">{card.title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-plum" /> {card.reviewer}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarCheck2 className="size-3.5 text-plum" /> Status: {card.reviewedAt}
            </span>
          </div>
        </div>
        {compact && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full p-1.5 text-plum hover:bg-plum/10 transition-colors"
            aria-expanded={open}
            aria-label={open ? 'Collapse evidence card' : 'Expand evidence card'}
          >
            <ChevronDown className={`size-5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </header>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <p className="leading-relaxed text-[0.95rem]">{card.summary}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-card border p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-2">
                <ListChecks className="size-4 text-plum" /> Common causes
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                {card.commonCauses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-card border border-destructive/30 p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-2 text-destructive">
                <AlertTriangle className="size-4" /> Red flags — don’t wait
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                {card.redFlags.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-card border p-4">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-2">
              <CircleHelp className="size-4 text-plum" /> What to ask your clinician
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
              {card.questionsForClinician.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Sources</h4>
            <ul className="space-y-1">
              {card.sources.map((s) => {
                const url = sanitizeUrl(s.url);
                return (
                  <li key={s.label}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-plum hover:underline underline-offset-2"
                      >
                        {s.label} <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{s.label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="text-xs text-plum/90 dark:text-plum italic border-t border-plum/20 pt-3">
            Clinically reviewed educational summary. It explains patterns and options — it cannot diagnose you.
          </p>
        </div>
      )}
    </section>
  );
}
