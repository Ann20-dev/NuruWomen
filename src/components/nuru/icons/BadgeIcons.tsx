import { cn } from '@/lib/utils';

/** Community hands - two hands reaching toward each other. Used for lived-experience layer. */
export function HandsIcon({ className, color }: { className?: string; color?: string }) {
  const c = color || 'currentColor';
  return (
    <svg
      className={cn('size-5 shrink-0 transition-colors duration-300', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* left hand */}
      <path
        d="M6 14c-1 0-2-1-2-2s1-2 2-2M6 10l2 2 2-2M4 12c0 2 2 4 4 4l2-2"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* right hand */}
      <path
        d="M18 14c1 0 2-1 2-2s-1-2-2-2M18 10l-2 2-2-2M20 12c0 2-2 4-4 4l-2-2"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* wrists */}
      <path d="M10 12v-4M14 12v-4" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* connection line */}
      <path d="M10 10h4" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Stethoscope - clinician symbol. Used for clinical-response layer. */
export function StethoscopeIcon({ className, color }: { className?: string; color?: string }) {
  const c = color || 'currentColor';
  return (
    <svg
      className={cn('size-5 shrink-0 transition-colors duration-300', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4c-4 0-6 2-6 6s2 6 6 6 6-2 6-6-2-6-6-6Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 10v2M10 12h2M14 12h2M12 14v2M6 10c0-2 2-4 4-4s4 2 4 4M18 10c0-2-2-4-4-4s-4 2-4 4"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* earpieces */}
      <path d="M8 14c0-1 1-2 2-2M14 14c0-1-1-2-2-2" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Open book with check mark - evidence/card layer. */
export function BookCheckIcon({ className, color }: { className?: string; color?: string }) {
  const c = color || 'currentColor';
  return (
    <svg
      className={cn('size-5 shrink-0 transition-colors duration-300', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4c-3 0-5 1-5 5v6c0 4 2 6 5 6s5-2 5-6V9c0-4-2-5-5-5Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 4v16" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* pages */}
      <path d="M8 10l2 2M8 14l2 2M16 10l-2 2M16 14l-2 2" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* check */}
      <path d="M12 14l2 2 4-4" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
