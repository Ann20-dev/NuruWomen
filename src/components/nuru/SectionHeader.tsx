import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  kicker?: string;
  heading: string;
  description?: string;
  /** Optional illustration to place beside the text on larger screens */
  illustration?: ReactNode;
  className?: string;
  /** Heading level for SEO/accessibility */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

const HeadingMap: Record<'h1' | 'h2' | 'h3' | 'h4', ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};

export function SectionHeader({
  kicker,
  heading,
  description,
  illustration,
  className,
  as = 'h2',
}: SectionHeaderProps) {
  const Tag = HeadingMap[as];

  return (
    <div
      className={cn(
        'space-y-2',
        illustration ? 'grid items-start lg:grid-cols-[1fr_auto] lg:gap-10 lg:items-center gap-8' : 'gap-3',
        className,
      )}
    >
      {kicker && (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
          {kicker}
        </p>
      )}
      <Tag className="font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-snug">
        {heading}
      </Tag>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
      {illustration && (
        <div className="self-start lg:self-center hidden lg:block" aria-hidden="true">
          {illustration}
        </div>
      )}
    </div>
  );
}
