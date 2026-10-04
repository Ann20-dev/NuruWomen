import { ART } from './palette';

/**
 * A community gathering scene: women seated in a circle under a calendar
 * page and a rising sun. Wide header format (400×150), decorative.
 */
export function EventsArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 150" className={className} role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="150" rx="12" fill={ART.cream} />

      {/* sun */}
      <circle cx="352" cy="28" r="14" fill={ART.saffron} opacity="0.7" />
      {/* distant hills */}
      <path d="M 0 150 C 80 122 200 128 400 150 Z" fill={ART.sage} opacity="0.22" />

      {/* calendar page */}
      <g transform="translate(30 26)">
        <rect x="0" y="0" width="74" height="82" rx="8" fill={ART.cream} stroke={ART.wine} strokeWidth="2.5" />
        <rect x="0" y="0" width="74" height="20" rx="8" fill={ART.wine} />
        <rect x="0" y="12" width="74" height="8" fill={ART.wine} />
        <line x1="16" y1="-7" x2="16" y2="6" stroke={ART.wineDeep} strokeWidth="4" strokeLinecap="round" />
        <line x1="58" y1="-7" x2="58" y2="6" stroke={ART.wineDeep} strokeWidth="4" strokeLinecap="round" />
        {/* marked day */}
        <circle cx="24" cy="44" r="8" fill={ART.saffron} />
        <g fill={ART.wine} opacity="0.45">
          <circle cx="44" cy="44" r="3" />
          <circle cx="58" cy="44" r="3" />
          <circle cx="17" cy="62" r="3" />
          <circle cx="31" cy="62" r="3" />
          <circle cx="45" cy="62" r="3" />
          <circle cx="59" cy="62" r="3" />
        </g>
      </g>

      {/* circle of women (seen from above/behind, heads + shoulders) */}
      <g transform="translate(236 108)">
        {/* ground shadow */}
        <ellipse cx="0" cy="30" rx="128" ry="14" fill={ART.claySoft} />
        {/* back row */}
        <g transform="translate(-86 -18)">
          <circle cx="0" cy="0" r="11" fill={ART.skin2} />
          <path d="M -11 -2 A 11 11 0 0 1 11 -2 L 11 2 A 11 9 0 0 0 -11 2 Z" fill={ART.wineDeep} />
          <path d="M -15 34 C -15 12 -8 8 0 8 C 8 8 15 12 15 34 Z" fill={ART.plum} />
        </g>
        <g transform="translate(-30 -26)">
          <circle cx="0" cy="0" r="11" fill={ART.skin1} />
          <path d="M -11 -2 A 11 11 0 0 1 11 -2 L 11 2 A 11 9 0 0 0 -11 2 Z" fill="#2f1d16" />
          <path d="M -15 34 C -15 12 -8 8 0 8 C 8 8 15 12 15 34 Z" fill={ART.wine} />
          {/* headwrap */}
          <path d="M -11 -4 A 11.5 11.5 0 0 1 11 -4 L 11 0 A 11 11 0 0 0 -11 0 Z" fill={ART.saffron} />
        </g>
        <g transform="translate(28 -26)">
          <circle cx="0" cy="0" r="11" fill={ART.skin3} />
          <path d="M -11 -2 A 11 11 0 0 1 11 -2 L 11 2 A 11 9 0 0 0 -11 2 Z" fill={ART.wineDeep} />
          <path d="M -15 34 C -15 12 -8 8 0 8 C 8 8 15 12 15 34 Z" fill={ART.clay} />
        </g>
        <g transform="translate(86 -16)">
          <circle cx="0" cy="0" r="11" fill={ART.skin2} />
          <path d="M -11 -2 A 11 11 0 0 1 11 -2 L 11 2 A 11 9 0 0 0 -11 2 Z" fill="#241813" />
          <path d="M -15 34 C -15 12 -8 8 0 8 C 8 8 15 12 15 34 Z" fill={ART.sage} />
          {/* headwrap */}
          <path d="M -11 -4 A 11.5 11.5 0 0 1 11 -4 L 11 0 A 11 11 0 0 0 -11 0 Z" fill={ART.plum} />
        </g>
        {/* front row */}
        <g transform="translate(-58 6)">
          <circle cx="0" cy="0" r="12" fill={ART.skin1} />
          <path d="M -12 -2 A 12 12 0 0 1 12 -2 L 12 2 A 12 10 0 0 0 -12 2 Z" fill={ART.wineDeep} />
          <path d="M -17 38 C -17 13 -9 9 0 9 C 9 9 17 13 17 38 Z" fill={ART.saffron} />
        </g>
        <g transform="translate(0 12)">
          <circle cx="0" cy="0" r="12" fill={ART.skin3} />
          <path d="M -12 -2 A 12 12 0 0 1 12 -2 L 12 2 A 12 10 0 0 0 -12 2 Z" fill="#2f1d16" />
          <path d="M -17 38 C -17 13 -9 9 0 9 C 9 9 17 13 17 38 Z" fill={ART.plum} />
          {/* headwrap */}
          <path d="M -12 -4 A 12.5 12.5 0 0 1 12 -4 L 12 0 A 12 12 0 0 0 -12 0 Z" fill={ART.clay} />
        </g>
        <g transform="translate(58 6)">
          <circle cx="0" cy="0" r="12" fill={ART.skin2} />
          <path d="M -12 -2 A 12 12 0 0 1 12 -2 L 12 2 A 12 10 0 0 0 -12 2 Z" fill={ART.wineDeep} />
          <path d="M -17 38 C -17 13 -9 9 0 9 C 9 9 17 13 17 38 Z" fill={ART.wine} />
        </g>
      </g>

      {/* little flags / bunting */}
      <g opacity="0.9">
        <path d="M 104 20 C 150 34 196 34 240 20" fill="none" stroke={ART.wine} strokeWidth="1.6" />
        <path d="M 122 26 l 5 10 l 5 -10 Z" fill={ART.saffron} />
        <path d="M 150 30 l 5 10 l 5 -10 Z" fill={ART.clay} />
        <path d="M 178 30 l 5 10 l 5 -10 Z" fill={ART.plum} />
        <path d="M 206 26 l 5 10 l 5 -10 Z" fill={ART.sage} />
      </g>
    </svg>
  );
}
