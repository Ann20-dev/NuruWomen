import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, MessageCircleQuestion } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/questions', label: 'Questions' },
  { to: '/library', label: 'Library' },
  { to: '/research', label: 'Research' },
  { to: '/blind-spots', label: 'Coverage' },
  { to: '/about', label: 'About' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img src="/favicon.svg" alt="NuruWomen" className="size-9 rounded-xl shadow-sm" />
          <span className="leading-tight">
            <span className="block font-display font-semibold text-lg tracking-tight">NuruWomen</span>
            <span className="hidden sm:block text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Women’s Health Commons · Africa
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm" className="hidden lg:inline-flex rounded-full whitespace-nowrap">
            <Link to="/ask">
              <MessageCircleQuestion className="size-4" />
              Ask a question
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2.5 rounded-lg text-base font-medium',
                        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button asChild className="mt-4 rounded-full">
                  <Link to="/ask" onClick={() => setOpen(false)}>
                    <MessageCircleQuestion className="size-4" />
                    Ask a question
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
