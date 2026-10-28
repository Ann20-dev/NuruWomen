import { ART } from './palette';

/**
 * How-it-works step illustrations - three consistent scenes sharing one
 * figure style. Each is 300x200. Decorative illustrations.
 *
 * 1. Ask - woman writing her question by window light
 * 2. Anonymous - shield with light (uses AnonymityLock-style mark, abstract)
 * 3. Receive - two women reading answers together
 */

/** Step 1: Ask - a woman writing her question at a desk by the window. */
export function StepAsk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" fill={ART.cream} />
      {/* window */}
      <g transform="translate(200 24)">
        <rect width="76" height="92" rx="8" fill="#fff" stroke={ART.sage} strokeWidth="3" />
        <line x1="38" y1="0" x2="38" y2="92" stroke={ART.sage} strokeWidth="2.5" />
        <line x1="0" y1="46" x2="76" y2="46" stroke={ART.sage} strokeWidth="2.5" />
        <circle cx="56" cy="20" r="9" fill={ART.saffron} opacity="0.7" />
      </g>
      {/* desk */}
      <g transform="translate(120 144)">
        <rect x="-56" y="-6" width="112" height="10" rx="5" fill={ART.clay} />
        <rect x="-44" y="4" width="7" height="32" fill={ART.skin2} />
        <rect x="37" y="4" width="7" height="32" fill={ART.skin2} />
        {/* paper + pen */}
        <g transform="translate(-18 -24)">
          <rect x="-12" y="-16" width="24" height="30" rx="3" fill="#fff" stroke={ART.clay} strokeWidth="2" />
          <rect x="-12" y="-16" width="24" height="6" rx="3" fill={ART.clay} />
          <path d="M -4 -8 l 6 10 l -4 2 l -6 -10 Z" fill={ART.wine} />
          <path d="M 0 -14 c 1 0 2 1 1 2" fill="none" stroke={ART.clay} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
      {/* woman seated */}
      <g transform="translate(58 160)">
        <path d="M -34 34 C -34 -6 -18 -30 0 -30 C 18 -30 34 -6 34 34 Z" fill={ART.wine} />
        <g transform="translate(4 -46) rotate(8)">
          <circle cx="0" cy="0" r="16" fill={ART.skin1} />
          <path d="M -16 0 A 16 16 0 0 1 16 0 L 16 4 A 16 12 0 0 0 -16 4 Z" fill={ART.wineDeep} />
          <circle cx="-13" cy="-10" r="4.5" fill={ART.wineDeep} />
        </g>
      </g>
      {/* light glow on paper */}
      <circle cx="68" cy="104" r="26" fill={ART.saffron} opacity="0.25" />
      {/* thought dots */}
      <circle cx="84" cy="80" r="2.6" fill={ART.clay} opacity="0.7" />
      <circle cx="94" cy="72" r="2" fill={ART.clay} opacity="0.5" />
    </svg>
  );
}

/** Step 2: Anonymous - abstract shield with light (no people). */
export function StepAnonymous({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" fill={ART.plumSoft} />
      {/* glow */}
      <circle cx="150" cy="100" r="62" fill={ART.saffron} opacity="0.2" />
      {/* shield */}
      <path
        d="M150 38 C112 38 82 74 82 122 L82 170 C82 194 104 202 132 202 L168 202 C196 202 218 194 218 170 L218 122 C218 74 188 38 150 38 Z"
        fill={ART.wine}
        opacity="0.95"
      />
      <path
        d="M150 62 C126 62 104 82 104 122 L104 148 C104 164 118 172 136 172 L164 172 C182 172 196 164 196 148 L196 122 C196 82 174 62 150 62 Z"
        fill={ART.clay}
        opacity="0.85"
      />
      {/* lock body */}
      <rect x="138" y="118" width="24" height="34" rx="4" fill={ART.wineDeep} />
      <path d="M150 98 C136 98 124 110 124 124 C124 124 124 124 124 124" fill="none" stroke={ART.wineDeep} strokeWidth="6" strokeLinecap="round" />
      <path d="M150 98 C164 98 176 110 176 124" fill="none" stroke={ART.wineDeep} strokeWidth="6" strokeLinecap="round" />
      <rect x="146" y="118" width="8" height="12" rx="1" fill={ART.wineDeep} />
      {/* light from keyhole */}
      <circle cx="150" cy="134" r="8" fill={ART.cream} />
      <g stroke={ART.saffron} strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="150" y1="144" x2="150" y2="160" />
        <line x1="142" y1="136" x2="132" y2="142" />
        <line x1="158" y1="136" x2="168" y2="142" />
      </g>
      {/* privacy dots */}
      <circle cx="102" cy="148" r="2.4" fill={ART.sage} opacity="0.8" />
      <circle cx="198" cy="148" r="2.4" fill={ART.clay} opacity="0.8" />
      <circle cx="112" cy="138" r="1.8" fill={ART.sage} opacity="0.6" />
      <circle cx="208" cy="138" r="1.8" fill={ART.clay} opacity="0.6" />
    </svg>
  );
}

/** Step 3: Receive - two women reading answers together at a table. */
export function StepReceive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="presentation" aria-hidden="true">
      <rect width="300" height="200" fill={ART.sageSoft} />
      {/* table */}
      <g transform="translate(150 146)">
        <rect x="-74" y="-6" width="148" height="10" rx="5" fill={ART.clay} />
        <rect x="-64" y="4" width="7" height="30" fill={ART.skin2} />
        <rect x="57" y="4" width="7" height="30" fill={ART.skin2} />
        {/* two cups */}
        <g>
          <rect x="-40" y="-14" width="11" height="10" rx="2" fill={ART.wine} />
          <rect x="32" y="-14" width="11" height="10" rx="2" fill={ART.sage} />
        </g>
        {/* lamp */}
        <g transform="translate(0 -16)">
          <circle r="14" fill={ART.saffron} opacity="0.3" />
          <path d="M 0 -10 c 5 6 5 12 0 16 c -5 -4 -5 -10 0 -16 Z" fill={ART.saffron} />
        </g>
      </g>
      {/* left woman */}
      <g transform="translate(64 160)">
        <path d="M -30 0 C -30 -20 -16 -34 0 -34 C 16 -34 30 -20 30 0 Z" fill={ART.wine} />
        <circle cx="0" cy="-46" r="13.5" fill={ART.skin2} />
        <path d="M -13.5 -46 A 13.5 13.5 0 0 1 13.5 -46 L 13.5 -42 A 13.5 10 0 0 0 -13.5 -42 Z" fill={ART.saffron} />
        <circle cx="11" cy="-56" r="4" fill={ART.saffron} />
      </g>
      {/* right woman */}
      <g transform="translate(236 160)">
        <path d="M -30 0 C -30 -20 -16 -34 0 -34 C 16 -34 30 -20 30 0 Z" fill={ART.clay} />
        <circle cx="0" cy="-46" r="13.5" fill={ART.skin3} />
        <path d="M -13.5 -46 A 13.5 13.5 0 0 1 13.5 -46 L 13.5 -42 A 13.5 10 0 0 0 -13.5 -42 Z" fill={ART.wineDeep} />
        <circle cx="11" cy="-56" r="4" fill={ART.wineDeep} />
      </g>
      {/* shared glowing tablet */}
      <g transform="translate(150 130)">
        <circle r="22" fill={ART.saffron} opacity="0.25" />
        <rect x="-10" y="-14" width="20" height="26" rx="3" fill={ART.wineDeep} />
        <rect x="-7" y="-10" width="14" height="18" rx="1.5" fill={ART.cream} />
        <line x1="-4" y1="-6" x2="4" y2="-6" stroke={ART.sage} strokeWidth="1.6" />
        <line x1="-4" y1="-2" x2="4" y2="-2" stroke={ART.sage} strokeWidth="1.6" opacity="0.7" />
      </g>
      {/* conversation dots */}
      <circle cx="98" cy="96" r="2.6" fill={ART.clay} opacity="0.7" />
      <circle cx="202" cy="92" r="2.6" fill={ART.sage} opacity="0.8" />
      <circle cx="148" cy="82" r="2" fill={ART.clay} opacity="0.5" />
    </svg>
  );
}
