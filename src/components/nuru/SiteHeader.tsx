import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe, Menu, MessageCircleQuestion } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { UI_LANGS, UI_LANG_NAMES } from '@/lib/nuru/i18n';
import { cn } from '@/lib/utils';
import type { UiKey } from '@/lib/nuru/i18n';

const NAV: { to: string; labelKey: UiKey }[] = [
  { to: '/questions', labelKey: 'nav.questions' },
  { to: '/library', labelKey: 'nav.library' },
  { to: '/research', labelKey: 'nav.research' },
  { to: '/events', labelKey: 'nav.events' },
  { to: '/blind-spots', labelKey: 'nav.coverage' },
  { to: '/about', labelKey: 'nav.about' },
];

function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useUiLanguage();
  return (
    <div
      className={cn('inline-flex items-center gap-1 rounded-full border bg-card p-0.5', className)}
      role="group"
      aria-label="Language / Lugha"
    >
      <Globe className="size-3.5 ml-1.5 text-muted-foreground" aria-hidden />
      {UI_LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
            lang === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {code === 'en' ? 'EN' : 'SW'}
          <span className="sr-only"> {UI_LANG_NAMES[code]}</span>
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useUiLanguage();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img src="/favicon.svg" alt="NuruWomen" className="size-9 rounded-xl shadow-sm" />
          <span className="leading-tight">
            <span className="block font-display font-semibold text-lg tracking-tight">NuruWomen</span>
            <span className="hidden sm:block text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              {t('header.tagline')}
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
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="hidden lg:inline-flex rounded-full whitespace-nowrap">
            <Link to="/ask">
              <MessageCircleQuestion className="size-4" />
              {t('nav.ask')}
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t('header.menu')}>
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
                    {t(item.labelKey)}
                  </NavLink>
                ))}
                <div className="mt-3 px-3">
                  <LanguageToggle />
                </div>
                <Button asChild className="mt-4 rounded-full">
                  <Link to="/ask" onClick={() => setOpen(false)}>
                    <MessageCircleQuestion className="size-4" />
                    {t('nav.ask')}
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
