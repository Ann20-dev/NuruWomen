import { cn } from '@/lib/utils';

/** Topic slugs that have dedicated icons. Falls back to a generic mark. */
export type TopicIconSlug =
  | 'menstrual-health'
  | 'sexual-health'
  | 'healthy-ageing'
  | 'postpartum'
  | 'mental-health'
  | 'hormones'
  | 'conditions'
  | 'fertility'
  | 'pregnancy'
  | 'cancer-prevention'
  | 'pelvic-health'
  | 'perimenopause'
  | 'menopause'
  | 'irregular-periods'
  | 'severe-period-pain'
  | 'heavy-bleeding'
  | 'pcos'
  | 'endometriosis'
  | 'fibroids'
  | 'painful-sex'
  | 'contraception'
  | 'stis'
  | 'pregnancy-warning-signs'
  | 'postpartum-anxiety'
  | 'cervical-screening'
  | 'breast-health'
  | 'pms-pmdd'
  | 'pelvic-floor'
  | string;

interface TopicIconProps {
  slug: TopicIconSlug;
  className?: string;
  size?: number | string;
  /** Override color - defaults to theme primary */
  color?: string;
}

const SIZE_MAP: Record<string, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

/** All topic icons share 2px stroke, rounded line caps/joins, brand color fill. */
export function TopicIcon({ slug, className, size = 'md', color }: TopicIconProps) {
  const strokeColor = color || 'currentColor';
  const sizeClass = SIZE_MAP[size] ?? 'size-5';

  const icon = TOPIC_ICONS[slug as keyof typeof TOPIC_ICONS] ?? DEFAULT_ICON;

  return (
    <svg
      className={cn(sizeClass, 'shrink-0 transition-colors duration-300', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={slug}
      aria-hidden={true}
    >
      {icon(strokeColor)}
    </svg>
  );
}

/** Individual icon builders - each returns inner SVG elements only. */
type IconBuilder = (color: string) => React.ReactNode;

const DROP = (color: string) => (
  <path
    d="M12 2c-2.21 0-4 1.79-4 4 0 2.6 3.16 6.74 4 8.28 0.84-1.54 4-5.68 4-8.28 0-2.21-1.79-4-4-4Z"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
);

const MOON = (color: string) => (
  <path
    d="M12 3a6 6 0 0 0 9 9 6 6 0 0 1-9-9Z"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
);

const TWO_FIGURES = (color: string) => (
  <g>
    <circle cx="8" cy="16" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M8 20v-4M4 16l4 4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M16 20v-4M20 16l-4 4-4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

const TREE = (color: string) => (
  <g>
    <path d="M12 2L5 8h14L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M12 8v8M9 13h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const CRADLE = (color: string) => (
  <g>
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M12 12v4M8 12l4 4 4-4M4 16l4 4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const HEART_HANDS = (color: string) => (
  <g>
    <path d="M12 14l2 2 2-2M9 9c-1.5 0-2 1-2 2s0.5 2 2 2 2-1 2-2M15 9c1.5 0 2 1 2 2s-0.5 2-2 2-2-1-2-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const SCALES = (color: string) => (
  <g>
    <path d="M12 3v18M4 9l4 4 4-4M20 9l-4 4-4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="12" cy="13" r="2" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

const PUZZLE = (color: string) => (
  <g>
    <rect x="6" y="6" width="12" height="12" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M12 6v6M18 12h-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const SPROUT = (color: string) => (
  <g>
    <path d="M12 18v-6M12 12l-3 3M12 12l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M6 18c0-3 3-3 3-6s3-3 6-3 6 3 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const BELLY = (color: string) => (
  <g>
    <path d="M8 14c0-2 2-4 4-4s4 2 4 4M16 14c0-2 2-4 4-4M8 14c0-2 2-4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="12" cy="10" rx="4" ry="6" stroke={color} strokeWidth="2" fill="none" />
  </g>
);

const SHIELD = (color: string) => (
  <path
    d="M12 2L3 7c0 5 6 9 6 9s6-4 6-9-3-5-6-5Z"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
);

const LEAF = (color: string) => (
  <path
    d="M12 2c-3.5 0-6 2-6 6s2.5 6 6 6 6-2 6-6S15.5 2 12 2Z"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    fill="none"
  />
);

const EXCLAMATION = (color: string) => (
  <g>
    <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

const PILL = (color: string) => (
  <g>
    <rect x="8" y="8" width="8" height="8" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <path d="M10 12v2M14 12v2M12 10h2M12 14h2" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

const CALENDAR = (color: string) => (
  <g>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

const HOT_WATER_BOTTLE = (color: string) => (
  <g>
    <path d="M12 4a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z" stroke={color} strokeWidth="2" fill="none" />
    <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </g>
);

const DEFAULT_ICON: IconBuilder = (color) => (
  <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
);

const TOPIC_ICONS: Record<string, IconBuilder> = {
  'menstrual-health': DROP,
  'sexual-health': TWO_FIGURES,
  'healthy-ageing': TREE,
  'postpartum': CRADLE,
  'mental-health': HEART_HANDS,
  'hormones': SCALES,
  'conditions': PUZZLE,
  'fertility': SPROUT,
  'pregnancy': BELLY,
  'cancer-prevention': SHIELD,
  'pelvic-health': LEAF,
  'perimenopause': MOON,
  'menopause': MOON,
  'irregular-periods': CALENDAR,
  'severe-period-pain': HOT_WATER_BOTTLE,
  'heavy-bleeding': DROP,
  'pcos': PUZZLE,
  'endometriosis': PUZZLE,
  'fibroids': PUZZLE,
  'painful-sex': TWO_FIGURES,
  'contraception': PILL,
  'stis': SHIELD,
  'pregnancy-warning-signs': EXCLAMATION,
  'postpartum-anxiety': HEART_HANDS,
  'cervical-screening': SHIELD,
  'breast-health': HEART_HANDS,
  'pms-pmdd': MOON,
  'pelvic-floor': LEAF,
};
