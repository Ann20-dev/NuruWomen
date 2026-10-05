import { BookOpenCheck, MessagesSquare, ShieldCheck } from 'lucide-react';

import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { cn } from '@/lib/utils';
import type { AnswerType } from '@/lib/nuru/protocol';
import type { UiKey } from '@/lib/nuru/i18n';

type Layer = AnswerType | 'evidence-card';

const LAYER_STYLES: Record<Layer, { labelKey: UiKey; className: string; Icon: typeof MessagesSquare }> = {
  'lived-experience': {
    labelKey: 'layer.lived',
    className: 'bg-clay-soft text-clay border-clay/25',
    Icon: MessagesSquare,
  },
  'clinical-response': {
    labelKey: 'layer.clinical',
    className: 'bg-clinical-soft text-clinical border-clinical/25',
    Icon: ShieldCheck,
  },
  'evidence-card': {
    labelKey: 'layer.evidence',
    className: 'bg-plum-soft text-plum border-plum/25',
    Icon: BookOpenCheck,
  },
};

export function LayerBadge({ layer, className }: { layer: Layer; className?: string }) {
  const { t } = useUiLanguage();
  const { labelKey, className: styles, Icon } = LAYER_STYLES[layer];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide',
        styles,
        className,
      )}
    >
      <Icon className="size-3" />
      {t(labelKey)}
    </span>
  );
}

/** The disclaimer line that must always travel with a layer. */
export function LayerDisclaimer({ layer }: { layer: Layer }) {
  const { t } = useUiLanguage();
  if (layer === 'lived-experience') {
    return (
      <p className="text-xs text-clay/90 dark:text-clay italic">
        {t('layer.livedDisclaimer')}
      </p>
    );
  }
  if (layer === 'clinical-response') {
    return (
      <p className="text-xs text-clinical/90 dark:text-clinical italic">
        {t('layer.clinicalDisclaimer')}
      </p>
    );
  }
  return (
    <p className="text-xs text-plum/90 dark:text-plum italic">
      {t('layer.evidenceDisclaimer')}
    </p>
  );
}
