import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AppImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
}

/**
 * Consistent image handling: lazy loading, explicit dimensions (no layout
 * shift), and a graceful fallback when an asset is missing.
 */
export function AppImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  sizes,
  srcSet,
}: AppImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex items-center justify-center bg-muted text-muted-foreground text-xs rounded-xl', className)}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        Image unavailable
      </div>
    );
  }

  return (
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
      className={cn('max-w-full h-auto', className)}
    />
  );
}
