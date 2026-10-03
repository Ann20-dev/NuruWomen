import type { ReactElement } from 'react';

import { ART } from './palette';

export type TopicArtKind =
  | 'menstrual-health'
  | 'sexual-health'
  | 'healthy-ageing'
  | 'postpartum'
  | 'mental-health';

/** Faceless bust figure — the shared figure style across all illustrations. */
function Bust({
  x,
  y,
  skin,
  wrap,
  cloth,
  scale = 1,
}: {
  x: number;
  y: number;
  skin: string;
  wrap: string;
  cloth: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M -38 0 C -38 -26 -20 -40 0 -40 C 20 -40 38 -26 38 0 Z" fill={cloth} />
      <circle cx="0" cy="-54" r="16" fill={skin} />
      <path d="M -16 -54 A 16 16 0 0 1 16 -54 L 16 -50 A 16 12 0 0 0 -16 -50 Z" fill={wrap} />
      <circle cx="13" cy="-66" r="5" fill={wrap} />
    </g>
  );
}

/** A mother and daughter in a quiet conversation, a pad kit on the table. */
function MenstrualScene() {
  return (
    <>
      <rect width="300" height="200" fill={ART.claySoft} />
      {/* window light */}
      <rect x="196" y="16" width="72" height="60" rx="8" fill="#fff" opacity="0.75" />
      <line x1="232" y1="16" x2="232" y2="76" stroke={ART.claySoft} strokeWidth="3" />
      <circle cx="216" cy="32" r="8" fill={ART.saffron} opacity="0.7" />

      {/* small table between them */}
      <g transform="translate(150 138)">
        <rect x="-46" y="-5" width="92" height="9" rx="4.5" fill={ART.clay} />
        <rect x="-38" y="4" width="6" height="26" fill={ART.skin2} />
        <rect x="32" y="4" width="6" height="26" fill={ART.skin2} />
        {/* reusable pad kit */}
        <g transform="translate(0 -18)">
          <rect x="-20" y="-8" width="40" height="16" rx="4" fill={ART.wine} />
          <path d="M -20 -1 h 40" stroke={ART.saffron} strokeWidth="2" strokeDasharray="3 3" />
          <path d="M -6 -12 c 6 -4 12 -4 12 2 c 0 6 -6 6 -12 2 Z" fill={ART.cream} />
        </g>
      </g>

      {/* mother */}
      <Bust x={72} y={176} skin={ART.skin1} wrap={ART.wine} cloth={ART.saffron} scale={1.1} />
      {/* daughter, slightly smaller */}
      <Bust x={234} y={180} skin={ART.skin3} wrap={ART.sage} cloth={ART.wine} scale={0.85} />

      {/* gentle conversation dots */}
      <circle cx="126" cy="86" r="2.6" fill={ART.clay} opacity="0.7" />
      <circle cx="138" cy="76" r="2" fill={ART.clay} opacity="0.5" />
      <circle cx="176" cy="88" r="2.4" fill={ART.sage} opacity="0.7" />

      {/* moon-phase accent */}
      <g transform="translate(40 34)">
        <circle r="9" fill={ART.saffron} opacity="0.35" />
        <path d="M 3 -7 a 8 8 0 1 0 0 14 a 6 8 0 1 1 0 -14" fill={ART.wine} />
      </g>
    </>
  );
}

/** A private, respectful consultation: a woman and a clinician across a desk. */
function SexualHealthScene() {
  return (
    <>
      <rect width="300" height="200" fill="#f6e4da" />
      {/* privacy curtain arc */}
      <path d="M 250 200 L 250 70 A 90 90 0 0 0 70 70 L 70 200" fill={ART.cream} opacity="0.55" />
      <circle cx="256" cy="34" r="20" fill={ART.sage} opacity="0.3" />

      {/* desk */}
      <g transform="translate(150 142)">
        <rect x="-52" y="-5" width="104" height="9" rx="4.5" fill={ART.clay} />
        <rect x="-44" y="4" width="6" height="26" fill={ART.skin2} />
        <rect x="38" y="4" width="6" height="26" fill={ART.skin2} />
        {/* clipboard */}
        <g transform="translate(-6 -22) rotate(-4)">
          <rect x="-14" y="-10" width="28" height="22" rx="3" fill="#fff" stroke={ART.sage} strokeWidth="2" />
          <line x1="-8" y1="-3" x2="8" y2="-3" stroke={ART.sage} strokeWidth="1.8" />
          <line x1="-8" y1="3" x2="6" y2="3" stroke={ART.sage} strokeWidth="1.8" opacity="0.7" />
        </g>
      </g>

      {/* the woman */}
      <Bust x={68} y={178} skin={ART.skin2} wrap={ART.saffron} cloth={ART.clay} scale={1.05} />
      {/* the clinician — teal uniform with a soft badge */}
      <g transform="translate(232 196) scale(1.05)">
        <path d="M -38 0 C -38 -26 -20 -40 0 -40 C 20 -40 38 -26 38 0 Z" fill="#1f7668" />
        <circle cx="0" cy="-54" r="16" fill={ART.skin3} />
        <path d="M -16 -54 A 16 16 0 0 1 16 -54 L 16 -50 A 16 12 0 0 0 -16 -50 Z" fill="#d8d2c8" />
        <circle cx="13" cy="-66" r="5" fill="#d8d2c8" />
        {/* stethoscope suggestion */}
        <path d="M -10 -36 c 0 12 4 18 10 18 c 6 0 10 -6 10 -18" fill="none" stroke="#d8d2c8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="-16" r="4" fill="#d8d2c8" />
      </g>

      {/* respectful-talk dots */}
      <circle cx="126" cy="80" r="2.6" fill={ART.clay} opacity="0.7" />
      <circle cx="174" cy="76" r="2.6" fill="#1f7668" opacity="0.6" />
      <circle cx="150" cy="66" r="2" fill={ART.wine} opacity="0.5" />
    </>
  );
}

/** An older woman walking through her garden in the sun. */
function HealthyAgeingScene() {
  return (
    <>
      <rect width="300" height="200" fill={ART.saffronSoft} />
      <circle cx="248" cy="44" r="26" fill={ART.saffron} />
      {/* sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={248 + 32 * Math.cos((deg * Math.PI) / 180)}
          y1={44 + 32 * Math.sin((deg * Math.PI) / 180)}
          x2={248 + 40 * Math.cos((deg * Math.PI) / 180)}
          y2={44 + 40 * Math.sin((deg * Math.PI) / 180)}
          stroke={ART.saffron}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}

      {/* garden pots */}
      <g transform="translate(52 162)">
        <path d="M -10 0 h 20 l -3 16 h -14 Z" fill={ART.clay} />
        <path d="M 0 0 c -2 -12 -8 -18 -16 -22 c 2 8 6 14 12 18" fill={ART.sage} />
        <path d="M 0 0 c 2 -14 8 -20 16 -24 c -2 8 -6 16 -12 20" fill={ART.sage} />
        <circle cx="-6" cy="-14" r="3" fill={ART.wine} />
        <circle cx="7" cy="-18" r="3" fill={ART.saffron} />
      </g>
      <g transform="translate(88 172) scale(0.8)">
        <path d="M -10 0 h 20 l -3 16 h -14 Z" fill={ART.wine} />
        <path d="M 0 0 c -2 -12 -8 -18 -16 -22 c 2 8 6 14 12 18" fill={ART.sage} />
        <circle cx="5" cy="-16" r="3" fill={ART.saffron} />
      </g>

      {/* elder walking with a stick */}
      <g transform="translate(190 158)">
        <path d="M -28 6 C -30 -20 -16 -38 0 -38 C 16 -38 30 -20 28 6 C 14 12 -14 12 -28 6 Z" fill={ART.wine} />
        <circle cx="0" cy="-52" r="15" fill={ART.skin1} />
        <path d="M -15 -52 A 15 15 0 0 1 15 -52 L 15 -48 A 15 11 0 0 0 -15 -48 Z" fill="#d8d2c8" />
        <circle cx="12" cy="-64" r="4.5" fill="#d8d2c8" />
        <circle cx="-13" cy="-48" r="1.8" fill={ART.saffron} />
      </g>
      <line x1="232" y1="104" x2="238" y2="168" stroke={ART.skin2} strokeWidth="4" strokeLinecap="round" />

      {/* ground + bird */}
      <path d="M 0 200 C 70 174 160 176 230 200 Z" fill={ART.sage} opacity="0.35" />
      <path d="M 120 46 q 5 -6 10 0 q 5 -6 10 0" fill="none" stroke={ART.skin2} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

/** A mother at ease, feeding her newborn at home. */
function PostpartumScene() {
  return (
    <>
      <rect width="300" height="200" fill={ART.plumSoft} />
      {/* home window + plant */}
      <rect x="20" y="18" width="64" height="56" rx="8" fill="#fff" opacity="0.7" />
      <line x1="52" y1="18" x2="52" y2="74" stroke={ART.plumSoft} strokeWidth="3" />
      <circle cx="36" cy="34" r="7" fill={ART.saffron} opacity="0.7" />
      <circle cx="256" cy="40" r="26" fill={ART.saffron} opacity="0.35" />

      {/* mother, seated and at ease */}
      <g transform="translate(150 196)">
        <path d="M -52 0 C -52 -52 -28 -78 0 -78 C 28 -78 52 -52 52 0 Z" fill={ART.plum} />
        <circle cx="0" cy="-96" r="20" fill={ART.skin3} />
        <path d="M -20 -96 A 20 20 0 0 1 20 -96 L 20 -90 A 20 15 0 0 0 -20 -90 Z" fill={ART.wine} />
        <circle cx="16" cy="-112" r="6.5" fill={ART.wine} />
        {/* kitenge triangles on wrap */}
        <path d="M -40 -8 l 8 -14 l 8 14 Z" fill={ART.saffron} />
        <path d="M -20 -8 l 8 -14 l 8 14 Z" fill={ART.clay} />
        <path d="M 0 -8 l 8 -14 l 8 14 Z" fill={ART.saffron} />
        <path d="M 20 -8 l 8 -14 l 8 14 Z" fill={ART.clay} />
        {/* baby at the breast, swaddled */}
        <g transform="translate(0 -34) rotate(-10)">
          <ellipse cx="0" cy="0" rx="26" ry="17" fill={ART.cream} />
          <circle cx="-14" cy="-4" r="9" fill={ART.skin2} />
          <path d="M -23 -6 a 9 9 0 0 1 12 -6 l -2 5 a 6 6 0 0 0 -8 4 Z" fill={ART.wineDeep} />
          <path d="M -2 -12 l 20 6 l -2 10 l -20 -6 Z" fill={ART.saffron} />
        </g>
      </g>

      {/* calm hearts */}
      <path d="M 226 62 c -8 -7 -12 -11 -12 -16 c 0 -5 3 -8 7 -8 c 3 0 5 1 6 4 c 1 -3 4 -4 6 -4 c 4 0 7 3 7 8 c 0 5 -4 9 -12 16 Z" fill={ART.wine} opacity="0.8" />
      <path d="M 66 130 c -6 -5 -9 -8 -9 -12 c 0 -4 2 -6 5 -6 c 2 0 4 1 5 3 c 1 -2 3 -3 5 -3 c 3 0 5 2 5 6 c 0 4 -3 7 -9 12 Z" fill={ART.clay} opacity="0.7" />
    </>
  );
}

/** A woman sitting quietly with tea by the window, supportive friend nearby. */
function MentalHealthScene() {
  return (
    <>
      <rect width="300" height="200" fill={ART.sageSoft} />
      {/* window with daylight */}
      <g transform="translate(30 24)">
        <rect width="76" height="92" rx="8" fill="#fff" stroke={ART.sage} strokeWidth="3" />
        <line x1="38" y1="0" x2="38" y2="92" stroke={ART.sage} strokeWidth="2.5" />
        <line x1="0" y1="46" x2="76" y2="46" stroke={ART.sage} strokeWidth="2.5" />
        <circle cx="56" cy="20" r="9" fill={ART.saffron} opacity="0.7" />
      </g>

      {/* seated woman, calm, eyes closed */}
      <g transform="translate(104 156)">
        <path d="M -34 40 C -34 0 -18 -18 0 -18 C 18 -18 34 0 34 40 Z" fill={ART.sage} />
        <circle cx="0" cy="-32" r="15" fill={ART.skin2} />
        <path d="M -15 -32 A 15 15 0 0 1 15 -32 L 15 -28 A 15 11 0 0 0 -15 -28 Z" fill={ART.wineDeep} />
        <path d="M -7 -30 q 3 3 6 0" fill="none" stroke={ART.wineDeep} strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* supportive friend behind */}
      <g transform="translate(196 176) scale(0.9)">
        <path d="M -34 0 C -34 -22 -18 -36 0 -36 C 18 -36 34 -22 34 0 Z" fill={ART.clay} />
        <circle cx="0" cy="-48" r="14" fill={ART.skin1} />
        <path d="M -14 -48 A 14 14 0 0 1 14 -48 L 14 -44 A 14 10.5 0 0 0 -14 -44 Z" fill={ART.saffron} />
      </g>

      {/* teacup with leafy steam */}
      <g transform="translate(140 166)">
        <path d="M -16 -12 h 32 c 0 11 -7 18 -16 18 c -9 0 -16 -7 -16 -18 Z" fill={ART.wine} />
        <path d="M 16 -10 c 7 -2 10 2 8 7 c -2 4 -7 5 -10 3" fill="none" stroke={ART.wine} strokeWidth="3" />
        <ellipse cx="0" cy="9" rx="21" ry="3.5" fill={ART.wineDeep} opacity="0.35" />
        <path d="M -4 -20 C -8 -30 2 -34 -2 -44" fill="none" stroke={ART.sage} strokeWidth="3" strokeLinecap="round" />
        <path d="M 6 -20 C 2 -30 12 -36 8 -46" fill="none" stroke={ART.sage} strokeWidth="3" strokeLinecap="round" />
        <path d="M 8 -46 c 8 -6 16 -4 18 4 c -8 6 -16 4 -18 -4 Z" fill={ART.sage} />
      </g>

      {/* floating petals */}
      <circle cx="246" cy="120" r="3" fill={ART.clay} opacity="0.7" />
      <circle cx="258" cy="96" r="2.4" fill={ART.saffron} opacity="0.8" />
    </>
  );
}

const SCENES: Record<TopicArtKind, () => ReactElement> = {
  'menstrual-health': MenstrualScene,
  'sexual-health': SexualHealthScene,
  'healthy-ageing': HealthyAgeingScene,
  'postpartum': PostpartumScene,
  'mental-health': MentalHealthScene,
};

/**
 * Flat topic illustration (600×400 ratio). Decorative: the adjacent topic
 * label carries the meaning.
 */
export function TopicArt({ topic, className }: { topic: TopicArtKind; className?: string }) {
  const Scene = SCENES[topic];
  return (
    <svg
      viewBox="0 0 300 200"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <Scene />
    </svg>
  );
}
