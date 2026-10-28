import { ART } from './palette';

/**
 * Footer illustration - a small warm scene to end every page with warmth.
 * A crescent moon, a small plant, and two distant figures - quiet, calm,
 * restful. Decorative illustration.
 */
export function FooterIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 140" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="fi-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ART.plumSoft} />
          <stop offset="100%" stopColor={ART.cream} />
        </linearGradient>
      </defs>
      <rect width="300" height="140" fill="url(#fi-bg)" />

      {/* crescent moon */}
      <path
        d="M 240 36 a 14 14 0 1 0 0 28 a 14 14 0 0 1 0 -28 Z"
        fill={ART.saffron}
        opacity="0.85"
      />
      <circle cx="246" cy="36" r="10" fill={ART.plumSoft} />

      {/* stars */}
      <circle cx="52" cy="26" r="1.6" fill={ART.cream} />
      <circle cx="186" cy="20" r="1.8" fill={ART.cream} />
      <circle cx="280" cy="30" r="1.4" fill={ART.cream} />
      <circle cx="36" cy="52" r="1.6" fill={ART.cream} />
      <circle cx="140" cy="18" r="1.4" fill={ART.cream} />

      {/* small plant */}
      <g transform="translate(150 92)" stroke={ART.sage} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M 0 0 c -2 -14 -10 -22 -20 -26" />
        <path d="M 0 0 c 2 -16 8 -26 18 -32" />
        <path d="M 0 0 c 0 -10 0 -18 2 -26" />
        <path d="M -14 6 h 28 l -4 22 h -20 Z" fill={ART.clay} stroke="none" />
      </g>

      {/* two distant figures (simple, quiet) */}
      <g transform="translate(60 104)">
        <path d="M -14 0 C -14 -12 -8 -20 0 -20 C 8 -20 14 -12 14 0 Z" fill={ART.wine} />
        <circle cx="0" cy="-24" r="7" fill={ART.skin1} />
        <path d="M -7 -24 A 7 7 0 0 1 7 -24 L 7 -22 A 7 5 0 0 0 -7 -22 Z" fill={ART.wineDeep} />
      </g>
      <g transform="translate(86 108) scale(0.85)">
        <path d="M -14 0 C -14 -12 -8 -20 0 -20 C 8 -20 14 -12 14 0 Z" fill={ART.clay} />
        <circle cx="0" cy="-24" r="7" fill={ART.skin3} />
        <path d="M -7 -24 A 7 7 0 0 1 7 -24 L 7 -22 A 7 5 0 0 0 -7 -22 Z" fill={ART.saffron} />
      </g>

      {/* horizon line */}
      <path d="M 0 108 Q 150 100 300 108" fill="none" stroke={ART.sage} strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* kitenge corner */}
      <path d="M 4 136 L 4 124 h 10 Z" fill={ART.saffron} />
      <path d="M 16 136 L 16 124 h 10 Z" fill={ART.clay} />
      <path d="M 280 4 L 280 14 h -10 Z" fill={ART.clay} />
      <path d="M 264 4 L 264 14 h -10 Z" fill={ART.saffron} />
    </svg>
  );
}
