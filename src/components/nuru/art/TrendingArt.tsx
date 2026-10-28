import { ART } from './palette';

/**
 * Trending section illustration: warm, aggregate-only graphic of rising
 * conversation bubbles and a small bar chart - women's health topics
 * gaining attention across the commons. Decorative illustration.
 */
export function TrendingArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 140" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="ta-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ART.saffron} />
          <stop offset="100%" stopColor={ART.clay} />
        </linearGradient>
      </defs>

      {/* soft backdrop */}
      <rect width="300" height="140" rx="12" fill={ART.cream} />

      {/* bar chart - aggregate only */}
      <g transform="translate(40 60)">
        <rect x="0" y="34" width="16" height="22" rx="4" fill="url(#ta-bar)" />
        <rect x="22" y="20" width="16" height="36" rx="4" fill="url(#ta-bar)" />
        <rect x="44" y="12" width="16" height="44" rx="4" fill="url(#ta-bar)" />
        <rect x="66" y="26" width="16" height="30" rx="4" fill="url(#ta-bar)" />
        <rect x="88" y="16" width="16" height="40" rx="4" fill="url(#ta-bar)" />
        <rect x="110" y="30" width="16" height="26" rx="4" fill="url(#ta-bar)" />
      </g>

      {/* rising line */}
      <path
        d="M 28 90 Q 60 60 100 54 T 180 34"
        fill="none"
        stroke={ART.saffron}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="28" cy="90" r="2.5" fill={ART.saffron} />
      <circle cx="100" cy="54" r="2.5" fill={ART.clay} />
      <circle cx="180" cy="34" r="2.5" fill={ART.wine} />

      {/* conversation bubbles */}
      <g transform="translate(140 96)">
        <ellipse cx="0" cy="0" rx="18" ry="12" fill={ART.claySoft} />
        <circle cx="20" cy="-6" r="2.4" fill={ART.clay} opacity="0.8" />
        <circle cx="24" cy="2" r="1.8" fill={ART.clay} opacity="0.6" />
        <circle cx="16" cy="4" r="1.6" fill={ART.clay} opacity="0.5" />
      </g>
      <g transform="translate(210 100)">
        <ellipse cx="0" cy="0" rx="20" ry="14" fill={ART.plumSoft} />
        <circle cx="24" cy="-8" r="2.6" fill={ART.plum} opacity="0.8" />
        <circle cx="28" cy="0" r="2" fill={ART.plum} opacity="0.6" />
        <circle cx="20" cy="4" r="1.8" fill={ART.plum} opacity="0.5" />
      </g>

      {/* glow dot */}
      <circle cx="256" cy="34" r="10" fill={ART.saffron} opacity="0.35" />

      {/* kitenge corner */}
      <path d="M 276 12 L 276 24 h -10 Z" fill={ART.clay} />
      <path d="M 260 12 L 260 24 h -10 Z" fill={ART.saffron} />
      <path d="M 4 128 L 4 116 h 10 Z" fill={ART.clay} />
      <path d="M 16 128 L 16 116 h 10 Z" fill={ART.saffron} />
    </svg>
  );
}
