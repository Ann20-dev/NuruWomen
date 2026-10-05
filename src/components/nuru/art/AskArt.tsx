import { ART } from './palette';

/**
 * A woman alone at home reading her phone by the window - calm, private,
 * face softly turned away. Reassurance for the Ask form. Decorative.
 */
export function AskArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="presentation" aria-hidden="true">
      {/* soft background blobs */}
      <circle cx="120" cy="120" r="96" fill={ART.saffronSoft} />
      <circle cx="52" cy="196" r="22" fill={ART.claySoft} />

      {/* window with daylight */}
      <g transform="translate(150 38)">
        <rect x="0" y="0" width="66" height="86" rx="8" fill="#fff" stroke={ART.sage} strokeWidth="3" />
        <line x1="33" y1="0" x2="33" y2="86" stroke={ART.sage} strokeWidth="2.5" />
        <line x1="0" y1="43" x2="66" y2="43" stroke={ART.sage} strokeWidth="2.5" />
        <circle cx="48" cy="20" r="9" fill={ART.saffron} opacity="0.7" />
        <path d="M 4 70 q 10 -8 18 0 q 8 -8 16 0 q 8 -8 16 0" fill="none" stroke={ART.sage} strokeWidth="2" opacity="0.5" />
      </g>

      {/* plant */}
      <g transform="translate(38 168)" stroke={ART.sage} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M 0 0 c -2 -14 -10 -22 -20 -26" />
        <path d="M 0 0 c 2 -16 8 -26 18 -32" />
        <path d="M 0 0 c 0 -10 0 -18 2 -26" />
        <path d="M -14 6 h 28 l -4 22 h -20 Z" fill={ART.clay} stroke="none" />
      </g>

      {/* seated woman, head turned toward the phone */}
      <g transform="translate(106 178)">
        <path d="M -40 34 C -40 -8 -22 -30 0 -30 C 22 -30 40 -8 40 34 Z" fill={ART.wine} />
        {/* head, slightly bowed toward the phone */}
        <g transform="translate(4 -46) rotate(10)">
          <circle cx="0" cy="0" r="17" fill={ART.skin1} />
          <path d="M -17 0 A 17 17 0 0 1 17 0 L 17 4 A 17 13 0 0 0 -17 4 Z" fill={ART.wineDeep} />
          <circle cx="-14" cy="-11" r="5" fill={ART.wineDeep} />
        </g>
      </g>

      {/* phone in her hands, softly glowing */}
      <g transform="translate(140 164) rotate(-8)">
        <circle r="22" fill={ART.saffron} opacity="0.25" />
        <rect x="-8" y="-15" width="16" height="30" rx="3.5" fill={ART.wineDeep} />
        <rect x="-5.5" y="-11.5" width="11" height="20" rx="1.5" fill={ART.cream} />
        <line x1="-3" y1="-7" x2="3" y2="-7" stroke={ART.sage} strokeWidth="1.6" />
        <line x1="-3" y1="-3" x2="3" y2="-3" stroke={ART.sage} strokeWidth="1.6" opacity="0.7" />
        <line x1="-3" y1="1" x2="1" y2="1" stroke={ART.sage} strokeWidth="1.6" opacity="0.5" />
      </g>

      {/* privacy dots drifting up */}
      <circle cx="164" cy="132" r="2.4" fill={ART.sage} opacity="0.8" />
      <circle cx="174" cy="118" r="1.9" fill={ART.sage} opacity="0.6" />
      <circle cx="158" cy="112" r="1.6" fill={ART.sage} opacity="0.45" />
    </svg>
  );
}
