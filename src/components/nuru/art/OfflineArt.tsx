import { ART } from './palette';

/**
 * Offline state illustration: a small plant under a cloud, warm and calm.
 * Reassuring, not alarming. Decorative illustration.
 */
export function OfflineArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 160" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="of-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={ART.saffron} stopOpacity="0.25" />
          <stop offset="70%" stopColor={ART.saffron} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="130" cy="70" r="60" fill="url(#of-glow)" />

      {/* cloud */}
      <path
        d="M 80 70 C 60 70 45 82 45 96 C 45 108 60 118 80 118 C 96 118 110 108 110 96 C 110 82 96 70 80 70 Z"
        fill={ART.cream}
        opacity="0.9"
      />
      <circle cx="100" cy="76" r="8" fill={ART.claySoft} />
      <circle cx="112" cy="72" r="6" fill={ART.claySoft} />

      {/* plant in a pot */}
      <g transform="translate(170 110)">
        <path d="M -18 0 h 36 l -4 14 h -28 Z" fill={ART.clay} />
        <path d="M -10 0 c -3 -12 -8 -18 -14 -22 c 2 6 5 10 8 14" fill={ART.sage} />
        <path d="M 0 0 c 3 -14 8 -20 14 -24 c -2 6 -5 10 -8 14" fill={ART.sage} />
        <circle cx="-14" cy="-14" r="3" fill={ART.saffron} />
        <circle cx="10" cy="-18" r="3" fill={ART.clay} />
      </g>

      {/* gentle rain dots */}
      <g stroke={ART.clay} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <line x1="130" y1="30" x2="130" y2="42" />
        <line x1="150" y1="34" x2="150" y2="46" />
        <line x1="110" y1="38" x2="110" y2="50" />
      </g>

      {/* sparkles */}
      <circle cx="200" cy="60" r="2" fill={ART.saffron} opacity="0.8" />
      <circle cx="60" cy="90" r="1.6" fill={ART.clay} opacity="0.7" />
    </svg>
  );
}
