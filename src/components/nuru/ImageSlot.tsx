import { cn } from '@/lib/utils';

/**
 * Named placeholder slot for imagery that still needs to be supplied.
 * Renders a clearly-labelled box so the layout is visible during development
 * without inventing broken image links.
 */
export function ImageSlot({
  name,
  width,
  height,
  subject,
  className,
}: {
  name: string;
  width: number;
  height: number;
  subject: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={subject}
      className={cn(
        'flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed bg-muted/40 text-center text-xs text-muted-foreground p-4',
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span className="font-semibold text-foreground">Image slot: {name}</span>
      <span>{subject}</span>
      <span className="opacity-70">{width}×{height}px</span>
    </div>
  );
}
