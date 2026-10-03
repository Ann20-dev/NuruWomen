import { EyeOff, ShieldCheck, TriangleAlert, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { PiiFinding } from '@/lib/nuru/privacy';

interface PrivacyCheckPanelProps {
  findings: PiiFinding[];
  onApplyRedaction?: () => void;
  checked: boolean;
}

/**
 * The privacy pre-flight: shows what identifying information was detected
 * before anything is signed, and offers a one-tap anonymized version.
 */
export function PrivacyCheckPanel({ findings, onApplyRedaction, checked }: PrivacyCheckPanelProps) {
  if (!checked) return null;

  if (findings.length === 0) {
    return (
      <div className="rounded-xl border border-clinical/35 bg-clinical-soft/60 p-4 flex items-start gap-3" role="status">
        <ShieldCheck className="size-5 text-clinical shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Privacy check passed</p>
          <p className="text-sm text-muted-foreground">
            No names, phone numbers, emails, ID numbers or locations detected. Patterns can miss identifiers. Review the text yourself.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/50 bg-gold-soft/70 p-4 sm:p-5 space-y-3" role="alert">
      <div className="flex items-start gap-3">
        <TriangleAlert className="size-5 text-gold shrink-0 mt-0.5" />
        <div className="space-y-2 flex-1">
          <p className="font-semibold text-sm flex items-center gap-2">
            <EyeOff className="size-4" /> Personal information detected
          </p>
          <ul className="space-y-1">
            {findings.map((f) => (
              <li key={`${f.type}-${f.match}`} className="text-sm flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-gold/15 text-gold px-2 py-0.5 text-xs font-semibold">
                  {f.label}
                </span>
                <code className="text-xs bg-background/70 px-1.5 py-0.5 rounded border">{f.match}</code>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Health questions here are public and permanent. Remove identifying details before posting —
            your care does not depend on your name.
          </p>
          {onApplyRedaction && (
            <Button size="sm" variant="outline" onClick={onApplyRedaction} className="rounded-full bg-background">
              <Wand2 className="size-3.5" />
              Suggest a redacted version
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
