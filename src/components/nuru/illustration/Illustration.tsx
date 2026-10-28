import React, { type SVGProps } from 'react';

import { cn } from '@/lib/utils';

interface IllustrationProps {
  /** Inline SVG component to render (must accept className and SVG props) */
  children: React.ReactElement;
  /** Size - applied as width/height when no aspect-ratio class is given */
  size?: number | string;
  className?: string;
  /** Accessible name for informative illustrations; omitted = decorative (aria-hidden) */
  label?: string;
  /** Force decorative (aria-hidden) even when a label is present */
  decorative?: boolean;
}

export function Illustration({
  children,
  size,
  className,
  label,
  decorative = !label,
}: IllustrationProps) {
  const isDecorative = decorative || !label;
  const svgSize = typeof size === 'number' ? `${size}px` : size;

  const cloned = React.cloneElement(children, {
    className: cn(
      'block max-w-full h-auto transition-colors duration-300',
      svgSize ? `w-[${svgSize}] h-[${svgSize}]` : undefined,
      className,
    ),
    role: isDecorative ? 'presentation' : 'img',
    'aria-hidden': isDecorative ? true : undefined,
    'aria-label': isDecorative ? undefined : label,
  } as unknown as React.ReactElement<SVGProps<SVGSVGElement> & { className?: string }>);

  return <>{cloned}</>;
}
