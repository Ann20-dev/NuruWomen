import { ART } from './palette';

/**
 * A community health scene: a woman reading health information on her
 * phone, points of light rising from the screen. Wide header format
 * (800×300 ratio). Decorative illustration.
 */
export function PhoneInfoArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 150" className={className} role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="150" rx="12" fill={ART.cream} />

      {/* community backdrop: small houses */}
      <g transform="translate(36 96)" opacity="0.85">
        <path d="M 0 0 L 0 -22 L 14 -32 L 28 -22 L 28 0 Z" fill={ART.claySoft} stroke={ART.clay} strokeWidth="2" />
        <rect x="9" y="-14" width="10" height="14" fill={ART.clay} opacity="0.5" />
      </g>
      <g transform="translate(84 102) scale(0.8)" opacity="0.7">
        <path d="M 0 0 L 0 -22 L 14 -32 L 28 -22 L 28 0 Z" fill={ART.sageSoft} stroke={ART.sage} strokeWidth="2" />
      </g>

      {/* sun + path */}
      <circle cx="352" cy="30" r="15" fill={ART.saffron} opacity="0.7" />
      <path d="M 0 150 C 90 128 260 130 400 150 Z" fill={ART.sage} opacity="0.25" />

      {/* woman reading her phone */}
      <g transform="translate(200 118)">
        <path d="M -38 30 C -38 -10 -20 -30 0 -30 C 20 -30 38 -10 38 30 Z" fill={ART.wine} />
        <g transform="translate(4 -44) rotate(8)">
          <circle cx="0" cy="0" r="16" fill={ART.skin1} />
          <path d="M -16 0 A 16 16 0 0 1 16 0 L 16 4 A 16 12 0 0 0 -16 4 Z" fill={ART.wineDeep} />
          <circle cx="-13" cy="-10" r="4.5" fill={ART.wineDeep} />
        </g>
        {/* phone glowing in her hands */}
        <g transform="translate(26 -4) rotate(-8)">
          <circle r="17" fill={ART.saffron} opacity="0.3" />
          <rect x="-7" y="-13" width="14" height="26" rx="3" fill={ART.wineDeep} />
          <rect x="-4.5" y="-9.5" width="9" height="17" rx="1.5" fill={ART.cream} />
          <line x1="-2.5" y1="-5" x2="2.5" y2="-5" stroke={ART.sage} strokeWidth="1.4" />
          <line x1="-2.5" y1="-1" x2="2.5" y2="-1" stroke={ART.sage} strokeWidth="1.4" opacity="0.7" />
        </g>
      </g>

      {/* points of light rising from the screen */}
      <circle cx="236" cy="88" r="3" fill={ART.saffron} />
      <circle cx="250" cy="72" r="2.4" fill={ART.saffron} opacity="0.8" />
      <circle cx="262" cy="58" r="2" fill={ART.saffron} opacity="0.6" />
      <circle cx="224" cy="66" r="2" fill={ART.clay} opacity="0.6" />

      {/* another woman walking in with a tote */}
      <g transform="translate(316 118) scale(0.9)">
        <path d="M -28 26 C -30 -6 -15 -26 0 -26 C 15 -26 30 -6 28 26 Z" fill={ART.sage} />
        <circle cx="0" cy="-38" r="13" fill={ART.skin2} />
        <path d="M -13 -38 A 13 13 0 0 1 13 -38 L 13 -34 A 13 9.5 0 0 0 -13 -34 Z" fill={ART.saffron} />
        <rect x="14" y="4" width="14" height="18" rx="3" fill={ART.clay} />
        <path d="M 16 4 a 5 5 0 0 1 10 0" fill="none" stroke={ART.clay} strokeWidth="2" />
      </g>

      {/* kitenge corner marks */}
      <path d="M 16 150 L 16 138 h 10 Z" fill={ART.clay} />
      <path d="M 32 150 L 32 138 h 10 Z" fill={ART.saffron} />
      <path d="M 384 12 L 384 24 h -10 Z" fill={ART.clay} />
      <path d="M 368 12 L 368 24 h -10 Z" fill={ART.saffron} />
    </svg>
  );
}
