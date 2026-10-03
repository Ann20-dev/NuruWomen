import { ART } from './palette';

/**
 * A female clinician in a clinic, reading a chart with a patient nearby —
 * for the clinically reviewed layer. Decorative illustration.
 */
export function ClinicianArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" rx="12" fill="#e9f3f1" />
      {/* clinic cross, subtle */}
      <g transform="translate(264 32)" opacity="0.35">
        <rect x="-4" y="-14" width="8" height="28" rx="2" fill="#1f7668" />
        <rect x="-14" y="-4" width="28" height="8" rx="2" fill="#1f7668" />
      </g>
      {/* shelf with jars */}
      <g transform="translate(30 34)" opacity="0.8">
        <rect x="0" y="26" width="88" height="4" rx="2" fill={ART.skin2} />
        <rect x="8" y="8" width="12" height="18" rx="3" fill={ART.sage} opacity="0.6" />
        <rect x="28" y="4" width="12" height="22" rx="3" fill={ART.saffron} opacity="0.55" />
        <rect x="48" y="10" width="12" height="16" rx="3" fill={ART.clay} opacity="0.5" />
      </g>

      {/* clinician with chart */}
      <g transform="translate(120 182)">
        <path d="M -44 0 C -44 -34 -24 -52 0 -52 C 24 -52 44 -34 44 0 Z" fill="#1f7668" />
        <circle cx="0" cy="-70" r="19" fill={ART.skin1} />
        <path d="M -19 -70 A 19 19 0 0 1 19 -70 L 19 -65 A 19 14 0 0 0 -19 -65 Z" fill={ART.wineDeep} />
        <circle cx="16" cy="-86" r="6" fill={ART.wineDeep} />
        {/* stethoscope */}
        <path d="M -12 -46 c 0 16 5 24 12 24 c 7 0 12 -8 12 -24" fill="none" stroke="#d8d2c8" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="12" cy="-20" r="5" fill="#d8d2c8" />
        {/* chart in hand */}
        <g transform="translate(34 -26) rotate(8)">
          <rect x="-16" y="-22" width="32" height="42" rx="4" fill="#fff" stroke={ART.sage} strokeWidth="2.5" />
          <rect x="-16" y="-22" width="32" height="10" rx="4" fill={ART.sage} />
          <line x1="-9" y1="-4" x2="9" y2="-4" stroke={ART.wine} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-9" y1="4" x2="9" y2="4" stroke="#b9cfc9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-9" y1="12" x2="4" y2="12" stroke="#b9cfc9" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* patient seated nearby */}
      <g transform="translate(232 190) scale(0.92)">
        <path d="M -36 0 C -36 -26 -19 -40 0 -40 C 19 -40 36 -26 36 0 Z" fill={ART.clay} />
        <circle cx="0" cy="-54" r="16" fill={ART.skin3} />
        <path d="M -16 -54 A 16 16 0 0 1 16 -54 L 16 -50 A 16 12 0 0 0 -16 -50 Z" fill={ART.saffron} />
      </g>

      {/* calm consultation dots */}
      <circle cx="184" cy="82" r="2.6" fill="#1f7668" opacity="0.55" />
      <circle cx="198" cy="72" r="2" fill="#1f7668" opacity="0.4" />
    </svg>
  );
}
