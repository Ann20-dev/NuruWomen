import { BookOpenCheck, MessagesSquare, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { AnswerType } from '@/lib/nuru/protocol';

type Layer = AnswerType | 'evidence-card';

const LAYER_STYLES: Record<Layer, { label: string; className: string; Icon: typeof MessagesSquare }> = {
  'lived-experience': {
    label: 'Lived experience',
    className: 'bg-clay-soft text-clay border-clay/25',
    Icon: MessagesSquare,
  },
  'clinical-response': {
    label: 'Clinical response',
    className: 'bg-clinical-soft text-clinical border-clinical/25',
    Icon: ShieldCheck,
  },
  'evidence-card': {
    label: 'Draft evidence card',
    className: 'bg-plum-soft text-plum border-plum/25',
    Icon: BookOpenCheck,
  },
};

export function LayerBadge({ layer, className }: { layer: Layer; className?: string }) {
  const { label, className: styles, Icon } = LAYER_STYLES[layer];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide',
        styles,
        className,
      )}
    >
      <Icon className="size-3" />
      {label}
    </span>
  );
}

/** The disclaimer line that must always travel with a layer. */
export function LayerDisclaimer({ layer }: { layer: Layer }) {
  if (layer === 'lived-experience') {
    return (
      <p className="text-xs text-clay/90 dark:text-clay italic">
        Personal experience — not medical advice.
      </p>
    );
  }
  if (layer === 'clinical-response') {
    return (
      <p className="text-xs text-clinical/90 dark:text-clinical italic">
        Clinical education — not a personal consultation.
      </p>
    );
  }
  return (
    <p className="text-xs text-plum/90 dark:text-plum italic">
      Clinically reviewed education. Not a personal diagnosis.
    </p>
  );
}
