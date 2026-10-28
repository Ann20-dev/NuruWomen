import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Safety affordance: instantly leave to a neutral site. Uses replace() so the
 * previous page is not kept in browser history.
 */
export function QuickLeaveButton({ className }: { className?: string }) {
  const leave = () => {
    try {
      window.location.replace('https://www.google.com');
    } catch {
      window.location.href = 'https://www.google.com';
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={leave}
      className={className}
      aria-label="Quick leave to a neutral site"
      title="Quick leave"
    >
      <LogOut className="size-3.5" />
      <span className="hidden sm:inline">Leave</span>
    </Button>
  );
}
