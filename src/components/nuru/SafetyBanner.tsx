import { PhoneCall, Siren } from 'lucide-react';

import type { SafetyFlag } from '@/lib/nuru/safety';

/**
 * Red-flag guidance surfaced before a question is published.
 * Calm, concrete, and never a diagnosis.
 */
export function SafetyBanner({ flags }: { flags: SafetyFlag[] }) {
  if (flags.length === 0) return null;

  return (
    <div className="space-y-3" role="alert">
      {flags.map((flag) => (
        <div key={flag.id} className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
              <Siren className="size-4.5" />
            </span>
            <div className="space-y-1.5">
              <h3 className="font-semibold">{flag.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{flag.guidance}</p>
              {flag.resource && (
                <p className="text-sm font-medium flex items-center gap-1.5 pt-1">
                  <PhoneCall className="size-4 shrink-0" />
                  {flag.resource}
                </p>
              )}
              <p className="text-xs text-muted-foreground pt-1">
                You can still post your question. The community’s experience is valuable, but please seek
                in-person care first.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
