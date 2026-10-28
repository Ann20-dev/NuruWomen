import { cn } from '@/lib/utils';

/**
 * Lightweight, dependency-free illustration of women in community.
 * Inline SVG keeps it fast, offline-friendly and privacy-preserving (no
 * external image requests).
 */
export function PeopleArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Illustration of women supporting each other"
      className={cn('w-full h-auto', className)}
    >
      <defs>
        <linearGradient id="pa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold-soft))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" rx="16" fill="url(#pa-bg)" />
      {/* figure 1 */}
      <g transform="translate(60,40)">
        <circle cx="0" cy="0" r="16" fill="hsl(var(--primary))" />
        <path d="M-22,80 Q0,40 22,80 L22,120 L-22,120 Z" fill="hsl(var(--clay))" opacity="0.9" />
        <path d="M-10,30 Q0,22 10,30" stroke="hsl(var(--primary-foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* figure 2 */}
      <g transform="translate(160,30)">
        <circle cx="0" cy="0" r="18" fill="hsl(var(--clinical))" />
        <path d="M-24,90 Q0,46 24,90 L24,130 L-24,130 Z" fill="hsl(var(--plum))" opacity="0.85" />
        <path d="M-11,32 Q0,24 11,32" stroke="hsl(var(--clinical-foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* figure 3 */}
      <g transform="translate(260,45)">
        <circle cx="0" cy="0" r="15" fill="hsl(var(--gold))" />
        <path d="M-20,75 Q0,38 20,75 L20,115 L-20,115 Z" fill="hsl(var(--primary))" opacity="0.8" />
        <path d="M-9,28 Q0,21 9,28" stroke="hsl(var(--gold-soft))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* ground */}
      <ellipse cx="160" cy="185" rx="150" ry="12" fill="hsl(var(--primary))" opacity="0.08" />
    </svg>
  );
}
