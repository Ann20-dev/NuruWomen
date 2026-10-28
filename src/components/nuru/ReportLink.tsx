import { Flag } from 'lucide-react';

export function ReportLink({ label = 'Report' }: { label?: string }) {
  const href = 'mailto:report@nuruwomen.example?subject=Report%20content';
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
      aria-label={label}
    >
      <Flag className="size-3" />
      {label}
    </a>
  );
}
