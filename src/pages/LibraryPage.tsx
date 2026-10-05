import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LibraryBig, MessageCircleQuestion, Search, X } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { ArticleCard } from '@/components/nuru/ArticleCard';
import { EmptyState } from '@/components/nuru/EmptyState';
import { Reveal } from '@/components/nuru/Reveal';
import { Input } from '@/components/ui/input';
import { ARTICLES } from '@/data/articles';
import { AREAS } from '@/lib/nuru/topics';
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  useSeoMeta({
    title: 'Knowledge library — NuruWomen',
    description: 'Draft women’s health knowledge across the whole lifecycle — from first periods to healthy ageing.',
  });

  const { t, lang } = useUiLanguage();
  const [params, setParams] = useSearchParams();
  const area = params.get('area') ?? 'all';
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const inArea = area === 'all' || a.area === area;
      const inQuery =
        q.length === 0 ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q);
      return inArea && inQuery;
    });
  }, [area, query]);

  const areasWithContent = AREAS.map((a) => ({
    ...a,
    articles: visible.filter((art) => art.area === a.slug),
  })).filter((a) => a.articles.length > 0);

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
            <LibraryBig className="size-4" /> {t('library.kicker')}
          </p>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">{t('library.title')}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('library.subtitle')}
          </p>
        </div>

        <Link to="/research" className="inline-block text-primary underline font-semibold">{t('library.researchLink')}</Link>
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('library.searchPlaceholder')}
              className="h-12 rounded-full pl-11 pr-11 text-base shadow-sm bg-card focus-visible:shadow-md transition-shadow"
              aria-label="Search articles"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('library.clearSearch')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setParams({})}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                area === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-accent',
              )}
            >
              {t('library.all')}
            </button>
            {AREAS.map((a) => (
              <button
                key={a.slug}
                onClick={() => setParams({ area: a.slug })}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                  area === a.slug ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-accent',
                )}
              >
                {lang === 'sw' ? (a.swahili ?? a.name) : a.name}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="text-sm text-muted-foreground">
            {query || area !== 'all'
              ? `${visible.length} ${t('library.ofWord')} ${ARTICLES.length} ${t('library.articleWord')}`
              : `${ARTICLES.length} ${t('library.articleWord')} ${t('library.across')} ${AREAS.length} ${t('library.stagesWord')}`}
          </p>
        </div>

        {areasWithContent.length === 0 ? (
          <EmptyState
            message={t('library.empty')}
            action={
              <Link
                to="/ask"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircleQuestion className="size-4" />
                {t('common.askAnonymously')}
              </Link>
            }
          />
        ) : (
          <div className="space-y-12">
            {areasWithContent.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 100, 300)}>
              <section className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-display font-semibold text-2xl">
                    {lang === 'sw' ? (a.swahili ?? a.name) : a.name}
                    {a.swahili && lang !== 'sw' && <span className="ml-2 text-sm font-sans font-medium text-gold">{a.swahili}</span>}
                  </h2>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {a.articles.map((art) => (
                    <ArticleCard key={art.slug} article={art} />
                  ))}
                </div>
              </section>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
