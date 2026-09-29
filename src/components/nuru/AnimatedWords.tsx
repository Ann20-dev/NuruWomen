import { cn } from '@/lib/utils';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  /** Words to highlight with the animated gradient (case-insensitive, punctuation ignored) */
  highlight?: string[];
  /** Delay between words, in milliseconds */
  step?: number;
  /** Delay before the first word, in milliseconds */
  startDelay?: number;
}

/**
 * Splits a headline into words that rise in one by one, masked by an
 * overflow container — a classic editorial text animation. Selected words
 * get an animated gradient sweep. Full text stays available to screen
 * readers via an sr-only copy; reduced-motion users see it instantly.
 */
export function AnimatedWords({
  text,
  className,
  highlight = [],
  step = 70,
  startDelay = 150,
}: AnimatedWordsProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z'’]/g, '');
        const isHighlight = highlight.includes(clean);
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
          >
            <span
              className={cn('inline-block animate-word-rise will-change-transform', isHighlight && 'text-shine')}
              style={{ animationDelay: `${startDelay + i * step}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}
