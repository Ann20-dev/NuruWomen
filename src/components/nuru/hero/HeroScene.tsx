import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * The NuruWomen hero signature: a living "knowledge object".
 *
 * An organic, translucent sculpture — soft membrane layers, a warm seed of
 * light, woven strands, ambient particles — that breathes slowly, follows the
 * cursor with magnetic parallax, and is orbited by faint floating questions
 * that sharpen as the cursor approaches them.
 *
 * Pure SVG + CSS + one rAF loop. No WebGL, no dependencies. Falls back to a
 * static composition on touch devices and for reduced-motion users.
 */

const QUESTIONS = [
  'Is this normal?',
  'Why does it hurt?',
  'Can I ask this anonymously?',
  'Why is my period changing?',
  'Should I see a doctor?',
  'Nobody taught me this.',
  'Could this be hormonal?',
] as const;

/** Anchor positions as % of the scene box. */
const ANCHORS = [
  { x: 6, y: 20 },
  { x: 64, y: 10 },
  { x: 0, y: 54 },
  { x: 74, y: 48 },
  { x: 12, y: 84 },
  { x: 58, y: 88 },
  { x: 40, y: 3 },
] as const;

/** Question indices shown on touch / reduced-motion (calm, fixed). */
const STATIC_VISIBLE = [0, 3, 5];

export function HeroScene({ askHover, className }: { askHover: boolean; className?: string }) {
  // Interactive only with a fine pointer and no reduced-motion preference.
  const [staticMode] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches,
  );

  const [cycle, setCycle] = useState(0);
  const [rippleKey, setRippleKey] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const qRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const visible: number[] = staticMode
    ? STATIC_VISIBLE
    : [cycle % QUESTIONS.length, (cycle + 2) % QUESTIONS.length, (cycle + 4) % QUESTIONS.length];

  // Questions emerge from the pool one wave at a time.
  useEffect(() => {
    if (staticMode) return;
    const id = setInterval(() => setCycle((c) => c + 1), 4200);
    return () => clearInterval(id);
  }, [staticMode]);

  // The ask CTA sends a ripple through the object (render-time state
  // adjustment, so the ripple restarts the moment the hover begins).
  const [prevAskHover, setPrevAskHover] = useState(askHover);
  if (prevAskHover !== askHover) {
    setPrevAskHover(askHover);
    if (askHover && !staticMode) setRippleKey((k) => k + 1);
  }

  // One rAF loop: magnetic parallax, cursor light field, question physics,
  // the connector thread, and the slow retreat on scroll.
  useEffect(() => {
    if (staticMode) return;
    const root = rootRef.current;
    if (!root) return;

    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
    let scrollP = 0;
    let running = true;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = (e.clientY - r.top) / r.height;
    };
    const onScroll = () => {
      const r = root.getBoundingClientRect();
      scrollP = Math.min(Math.max(-r.top / (r.height * 0.9), 0), 1);
    };
    const io = new IntersectionObserver((entries) => {
      running = entries[0]?.isIntersecting ?? true;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(tick);
    });

    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;

      const r = root.getBoundingClientRect();
      const px = pointer.x * r.width;
      const py = pointer.y * r.height;

      // Warm light field — reveals the object rather than glowing at you.
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${px - 260}px, ${py - 260}px, 0)`;
        lightRef.current.style.opacity = '0.75';
      }

      // The object leans gently toward the cursor and drifts away on scroll.
      if (objectRef.current) {
        const dx = (pointer.x - 0.5) * 22;
        const dy = (pointer.y - 0.5) * 16;
        const retreatY = -scrollP * 46;
        const retreatS = 1 - scrollP * 0.07;
        objectRef.current.style.transform = `translate3d(${dx}px, ${dy + retreatY}px, 0) scale(${retreatS})`;
      }

      // Questions sharpen and lean in near the cursor; the closest threads
      // a faint line back to the heart of the object.
      let best: { i: number; d: number } | null = null;
      qRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = ANCHORS[i];
        const ax = (a.x / 100) * r.width;
        const ay = (a.y / 100) * r.height;
        const d = Math.hypot(px - ax, py - ay);
        const near = Math.max(0, 1 - d / 260);
        const pull = near * 14;
        const ux = d > 0 ? (px - ax) / d : 0;
        const uy = d > 0 ? (py - ay) / d : 0;
        el.style.transform = `translate3d(${ux * pull}px, ${uy * pull}px, 0)`;
        el.style.filter = `blur(${Math.max(0, 2.2 - near * 2.4)}px)`;
        el.style.opacity = String(0.45 + near * 0.55);
        if (near > 0.35 && (!best || d < best.d)) best = { i, d };
      });

      if (lineRef.current) {
        if (best) {
          const a = ANCHORS[(best as { i: number }).i];
          lineRef.current.setAttribute('x1', String((a.x / 100) * r.width));
          lineRef.current.setAttribute('y1', String((a.y / 100) * r.height));
          lineRef.current.setAttribute('x2', String(r.width / 2));
          lineRef.current.setAttribute('y2', String(r.height / 2));
          lineRef.current.style.opacity = '0.45';
        } else {
          lineRef.current.style.opacity = '0';
        }
      }

      if (running) raf = requestAnimationFrame(tick);
    };

    root.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    io.observe(root);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [staticMode]);

  return (
    <div
      ref={rootRef}
      data-open={askHover && !staticMode ? '' : undefined}
      aria-hidden
      className={cn(
        'relative h-[300px] sm:h-[400px] lg:h-[520px] select-none',
        'motion-reduce:animate-none [animation:hero-emerge_1.4s_ease_0.45s_both]',
        className,
      )}
    >
      {/* Cursor light field — sunlight through translucent material */}
      {!staticMode && (
        <div
          ref={lightRef}
          className="pointer-events-none absolute top-0 left-0 size-[520px] rounded-full opacity-0 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(closest-side, hsl(38 74% 62% / 0.16), hsl(346 48% 50% / 0.05) 55%, transparent 72%)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* ── The knowledge object ─────────────────────────── */}
      <div ref={objectRef} className="absolute inset-0 grid place-items-center will-change-transform">
        <div className="animate-breathe motion-reduce:animate-none">
          <svg
            viewBox="0 0 400 400"
            className="w-[min(78vw,300px)] sm:w-[min(52vw,380px)] lg:w-[430px] h-auto overflow-visible"
            role="presentation"
          >
            <defs>
              <radialGradient id="ko-outer" cx="42%" cy="34%" r="72%">
                <stop offset="0%" stopColor="hsl(40 48% 99% / 0.9)" />
                <stop offset="55%" stopColor="hsl(38 46% 92% / 0.42)" />
                <stop offset="100%" stopColor="hsl(346 48% 40% / 0.16)" />
              </radialGradient>
              <radialGradient id="ko-mid" cx="46%" cy="38%" r="70%">
                <stop offset="0%" stopColor="hsl(272 34% 46% / 0.26)" />
                <stop offset="100%" stopColor="hsl(346 48% 36% / 0.08)" />
              </radialGradient>
              <radialGradient id="ko-seed" cx="45%" cy="38%" r="65%">
                <stop offset="0%" stopColor="hsl(40 78% 74% / 0.95)" />
                <stop offset="55%" stopColor="hsl(38 74% 48% / 0.6)" />
                <stop offset="100%" stopColor="hsl(346 48% 36% / 0.45)" />
              </radialGradient>
              <radialGradient id="ko-light" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(40 48% 99% / 0.9)" />
                <stop offset="100%" stopColor="hsl(40 48% 99% / 0)" />
              </radialGradient>
              <filter id="ko-b2" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
              <filter id="ko-b5" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="ko-b9" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>

            {/* ambient particles, barely there, in slow orbit */}
            <g className="animate-spin-slower motion-reduce:animate-none" style={{ transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="52" r="2" fill="hsl(38 74% 44% / 0.5)" />
              <circle cx="330" cy="150" r="1.6" fill="hsl(346 48% 36% / 0.4)" />
              <circle cx="316" cy="292" r="2.2" fill="hsl(38 74% 44% / 0.35)" />
              <circle cx="200" cy="352" r="1.5" fill="hsl(272 34% 40% / 0.4)" />
              <circle cx="80" cy="286" r="2" fill="hsl(346 48% 36% / 0.3)" />
              <circle cx="66" cy="140" r="1.7" fill="hsl(38 74% 44% / 0.4)" />
            </g>

            {/* soft ground shadow */}
            <ellipse cx="200" cy="356" rx="118" ry="16" fill="hsl(342 20% 15% / 0.10)" filter="url(#ko-b9)" />

            {/* outer membrane */}
            <path
              className="membrane m-outer"
              d="M200 48 C268 44 330 96 340 168 C350 240 316 312 250 342 C184 372 106 350 74 288 C42 226 58 142 112 98 C146 70 162 50 200 48 Z"
              fill="url(#ko-outer)"
              filter="url(#ko-b2)"
              opacity="0.85"
            />

            {/* mid membrane */}
            <path
              className="membrane m-mid"
              d="M200 96 C250 92 296 128 304 180 C312 232 286 286 236 306 C186 326 128 310 102 264 C76 218 88 152 130 122 C158 104 172 98 200 96 Z"
              fill="url(#ko-mid)"
              filter="url(#ko-b5)"
              opacity="0.8"
            />

            {/* woven strands */}
            <g fill="none" stroke="hsl(272 34% 36% / 0.16)" strokeWidth="1">
              <path d="M120 190 C160 160 250 150 290 185" />
              <path d="M110 240 C170 265 240 265 295 235" />
              <path d="M150 130 C200 155 235 210 245 265" />
            </g>

            {/* the seed — nuru, the light inside */}
            <path
              className="membrane m-seed"
              d="M200 148 C232 146 260 172 264 204 C268 236 250 268 218 278 C186 288 152 274 138 246 C124 218 132 184 156 166 C172 154 184 150 200 148 Z"
              fill="url(#ko-seed)"
              filter="url(#ko-b2)"
              opacity="0.9"
            />

            {/* light catching the surface */}
            <ellipse cx="168" cy="150" rx="70" ry="44" fill="url(#ko-light)" opacity="0.5" filter="url(#ko-b9)" />
          </svg>
        </div>
      </div>

      {/* connector thread: question → object */}
      {!staticMode && (
        <svg className="pointer-events-none absolute inset-0 w-full h-full" role="presentation">
          <line
            ref={lineRef}
            stroke="hsl(38 74% 44% / 0.55)"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="opacity-0 transition-opacity duration-500"
          />
        </svg>
      )}

      {/* CTA ripple travelling through the object */}
      {!staticMode && rippleKey > 0 && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div key={rippleKey} className="hero-ripple size-[300px] rounded-full border border-gold/50" />
        </div>
      )}

      {/* floating questions — emerging from the commons */}
      {QUESTIONS.map((q, i) => {
        const isVisible = visible.includes(i);
        return (
          <span
            key={q}
            ref={(el) => {
              qRefs.current[i] = el;
            }}
            className={cn(
              'absolute font-display italic text-[0.82rem] sm:text-sm text-muted-foreground whitespace-nowrap',
              'transition-opacity duration-[1200ms] ease-out will-change-transform',
              !isVisible && 'opacity-0',
            )}
            style={{
              left: `${ANCHORS[i].x}%`,
              top: `${ANCHORS[i].y}%`,
              filter: staticMode ? 'blur(1.6px)' : undefined,
              opacity: staticMode ? 0.5 : undefined,
              transitionDelay: `${visible.indexOf(i) * 350}ms`,
            }}
          >
            {q}
          </span>
        );
      })}
    </div>
  );
}
