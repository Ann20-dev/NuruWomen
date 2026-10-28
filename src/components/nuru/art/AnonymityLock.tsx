import { ART } from './palette';

/**
 * Anonymity shield / lock with soft light glow.
 * Abstract, no people - for the how-it-works anonymity step and privacy pages.
 * Decorative illustration.
 */
export function AnonymityLock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 240" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="al-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ART.saffron} stopOpacity="0.35" />
          <stop offset="70%" stopColor={ART.saffron} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glow behind */}
      <circle cx="150" cy="120" r="80" fill="url(#al-glow)" />

      {/* shield body */}
      <path
        d="M150 46 C104 46 70 82 70 130 L70 186 C70 214 92 222 122 222 L178 222 C208 222 230 214 230 186 L230 130 C230 82 196 46 150 46 Z"
        fill={ART.wine}
        opacity="0.95"
      />
      {/* shield inner band */}
      <path
        d="M150 74 C118 74 92 96 92 130 L92 162 C92 182 108 190 130 190 L170 190 C192 190 208 182 208 162 L208 130 C208 96 182 74 150 74 Z"
        fill={ART.clay}
        opacity="0.85"
      />

      {/* lock shackle */}
      <path
        d="M150 78 C130 78 114 94 114 114 C114 114 114 114 114 114"
        fill="none"
        stroke={ART.wineDeep}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M150 78 C170 78 186 94 186 114" fill="none" stroke={ART.wineDeep} strokeWidth="6" strokeLinecap="round" />
      <rect x="142" y="114" width="16" height="20" rx="2" fill={ART.wineDeep} />

      {/* keyhole - light inside */}
      <circle cx="150" cy="130" r="10" fill={ART.cream} />
      <circle cx="150" cy="130" r="4" fill={ART.wineDeep} />
      <rect x="146" y="120" width="8" height="4" rx="1" fill={ART.wineDeep} />

      {/* light rays emanating from keyhole */}
      <g stroke={ART.saffron} strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="150" y1="142" x2="150" y2="160" />
        <line x1="142" y1="134" x2="132" y2="140" />
        <line x1="158" y1="134" x2="168" y2="140" />
        <line x1="134" y1="126" x2="124" y2="122" />
        <line x1="166" y1="126" x2="176" y2="122" />
      </g>

      {/* conversation dots near shield */}
      <circle cx="104" cy="168" r="2.4" fill={ART.sage} opacity="0.8" />
      <circle cx="114" cy="160" r="1.8" fill={ART.sage} opacity="0.6" />
      <circle cx="196" cy="168" r="2.4" fill={ART.clay} opacity="0.8" />
      <circle cx="206" cy="160" r="1.8" fill={ART.clay} opacity="0.6" />
    </svg>
  );
}
