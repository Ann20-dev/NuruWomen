import { cn } from '@/lib/utils';

/**
 * African-inspired pattern dividers - decorative only, carries no information.
 *
 * kind:
 * - 'kente'   - diamond/woven motif (burgundy, gold, terracotta, green)
 * - 'mudcloth'- organic geometric blocks (terracotta on cream)
 * - 'ndebele' - bold triangular/chevron geometry (burgundy, gold)
 * - 'kanga'   - soft scalloped border motif (mint, plum, gold)
 *
 * All patterns use theme CSS variables so they adapt to dark mode. Rendered
 * as inline SVG with no external dependencies and no layout shift.
 */
export type PatternKind = 'kente' | 'mudcloth' | 'ndebele' | 'kanga';

interface PatternDividerProps {
  kind?: PatternKind;
  height?: number;
  className?: string;
  /** Optional thickness accent color override; defaults to theme pattern-wine. */
  accent?: string;
}

export function PatternDivider({
  kind = 'kente',
  height = 28,
  className,
  accent,
}: PatternDividerProps) {
  const h = height;
  const color = accent || 'hsl(var(--pattern-wine))';
  const gold = 'hsl(var(--pattern-gold))';
  const terracotta = 'hsl(var(--pattern-terracotta))';
  const mint = 'hsl(var(--pattern-mint))';
  const plum = 'hsl(var(--pattern-wine))';
  const cream = 'hsl(var(--pattern-cream))';

  const patterns: Record<PatternKind, string> = {
    kente: `
      <pattern id="pd-kente" width="48" height="${h}" patternUnits="userSpaceOnUse">
        <rect width="48" height="${h}" fill="${cream}" />
        <path d="M0 ${h/2} L12 2 L24 ${h/2} L12 ${h-2} Z" fill="${gold}" opacity="0.9" />
        <path d="M24 ${h/2} L36 2 L48 ${h/2} L36 ${h-2} Z" fill="${terracotta}" opacity="0.9" />
        <circle cx="12" cy="${h/2}" r="2.5" fill="${cream}" />
        <circle cx="36" cy="${h/2}" r="2.5" fill="${mint}" />
        <line x1="0" y1="${h/2}" x2="48" y2="${h/2}" stroke="${color}" strokeWidth="1" opacity="0.5" />
      </pattern>
    `,
    mudcloth: `
      <pattern id="pd-mudcloth" width="56" height="56" patternUnits="userSpaceOnUse">
        <rect width="56" height="56" fill="${cream}" />
        <rect x="0" y="0" width="14" height="14" fill="${terracotta}" opacity="0.85" />
        <rect x="28" y="28" width="14" height="14" fill="${terracotta}" opacity="0.85" />
        <rect x="42" y="14" width="14" height="14" fill="${gold}" opacity="0.8" />
        <rect x="14" y="42" width="14" height="14" fill="${gold}" opacity="0.8" />
      </pattern>
    `,
    ndebele: `
      <pattern id="pd-ndebele" width="64" height="64" patternUnits="userSpaceOnUse">
        <rect width="64" height="64" fill="${cream}" />
        <path d="M0 0 L32 32 L0 32 Z" fill="${plum}" opacity="0.85" />
        <path d="M32 32 L64 32 L32 64 Z" fill="${plum}" opacity="0.85" />
        <path d="M16 16 L32 0 L48 16 L32 32 Z" fill="${gold}" opacity="0.85" />
        <path d="M16 48 L32 32 L48 48 L32 64 Z" fill="${gold}" opacity="0.85" />
        <line x1="0" y1="32" x2="64" y2="32" stroke="${color}" strokeWidth="1.5" opacity="0.6" />
      </pattern>
    `,
    kanga: `
      <pattern id="pd-kanga" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="${cream}" />
        <path d="M20 0 Q0 20 20 40 T40 0" fill="none" stroke="${mint}" strokeWidth="2" opacity="0.7" />
        <path d="M0 20 Q20 0 40 20 T0 40" fill="none" stroke="${plum}" strokeWidth="2" opacity="0.55" />
        <circle cx="20" cy="20" r="3" fill="${gold}" opacity="0.9" />
      </pattern>
    `,
  };

  return (
    <div aria-hidden="true" role="presentation" className={cn('overflow-hidden', className)}>
      <svg
        viewBox={`0 0 1200 ${h}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <defs dangerouslySetInnerHTML={{ __html: patterns[kind] }} />
        <rect width="1200" height={h} fill={`url(#pd-${kind})`} />
      </svg>
    </div>
  );
}
