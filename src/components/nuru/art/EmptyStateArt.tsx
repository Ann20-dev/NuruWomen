import { ART } from './palette';

/** Open box with a butterfly finding its way out - friendly empty state. */
export function EmptyStateArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} role="presentation" aria-hidden="true">
      <circle cx="100" cy="80" r="62" fill={ART.saffronSoft} />
      {/* open box */}
      <g transform="translate(100 96)">
        <path d="M -34 -12 L 0 -26 L 34 -12 L 0 2 Z" fill={ART.clay} />
        <path d="M -34 -12 L 0 2 L 0 30 L -34 16 Z" fill={ART.wine} />
        <path d="M 34 -12 L 0 2 L 0 30 L 34 16 Z" fill={ART.wineDeep} />
        {/* flaps */}
        <path d="M -34 -12 L -48 -22 L -14 -32 L 0 -26 Z" fill={ART.claySoft} stroke={ART.clay} strokeWidth="1.5" />
        <path d="M 34 -12 L 48 -22 L 14 -32 L 0 -26 Z" fill={ART.claySoft} stroke={ART.clay} strokeWidth="1.5" />
      </g>
      {/* butterfly + flight path */}
      <path
        d="M 96 66 C 84 50 108 40 118 30 C 128 20 142 24 146 14"
        fill="none"
        stroke={ART.sage}
        strokeWidth="1.8"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <g transform="translate(148 12) rotate(14)">
        <ellipse cx="-5" cy="0" rx="6" ry="9" fill={ART.saffron} transform="rotate(-24)" />
        <ellipse cx="6" cy="0" rx="6" ry="9" fill={ART.clay} transform="rotate(24)" />
        <line x1="0" y1="-7" x2="0" y2="8" stroke={ART.wineDeep} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* sparkle */}
      <circle cx="62" cy="40" r="2" fill={ART.saffron} />
      <circle cx="142" cy="56" r="1.6" fill={ART.clay} />
    </svg>
  );
}
