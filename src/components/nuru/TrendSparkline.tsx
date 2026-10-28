import { cn } from '@/lib/utils';

/**
 * TrendSparkline - an accessible mini trend chart.
 *
 * Renders an aggregate-only sparkline whose overall direction matches the
 * supplied trend percentage. No per-user data is encoded; the curve is a
 * decorative summary of the published aggregate delta (e.g. "+12% this month").
 *
 * Accessibility: role="img" with an aria-label describing the trend; the path
 * itself is aria-hidden.
 */
export function TrendSparkline({
  trendPct,
  size = 88,
  height = 30,
  color = 'var(--gold)',
}: {
  trendPct: number;
  size?: number;
  height?: number;
  color?: string;
}) {
  const w = size;
  const h = height;
  const up = trendPct >= 0;
  const absPct = Math.min(Math.abs(trendPct), 60);
  const rise = (absPct / 60) * (h * 0.55);

  // Sample points along a smooth aggregate curve whose net direction follows
  // the trend. First half gently flat, second half sweeps up/down.
  const pts: { x: number; y: number }[] = [];
  const n = 7;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    let y = Math.sin(t * Math.PI * 1.4) * 0.25;
    if (t > 0.35) {
      const s = (t - 0.35) / 0.65;
      y += (up ? -1 : 1) * (rise / h) * (s * s) * 0.9;
    }
    pts.push({ x: i * (w / (n - 1)), y: h * 0.62 - y * h });
  }

  // Build smooth path with quadratic control points between samples.
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = (p0.x + p1.x) / 2;
    const cy = (p0.y + p1.y) / 2;
    d += ` Q${cx},${cy} ${p1.x},${p1.y}`;
  }

  const trendLabel =
    trendPct > 0
      ? `trending up ${trendPct}%`
      : trendPct < 0
        ? `trending down ${Math.abs(trendPct)}%`
        : 'no change';

  return (
    <svg
      className={cn('shrink-0', 'transition-colors duration-300')}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={trendLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* fill area under the line (subtle) */}
      <path
        d={`${d} L${w},${h} L0,${h} Z`}
        fill={color}
        opacity={up ? 0.12 : 0.10}
        stroke="none"
        aria-hidden="true"
      />
      {/* the trend line */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      />
      {/* endpoint dots */}
      <circle cx={pts[0].x} cy={pts[0].y} r="1.5" fill={color} aria-hidden="true" />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="1.5"
        fill={color}
        aria-hidden="true"
      />
    </svg>
  );
}
