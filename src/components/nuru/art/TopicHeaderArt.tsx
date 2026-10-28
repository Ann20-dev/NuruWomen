import { TopicIcon } from '@/components/nuru/icons/TopicIcon';
import { cn } from '@/lib/utils';
import { getTopic } from '@/lib/nuru/topics';

/** Map each topic area to a soft background color + contrasting foreground. */
const TOPIC_TILE: Record<string, { bg: string; fg: string }> = {
  'growing-up': { bg: 'bg-gold-soft', fg: 'text-gold' },
  'menstrual-health': { bg: 'bg-clay-soft', fg: 'text-clay' },
  'hormones': { bg: 'bg-clinical-soft', fg: 'text-clinical' },
  'conditions': { bg: 'bg-clay-soft', fg: 'text-clay' },
  'sexual-health': { bg: 'bg-clay-soft', fg: 'text-clay' },
  'fertility': { bg: 'bg-gold-soft', fg: 'text-gold' },
  'pregnancy': { bg: 'bg-gold-soft', fg: 'text-gold' },
  'postpartum': { bg: 'bg-plum-soft', fg: 'text-plum' },
  'cancer-prevention': { bg: 'bg-plum-soft', fg: 'text-plum' },
  'mental-health': { bg: 'bg-clinical-soft', fg: 'text-clinical' },
  'pelvic-health': { bg: 'bg-clinical-soft', fg: 'text-clinical' },
  'perimenopause': { bg: 'bg-plum-soft', fg: 'text-plum' },
  'menopause': { bg: 'bg-plum-soft', fg: 'text-plum' },
  'healthy-ageing': { bg: 'bg-clay-soft', fg: 'text-clay' },
  default: { bg: 'bg-accent', fg: 'text-accent-foreground' },
};

interface TopicHeaderArtProps {
  slug: string;
  className?: string;
}

/** Decorative topic tile: topic icon inside a softly colored rounded tile.
 *  The adjacent heading carries the meaning; this is aria-hidden. */
export function TopicHeaderArt({ slug, className }: TopicHeaderArtProps) {
  const topic = getTopic(slug);
  const tile = topic ? (TOPIC_TILE[topic.area] ?? TOPIC_TILE.default) : TOPIC_TILE.default;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-2xl p-3 sm:p-4 shadow-sm border border-primary/20',
        tile.bg,
        tile.fg,
        className,
      )}
      role="img"
      aria-label={`Topic: ${topic?.name ?? slug}`}
    >
      <TopicIcon slug={slug} size="lg" color="inherit" />
    </div>
  );
}
