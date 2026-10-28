import { ART } from './palette';

/**
 * Hero illustration: diverse women of Africa in warm conversation around
 * the Nuru light. Complements the HeroScene knowledge object. Varied ages,
 * skin tones, head wraps, hairstyles and body types. Decorative illustration.
 */
export function HeroWomenArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 320" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="hwa-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={ART.saffron} stopOpacity="0.45" />
          <stop offset="60%" stopColor={ART.saffron} stopOpacity="0.12" />
          <stop offset="100%" stopColor={ART.saffron} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hwa-dress1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ART.wine} />
          <stop offset="100%" stopColor={ART.wineDeep} />
        </linearGradient>
        <linearGradient id="hwa-dress2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ART.clay} />
          <stop offset="100%" stopColor={ART.skin2} />
        </linearGradient>
        <linearGradient id="hwa-dress3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ART.sage} />
          <stop offset="100%" stopColor={ART.plum} />
        </linearGradient>
      </defs>

      {/* background glow */}
      <circle cx="250" cy="150" r="130" fill="url(#hwa-glow)" />

      {/* pattern backdrop hints - kente diamonds */}
      <g opacity="0.12">
        <rect x="30" y="30" width="14" height="14" fill={ART.saffron} />
        <rect x="456" y="276" width="14" height="14" fill={ART.clay} />
        <rect x="180" y="200" width="14" height="14" fill={ART.wine} />
        <rect x="286" y="40" width="14" height="14" fill={ART.sage} />
      </g>

      {/* ground arc */}
      <path d="M 20 280 Q 250 300 480 280" fill="none" stroke={ART.claySoft} strokeWidth="6" strokeLinecap="round" />

      {/* left woman - elder, headwrap, leaning forward */}
      <g transform="translate(86 238)">
        <path d="M -34 30 C -34 0 -20 -18 0 -18 C 20 -18 34 0 34 30 Z" fill="url(#hwa-dress1)" />
        <circle cx="0" cy="-24" r="15" fill={ART.skin2} />
        <path d="M -15 -24 A 15 15 0 0 1 15 -24 L 15 -20 A 15 11 0 0 0 -15 -20 Z" fill={ART.plum} />
        <circle cx="12" cy="-34" r="5" fill={ART.plum} />
        <path d="M -20 6 l 5 -4 l 5 4 Z" fill={ART.saffron} />
        <path d="M -4 6 l 5 -4 l 5 4 Z" fill={ART.clay} />
      </g>

      {/* centre-left woman - younger, short hair */}
      <g transform="translate(186 230)">
        <path d="M -30 26 C -30 0 -16 -14 0 -14 C 16 -14 30 0 30 26 Z" fill="url(#hwa-dress2)" />
        <circle cx="0" cy="-20" r="12" fill={ART.skin3} />
        <path d="M -12 -20 A 12 12 0 0 1 12 -20 L 12 -16 A 12 9 0 0 0 -12 -16 Z" fill={ART.saffron} />
        <circle cx="9" cy="-28" r="4" fill={ART.saffron} />
        {/* arm reaching toward centre */}
        <path d="M -24 4 C -34 0 -30 -10 -24 -16" fill="none" stroke={ART.skin2} strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* centre-right woman - headwrap, seated */}
      <g transform="translate(300 236)">
        <path d="M -34 30 C -34 0 -20 -18 0 -18 C 20 -18 34 0 34 30 Z" fill="url(#hwa-dress3)" />
        <circle cx="0" cy="-24" r="14" fill={ART.skin1} />
        <path d="M -14 -24 A 14 14 0 0 1 14 -24 L 14 -20 A 14 10.5 0 0 0 -14 -20 Z" fill={ART.wineDeep} />
        <circle cx="11" cy="-34" r="4.5" fill={ART.wineDeep} />
        {/* arm */}
        <path d="M 24 4 C 34 0 30 -10 24 -16" fill="none" stroke={ART.skin1} strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* right woman - glasses, short natural hair */}
      <g transform="translate(406 230)">
        <path d="M -30 26 C -30 0 -16 -14 0 -14 C 16 -14 30 0 30 26 Z" fill={ART.clay} />
        <circle cx="0" cy="-20" r="12" fill={ART.skin2} />
        <path d="M -12 -20 A 12 12 0 0 1 12 -20 L 12 -16 A 12 9 0 0 0 -12 -16 Z" fill={ART.plum} />
        <circle cx="9" cy="-28" r="4" fill={ART.plum} />
        {/* glasses suggestion */}
        <path d="M -14 -18 Q -2 -18 14 -18" fill="none" stroke={ART.wineDeep} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Nuru lamp at centre of table */}
      <g transform="translate(250 180)">
        <circle r="22" fill={ART.saffron} opacity="0.35" />
        <path d="M 0 -16 c 7 7 7 12 0 16 c -7 -5 -7 -9 0 -16 Z" fill={ART.saffron} />
        <rect x="-8" y="6" width="16" height="4" rx="2" fill={ART.wineDeep} />
        <rect x="-5" y="10" width="10" height="8" rx="1" fill={ART.saffron} />
        <path d="M -3 6 a 3 3 0 0 1 6 0" fill="none" stroke={ART.wineDeep} strokeWidth="2" />
      </g>

      {/* table surface */}
      <g transform="translate(250 196)">
        <ellipse cx="0" cy="0" rx="92" ry="14" fill={ART.clay} opacity="0.9" />
        <ellipse cx="0" cy="2" rx="92" ry="8" fill={ART.claySoft} opacity="0.6" />
        {/* two cups */}
        <rect x="-56" y="-10" width="10" height="10" rx="2" fill={ART.wine} />
        <rect x="46" y="-10" width="10" height="10" rx="2" fill={ART.sage} />
      </g>

      {/* conversation dots between them */}
      <circle cx="134" cy="142" r="2.6" fill={ART.clay} opacity="0.8" />
      <circle cx="148" cy="132" r="2" fill={ART.clay} opacity="0.6" />
      <circle cx="354" cy="142" r="2.6" fill={ART.sage} opacity="0.8" />
      <circle cx="368" cy="132" r="2" fill={ART.sage} opacity="0.6" />
      <circle cx="244" cy="122" r="2.4" fill={ART.saffron} opacity="0.9" />
      <circle cx="256" cy="112" r="1.8" fill={ART.saffron} opacity="0.7" />

      {/* light rays from lamp */}
      <g stroke={ART.saffron} strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <line x1="250" y1="156" x2="250" y2="136" />
        <line x1="238" y1="166" x2="226" y2="152" />
        <line x1="262" y1="166" x2="274" y2="152" />
        <line x1="232" y1="178" x2="214" y2="168" />
        <line x1="268" y1="178" x2="286" y2="168" />
      </g>

      {/* hope sparkles */}
      <circle cx="100" cy="90" r="2" fill={ART.clay} opacity="0.7" />
      <circle cx="400" cy="96" r="2.4" fill={ART.saffron} opacity="0.8" />
      <circle cx="310" cy="60" r="1.6" fill={ART.sage} opacity="0.6" />
      <circle cx="190" cy="70" r="2" fill={ART.clay} opacity="0.7" />
    </svg>
  );
}
