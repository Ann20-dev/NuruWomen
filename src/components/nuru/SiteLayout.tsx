import type { ReactNode } from 'react';

import { SiteHeader } from '@/components/nuru/SiteHeader';
import { SiteFooter } from '@/components/nuru/SiteFooter';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
