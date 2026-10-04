import { Link } from 'react-router-dom';
import { HeartHandshake, Languages, ShieldCheck, GitBranch, Sparkles } from 'lucide-react';

import { useUiLanguage } from '@/contexts/UiLanguageContext';

export function SiteFooter() {
  const { t } = useUiLanguage();

  return (
    <footer className="border-t bg-card mt-24">
      <div className="container py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="size-8 rounded-lg" />
            <span className="font-display font-semibold text-lg">NuruWomen</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            {t('footer.tagline')}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0" />
            {t('footer.emergency')}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">{t('footer.exploreTitle')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground transition-colors" to="/ask">{t('footer.ask')}</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/questions">{t('footer.questions')}</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/library">{t('footer.library')}</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/events">{t('footer.events')}</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/blind-spots">{t('footer.coverage')}</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/about">{t('footer.about')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">{t('footer.openTitle')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <GitBranch className="size-3.5 shrink-0" /> {t('footer.open1')}
            </li>
            <li>{t('footer.open2')}</li>
            <li>
              <Link to="/about#translate" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Languages className="size-3.5 shrink-0" /> {t('footer.translate')}
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <HeartHandshake className="size-3.5 shrink-0" /> {t('footer.open3')}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{t('footer.copyright')}</span>
          <a
            href="https://shakespeare.diy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Sparkles className="size-3.5" />
            Vibed with Shakespeare
          </a>
        </div>
      </div>
    </footer>
  );
}
