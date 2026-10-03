import { ART } from './palette';

/**
 * Women of different ages talking warmly around a kitchen table in a
 * courtyard — natural light, relaxed and trusting. The "Nuru" lamp sits
 * on the table between them. Decorative illustration.
 */
export function WomenCircleArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" rx="12" fill={ART.cream} />

      {/* courtyard arch with daylight */}
      <path d="M 96 200 L 96 84 A 54 54 0 0 1 204 84 L 204 200 Z" fill={ART.saffronSoft} />
      <circle cx="150" cy="72" r="18" fill={ART.saffron} opacity="0.5" />
      {/* hanging plant */}
      <g transform="translate(232 26)" stroke={ART.sage} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="0" y1="-8" x2="0" y2="8" />
        <path d="M 0 8 c -8 2 -12 8 -12 14 c 6 -2 10 -6 12 -14 Z" fill={ART.sage} stroke="none" />
        <path d="M 0 8 c 8 2 12 8 12 14 c -6 -2 -10 -6 -12 -14 Z" fill={ART.sage} stroke="none" />
        <path d="M 0 10 c -2 8 2 14 8 18 c 2 -8 -2 -14 -8 -18 Z" fill={ART.sage} stroke="none" opacity="0.8" />
      </g>

      {/* kitchen table */}
      <g transform="translate(150 146)">
        <rect x="-74" y="-6" width="148" height="10" rx="5" fill={ART.clay} />
        <rect x="-64" y="4" width="7" height="34" fill={ART.skin2} />
        <rect x="57" y="4" width="7" height="34" fill={ART.skin2} />
        {/* tea cups */}
        <g>
          <rect x="-44" y="-16" width="11" height="10" rx="2" fill={ART.wine} />
          <path d="M -33 -14 c 5 -1 7 2 5 5 c -2 2 -5 2 -7 0" fill="none" stroke={ART.wine} strokeWidth="2" />
          <rect x="36" y="-16" width="11" height="10" rx="2" fill={ART.sage} />
          <path d="M 47 -14 c 5 -1 7 2 5 5 c -2 2 -5 2 -7 0" fill="none" stroke={ART.sage} strokeWidth="2" />
        </g>
        {/* the lamp at the centre of the table */}
        <g transform="translate(0 -16)">
          <circle r="16" fill={ART.saffron} opacity="0.3" />
          <path d="M 0 -12 c 6 7 6 13 0 17 c -6 -4 -6 -10 0 -17 Z" fill={ART.saffron} />
          <rect x="-8" y="5" width="16" height="4" rx="2" fill={ART.wineDeep} />
        </g>
      </g>

      {/* left woman — saffron wrap */}
      <g transform="translate(58 158)">
        <path d="M -30 0 C -30 -20 -16 -34 0 -34 C 16 -34 30 -20 30 0 Z" fill={ART.wine} />
        <circle cx="0" cy="-46" r="13.5" fill={ART.skin1} />
        <path d="M -13.5 -46 A 13.5 13.5 0 0 1 13.5 -46 L 13.5 -42 A 13.5 10 0 0 0 -13.5 -42 Z" fill={ART.saffron} />
        <circle cx="11" cy="-56" r="4" fill={ART.saffron} />
      </g>

      {/* right woman — sage wrap */}
      <g transform="translate(242 158)">
        <path d="M -30 0 C -30 -20 -16 -34 0 -34 C 16 -34 30 -20 30 0 Z" fill={ART.sage} />
        <circle cx="0" cy="-46" r="13.5" fill={ART.skin2} />
        <path d="M -13.5 -46 A 13.5 13.5 0 0 1 13.5 -46 L 13.5 -42 A 13.5 10 0 0 0 -13.5 -42 Z" fill={ART.wineDeep} />
        <circle cx="11" cy="-56" r="4" fill={ART.wineDeep} />
      </g>

      {/* centre elder — silver wrap, slightly behind */}
      <g transform="translate(150 134)">
        <path d="M -27 0 C -27 -22 -14 -36 0 -36 C 14 -36 27 -22 27 0 Z" fill={ART.clay} />
        <circle cx="0" cy="-49" r="14" fill={ART.skin3} />
        <path d="M -14 -49 A 14 14 0 0 1 14 -49 L 14 -45 A 14 10.5 0 0 0 -14 -45 Z" fill="#d8d2c8" />
      </g>

      {/* conversation dots */}
      <circle cx="98" cy="74" r="2.6" fill={ART.clay} opacity="0.7" />
      <circle cx="110" cy="64" r="2" fill={ART.clay} opacity="0.5" />
      <circle cx="202" cy="72" r="2.6" fill={ART.sage} opacity="0.8" />
      <circle cx="192" cy="62" r="2" fill={ART.sage} opacity="0.6" />

      {/* kitenge hem */}
      <path d="M 0 200 L 0 190 h 300 v 10 Z" fill={ART.wine} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <path key={i} d={`M ${12 + i * 30} 195 l 6 -8 l 6 8 Z`} fill={i % 2 ? ART.saffron : ART.clay} />
      ))}
    </svg>
  );
}
