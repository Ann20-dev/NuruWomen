import { cn } from '@/lib/utils';
import { ART } from './palette';

/**
 * Kitenge-inspired pattern strip used as a section divider.
 * Decorative only - carries no information.
 */
export function KitengeDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('overflow-hidden', className)}>
      <svg
        viewBox="0 0 1200 28"
        preserveAspectRatio="none"
        className="block h-5 w-full"
        role="presentation"
      >
        <defs>
          <pattern id="kitenge-strip" width="48" height="28" patternUnits="userSpaceOnUse">
            <rect width="48" height="28" fill={ART.wine} />
            <path d="M0 14 L12 2 L24 14 L12 26 Z" fill={ART.saffron} />
            <path d="M24 14 L36 2 L48 14 L36 26 Z" fill={ART.clay} />
            <circle cx="12" cy="14" r="2.5" fill={ART.cream} />
            <circle cx="36" cy="14" r="2.5" fill={ART.sage} />
          </pattern>
        </defs>
        <rect width="1200" height="28" fill="url(#kitenge-strip)" />
      </svg>
    </div>
  );
}
