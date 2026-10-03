import { Loader2, ShieldAlert, ShieldCheck, TriangleAlert, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { NuruAnalysis } from '@/lib/nuru/aiClient';

interface AiCheckPanelProps {
  status: 'idle' | 'checking' | 'ready' | 'failed';
  analysis: NuruAnalysis | null;
  error: string | null;
  onApplySuggestion: (title: string, content: string) => void;
}

/**
 * Server-side privacy and safety check results.
 *
 * A failed check renders as visibly incomplete. It must never be mistaken
 * for a passed one, because publishing to a relay cannot be undone.
 */
export function AiCheckPanel({ status, analysis, error, onApplySuggestion }: AiCheckPanelProps) {
  if (status === 'idle') return null;

  if (status === 'checking') {
    return (
      <div className="rounded-xl border bg-muted/40 p-4 flex items-center gap-3" role="status">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Running the privacy and safety check...</p>
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

      <p className="text-xs text-muted-foreground">
        Suggestions only, not a diagnosis. Answers are reviewed by people, not by this check.
      </p>
    </div>
  );
}