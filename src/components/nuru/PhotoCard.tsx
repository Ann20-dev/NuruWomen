import { cn } from '@/lib/utils';

interface PhotoCardProps {
  /** Photo shown at the top of the card. */
  photo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card that pairs a photograph with supporting content. Used for clinician
 * profiles, service cards, and community features.
 */
export function PhotoCard({ photo, className, children }: PhotoCardProps) {
  return (
    <div
      data-slot="photo-card"
      className={cn(
        'flex flex-col gap-4 rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/25',
        className,
      )}
    >
      {photo && (
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(346_48%_36%/0.55)] via-[hsl(346_48%_36%/0.10)] to-transparent" />
        </div>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export { PhotoCard as default };
