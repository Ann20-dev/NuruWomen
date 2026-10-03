import { Loader2, Route, ShieldAlert, ShieldCheck, TriangleAlert, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DEMO_TOPICS } from '@/lib/nuru/demoTopics';
import type { NuruAnalysis } from '@/lib/nuru/aiClient';
import type { AnalysisSource } from '@/hooks/useNuruAnalysis';

interface AiCheckPanelProps {
  status: 'idle' | 'checking' | 'ready' | 'failed';
  analysis: NuruAnalysis | null;
  source: AnalysisSource | null;
  error: string | null;
  onApplySuggestion: (title: string, content: string) => void;
}

const CATEGORY_LABELS = new Map(DEMO_TOPICS.map((t) => [t.id, t.label_en] as const));

/**
 * Privacy, safety and topic-routing check results.
 *
 * A failed check renders as visibly incomplete. It must never be mistaken
 * for a passed one, because publishing to a relay cannot be undone.
 */
export function AiCheckPanel({ status, analysis, source, error, onApplySuggestion }: AiCheckPanelProps) {
  if (status === 'idle') return null;

  if (status === 'checking') {
    return (
      <div className="rounded-xl border bg-muted/40 p-4 flex items-center gap-3" role="status">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Running the privacy, safety and topic check...</p>
      </div>
    );
  }

  if (status === 'failed' || analysis === null) {
    return (
      <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-3" role="alert">
        <ShieldAlert className="size-5 text-destructive shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-sm">Privacy check did not complete</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {error ?? 'The check could not run.'} Try again before posting. Publishing is permanent and cannot be undone.
          </p>
        </div>
      </div>
    );
  }

  const identifiersFound =
    analysis.privacy.title.contains_detected_identifiers ||
    analysis.privacy.content.contains_detected_identifiers;

  const urgent = analysis.safety.status === 'potential_urgent_concern';

  return (
    <div className="space-y-3">
      {urgent && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-3" role="alert">
          <TriangleAlert className="size-5 text-destructive shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-sm">Please read this first</p>
            <p className="text-sm leading-relaxed">
              {analysis.safety.message ??
                'If you may be in immediate danger or seriously unwell, seek urgent help from a local health service. Do not wait for an online reply.'}
            </p>
          </div>
        </div>
      )}

      {identifiersFound ? (
        <div className="rounded-xl border border-gold/50 bg-gold-soft/70 p-4 space-y-3" role="alert">
          <p className="font-semibold text-sm flex items-center gap-2">
            <TriangleAlert className="size-4 text-gold" /> Identifying details found
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Suggested version with details removed:</p>
            <p className="rounded-lg border bg-background/70 px-3 py-2 font-medium">
              {analysis.privacy.title.redacted_text}
            </p>
            <p className="rounded-lg border bg-background/70 px-3 py-2 whitespace-pre-wrap">
              {analysis.privacy.content.redacted_text}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full bg-background"
            onClick={() =>
              onApplySuggestion(
                analysis.privacy.title.redacted_text,
                analysis.privacy.content.redacted_text,
              )
            }
          >
            <Wand2 className="size-3.5" />
            Use the suggested version
          </Button>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This check cannot guarantee anonymity. Read the suggestion yourself before posting.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-clinical/35 bg-clinical-soft/60 p-4 flex items-start gap-3" role="status">
          <ShieldCheck className="size-5 text-clinical shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-sm">No identifying details detected</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Patterns can still miss names, workplaces and identifying stories. Read it once more before posting.
            </p>
          </div>
        </div>
      )}

      {/* Topic routing — the five broad categories */}
      <div className="rounded-xl border bg-card p-4 space-y-2">
        <p className="font-semibold text-sm flex items-center gap-2">
          <Route className="size-4 text-primary" /> Where your question belongs
        </p>
        {analysis.routing.categories.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {analysis.routing.categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full bg-primary/10 text-primary border border-primary/25 px-2.5 py-0.5 text-xs font-semibold"
              >
                {CATEGORY_LABELS.get(c.id) ?? c.id}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No topic matched — our team will place it for you.
          </p>
        )}
        <p className="text-xs text-muted-foreground leading-relaxed">
          This only guides where your question appears — it is never a diagnosis.
          {analysis.routing.scope_status === 'mixed_scope' &&
            ' Part of your question sits outside our main topics and will be reviewed.'}
          {analysis.routing.ambiguous_pregnancy_loss_wording &&
            ' Wording around pregnancy loss always gets careful human review.'}
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        {source === 'local'
          ? 'Checked privately on your device.'
          : 'Checked by the NuruWomen safety service.'}{' '}
        Suggestions only — never a diagnosis.
      </p>
    </div>
  );
}
