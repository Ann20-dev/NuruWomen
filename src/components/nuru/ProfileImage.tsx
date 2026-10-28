import { cn } from '@/lib/utils';

interface ProfileImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Circular profile photograph with explicit dimensions, lazy loading and a
 * graceful fallback. Used for clinician and profile portraits.
 */
export function ProfileImage({ src, alt, width = 48, height = 48, className }: ProfileImageProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden',
        `aspect-[${width}/${height}]`,
        'rounded-full border border-border/60 bg-muted shadow-sm',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
        className="block h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 flex items-center justify-center bg-muted/60 text-muted-foreground/70 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      >
        {alt || 'Profile'}
      </div>
    </div>
  );
}

export { ProfileImage as default };
