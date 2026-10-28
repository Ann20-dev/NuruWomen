import { ART } from './palette';

/**
 * A woman holding a glowing light/lantern - for the CTA band ("the question
 * you've been carrying"). Dignified, hopeful, face softly turned toward the
 * light. Decorative illustration.
 */
export function WomanWithLight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="wl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ART.saffron} stopOpacity="0.4" />
          <stop offset="60%" stopColor={ART.saffron} stopOpacity="0.1" />
          <stop offset="100%" stopColor={ART.saffron} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft background glow */}
      <circle cx="250" cy="130" r="90" fill="url(#wl-glow)" />

      {/* ground */}
      <path d="M 0 220 C 100 200 300 200 400 220 Z" fill={ART.sage} opacity="0.25" />

      {/* woman figure */}
      <g transform="translate(150 180)">
        <path d="M -42 30 C -42 0 -26 -24 0 -24 C 26 -24 42 0 42 30 Z" fill={ART.wine} />
        <circle cx="0" cy="-58" r="16" fill={ART.skin3} />
        <path d="M -16 -58 A 16 16 0 0 1 16 -58 L 16 -54 A 16 12 0 0 0 -16 -54 Z" fill={ART.plum} />
        <circle cx="13" cy="-70" r="5" fill={ART.plum} />
        {/* arms reaching up to hold lantern */}
        <path d="M -30 6 C -40 -6 -34 -18 -28 -24" fill="none" stroke={ART.wineDeep} strokeWidth="5" strokeLinecap="round" />
        <path d="M 30 6 C 40 -6 34 -18 28 -24" fill="none" stroke={ART.wineDeep} strokeWidth="5" strokeLinecap="round" />
        {/* dress detail */}
        <path d="M -26 -8 l 4 -6 l 4 6 Z" fill={ART.saffron} />
        <path d="M -6 -8 l 4 -6 l 4 6 Z" fill={ART.clay} />
        <path d="M 14 -8 l 4 -6 l 4 6 Z" fill={ART.saffron} />
      </g>

      {/* lantern held above */}
      <g transform="translate(250 120)">
        <circle r="26" fill={ART.saffron} opacity="0.35" />
        <path d="M 0 -18 c 8 8 8 14 0 20 c -8 -6 -8 -12 0 -20 Z" fill={ART.saffron} />
        <rect x="-9" y="8" width="18" height="6" rx="2" fill={ART.wineDeep} />
        <rect x="-6" y="14" width="12" height="14" rx="2" fill={ART.wineDeep} />
        <rect x="-3.5" y="16" width="7" height="8" rx="1" fill={ART.saffron} />
        <path d="M -4 8 a 4 4 0 0 1 8 0" fill="none" stroke={ART.wineDeep} strokeWidth="2" />
      </g>

      {/* light rays from lantern */}
      <g stroke={ART.saffron} strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="250" y1="94" x2="250" y2="76" />
        <line x1="238" y1="102" x2="224" y2="90" />
        <line x1="262" y1="102" x2="276" y2="90" />
        <line x1="234" y1="116" x2="218" y2="108" />
        <line x1="266" y1="116" x2="282" y2="108" />
      </g>

      {/* hope dots */}
      <circle cx="290" cy="92" r="3" fill={ART.clay} opacity="0.8" />
      <circle cx="300" cy="76" r="2.2" fill={ART.saffron} opacity="0.8" />
      <circle cx="210" cy="96" r="3" fill={ART.clay} opacity="0.8" />
      <circle cx="200" cy="80" r="2.2" fill={ART.saffron} opacity="0.8" />
      <circle cx="170" cy="112" r="2.4" fill={ART.clay} opacity="0.7" />
    </svg>
  );
}
