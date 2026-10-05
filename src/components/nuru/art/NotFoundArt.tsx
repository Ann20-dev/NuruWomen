import { ART } from './palette';

/** A woman with a lantern at a crossroads signpost - the lost-page scene. */
export function NotFoundArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 180" className={className} role="presentation" aria-hidden="true">
      <circle cx="120" cy="92" r="78" fill={ART.plumSoft} />
      {/* stars */}
      <circle cx="52" cy="34" r="1.8" fill={ART.saffron} />
      <circle cx="196" cy="28" r="2.2" fill={ART.saffron} />
      <circle cx="176" cy="52" r="1.5" fill={ART.cream} />
      <circle cx="34" cy="66" r="1.5" fill={ART.cream} />

      {/* signpost */}
      <g transform="translate(152 116)">
        <line x1="0" y1="-58" x2="0" y2="34" stroke={ART.skin2} strokeWidth="5" strokeLinecap="round" />
        <path d="M 0 -58 h 46 l 10 9 l -10 9 h -46 Z" fill={ART.wine} />
        <path d="M 0 -36 h -40 l -10 9 l 10 9 h 40 Z" fill={ART.sage} />
        <circle cx="0" cy="-62" r="4" fill={ART.saffron} />
      </g>

      {/* woman with lantern */}
      <g transform="translate(86 152)">
        <path d="M -26 0 C -26 -22 -13 -34 0 -34 C 13 -34 26 -22 26 0 Z" fill={ART.wine} />
        <circle cx="0" cy="-46" r="13" fill={ART.skin3} />
        <path d="M -13 -46 A 13 13 0 0 1 13 -46 L 13 -42 A 13 10 0 0 0 -13 -42 Z" fill={ART.saffron} />
        <circle cx="10" cy="-56" r="4" fill={ART.saffron} />
      </g>
      {/* lantern glow */}
      <circle cx="116" cy="120" r="17" fill={ART.saffron} opacity="0.35" />
      <g transform="translate(116 120)">
        <rect x="-6" y="-9" width="12" height="16" rx="3" fill={ART.wineDeep} />
        <rect x="-3.5" y="-6" width="7" height="10" rx="2" fill={ART.saffron} />
        <path d="M -4 -9 a 4 4 0 0 1 8 0" fill="none" stroke={ART.wineDeep} strokeWidth="2" />
      </g>

      {/* ground path */}
      <path d="M 20 176 C 70 158 150 162 220 176 Z" fill={ART.sage} opacity="0.3" />
    </svg>
  );
}
