import { ART } from './palette';

/**
 * An open evidence book with a review check and a small chart - for the
 * evidence layer. Decorative illustration.
 */
export function EvidenceArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" rx="12" fill={ART.plumSoft} />
      <circle cx="52" cy="48" r="24" fill={ART.saffron} opacity="0.35" />

      {/* open book */}
      <g transform="translate(120 118)">
        <path d="M 0 -10 C -28 -22 -56 -22 -78 -12 L -78 34 C -56 24 -28 24 0 36 C 28 24 56 24 78 34 L 78 -12 C 56 -22 28 -22 0 -10 Z" fill="#fff" stroke={ART.plum} strokeWidth="3" />
        <line x1="0" y1="-10" x2="0" y2="36" stroke={ART.plum} strokeWidth="2.5" />
        <line x1="-64" y1="-4" x2="-14" y2="4" stroke="#c9b8d4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-64" y1="8" x2="-14" y2="16" stroke="#c9b8d4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="4" x2="64" y2="-4" stroke="#c9b8d4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="16" x2="64" y2="8" stroke="#c9b8d4" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* review check badge */}
      <g transform="translate(192 78)">
        <circle r="24" fill={ART.plum} />
        <circle r="24" fill="none" stroke={ART.saffron} strokeWidth="3" strokeDasharray="4 5" />
        <path d="M -10 0 l 7 8 l 15 -17" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* small chart */}
      <g transform="translate(232 128)">
        <line x1="0" y1="0" x2="0" y2="34" stroke={ART.plum} strokeWidth="2.5" />
        <line x1="0" y1="34" x2="40" y2="34" stroke={ART.plum} strokeWidth="2.5" />
        <rect x="6" y="18" width="7" height="16" fill={ART.saffron} />
        <rect x="17" y="10" width="7" height="24" fill={ART.clay} />
        <rect x="28" y="22" width="7" height="12" fill={ART.sage} />
      </g>

      {/* source dots */}
      <circle cx="70" cy="166" r="3" fill={ART.plum} opacity="0.55" />
      <circle cx="84" cy="170" r="3" fill={ART.clay} opacity="0.55" />
      <circle cx="98" cy="166" r="3" fill={ART.sage} opacity="0.55" />
    </svg>
  );
}
