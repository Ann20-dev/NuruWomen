import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { config, updateConfig } = useAppContext();
  const dark = config.theme === 'dark' || (config.theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggle = () => {
    updateConfig((c) => ({ ...c, theme: dark ? 'light' : 'dark' }));
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={cn('rounded-full', className)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
