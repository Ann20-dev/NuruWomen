import { useCallback, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  max?: number;
}

/**
 * Pointer-tracked 3D tilt. The content rotates gently toward the cursor with
 * a soft light glare, and settles back on leave. Only active on devices with
 * a fine pointer (mouse/trackpad) and when reduced motion is not requested.
 */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const frame = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const enabled = useRef<boolean | null>(null);

  const canTilt = () => {
    if (enabled.current === null) {
      enabled.current =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return enabled.current;
  };

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = frame.current;
      if (!el || !canTilt()) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = 'transform 90ms ease-out';
      el.style.transform = `perspective(950px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      if (glare.current) {
        glare.current.style.opacity = '1';
        glare.current.style.background = `radial-gradient(420px circle at ${((px + 0.5) * 100).toFixed(1)}% ${((py + 0.5) * 100).toFixed(1)}%, hsl(40 48% 99% / 0.5), transparent 65%)`;
      }
    },
    [max],
  );

  const onPointerLeave = useCallback(() => {
    const el = frame.current;
    if (!el) return;
    el.style.transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = 'perspective(950px) rotateX(0deg) rotateY(0deg)';
    if (glare.current) glare.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={frame}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('relative [transform-style:preserve-3d] will-change-transform', className)}
    >
      {children}
      <div
        ref={glare}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
