import { ART } from './palette';

/**
 * Success state illustration: a small lantern lit, warm and reassuring.
 * Confirmation that an action completed. Decorative illustration.
 */
export function SuccessArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="su-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={ART.saffron} stopOpacity="0.35" />
          <stop offset="70%" stopColor={ART.saffron} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="70" r="56" fill="url(#su-glow)" />

      {/* lantern */}
      <g transform="translate(120 100)">
        <circle r="20" fill={ART.saffron} opacity="0.35" />
        <path d="M 0 -14 c 6 6 6 10 0 14 c -6 -4 -6 -8 0 -14 Z" fill={ART.saffron} />
        <rect x="-7" y="4" width="14" height="4" rx="2" fill={ART.wineDeep} />
        <rect x="-4" y="8" width="8" height="6" rx="1" fill={ART.saffron} />
        <path d="M -3 4 a 3 3 0 0 1 6 0" fill="none" stroke={ART.wineDeep} strokeWidth="2" />
      </g>

      {/* check mark glowing behind */}
      <path
        d="M 80 110 Q 95 122 110 112 Q 150 102 150 80"
        fill="none"
        stroke={ART.saffron}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* light rays */}
      <g stroke={ART.saffron} strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="120" y1="78" x2="120" y2="64" />
        <line x1="110" y1="86" x2="100" y2="94" />
        <line x1="130" y1="86" x2="140" y2="94" />
        <line x1="104" y1="96" x2="94" y2="104" />
        <line x1="136" y1="96" x2="146" y2="104" />
      </g>

      {/* sparkles */}
      <circle cx="160" cy="50" r="2" fill={ART.clay} opacity="0.8" />
      <circle cx="80" cy="80" r="1.6" fill={ART.saffron} opacity="0.8" />
      <circle cx="40" cy="120" r="2" fill={ART.clay} opacity="0.7" />
    </svg>
  );
}
