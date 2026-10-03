import { useState } from 'react';
import { LottieLight } from 'lottie-react';

interface LottiePlayerProps {
  /** Parsed Lottie JSON — import from `@/assets/lottie/*.json` */
  animationData: object;
  className?: string;
  loop?: boolean;
  /** Accessible name when the animation carries meaning; omit for pure decoration */
  label?: string;
}

/**
 * Brand-tinted Lottie illustration, rendered with the library's light SVG
 * build (no expression engine — safe under our strict CSP). Loops gently by
 * default and shows a static first frame for reduced-motion users.
 */
export function LottiePlayer({ animationData, className, loop = true, label }: LottiePlayerProps) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <LottieLight
      src={animationData}
      autoplay={!reduced}
      loop={loop && !reduced}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
