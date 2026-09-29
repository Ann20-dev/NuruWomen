import { cn } from '@/lib/utils';

/**
 * Decorative blurred colour orbs that slowly float and drift behind hero
 * content, giving the page depth and gentle motion. Purely decorative —
 * hidden from assistive technology and paused for reduced-motion users.
 */
export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-24 right-[8%] size-72 rounded-full bg-gold-soft opacity-55 blur-3xl animate-drift" />
      <div className="absolute top-1/3 -left-24 size-80 rounded-full bg-accent opacity-55 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-[10%] right-[28%] size-64 rounded-full bg-plum-soft opacity-50 blur-3xl animate-float" />
      <div
        className="absolute top-[12%] left-[38%] size-40 rounded-full bg-clinical-soft opacity-50 blur-2xl animate-float"
        style={{ animationDelay: '1.8s' }}
      />
    </div>
  );
}
