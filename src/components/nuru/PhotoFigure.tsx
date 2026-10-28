import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PhotoFigureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  srcSet?: string;
  sizes?: string;
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  cover?: boolean;
  overlay?: boolean;
  caption?: string;
}

const ROUND_CLASSES: Record<NonNullable<PhotoFigureProps['rounded']>, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Responsive, accessible photograph with explicit dimensions (no layout
 * shift), lazy loading, a graceful fallback, and an optional caption.
 * Informative images should always supply `alt`; purely decorative images
 * should pass `alt=""`.
 */
export function PhotoFigure({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  srcSet,
  sizes,
  rounded = 'xl',
  cover = false,
  overlay = false,
  caption,
}: PhotoFigureProps) {
  const [errored, setErrored] = useState(false);
  const hasCaption = Boolean(caption);
  const radius = ROUND_CLASSES[rounded ?? 'xl'];

  return (
    <figure
      className={cn(
        'm-0 relative group',
        overlay
          ? 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-[hsl(346_48%_36%/0.55)] after:via-[hsl(346_48%_36%/0.12)] after:to-transparent after:pointer-events-none'
          : '',
        className,
      )}
      aria-hidden={alt === '' ? true : undefined}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          cover ? 'aspect-[16/9]' : `aspect-[${width}/${height}]`,
          radius,
        )}
      >
        {errored ? (
          <div
            role="img"
            aria-label={alt || 'Image unavailable'}
            className={cn(
              'flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs',
              radius,
              cover ? 'aspect-[16/9]' : `aspect-[${width}/${height}]`,
            )}
          >
            {alt || 'Image unavailable'}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            sizes={sizes}
            srcSet={srcSet}
            onError={() => setErrored(true)}
            className={cn('block h-full w-full max-w-full', cover ? 'object-cover' : 'object-contain')}
          />
        )}
      </div>

      {hasCaption && (
        <figcaption className="mt-2 text-xs text-muted-foreground leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export { PhotoFigure as default };
