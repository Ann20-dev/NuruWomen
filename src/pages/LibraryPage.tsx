import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LibraryBig, Search } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { ArticleCard } from '@/components/nuru/ArticleCard';
import { EmptyState } from '@/components/nuru/EmptyState';
import { Input } from '@/components/ui/input';
import { ARTICLES } from '@/data/articles';
import { AREAS } from '@/lib/nuru/topics';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  useSeoMeta({
    title: 'Knowledge library — Nuru Commons',
    description: 'Clinician-reviewed women’s health knowledge across the whole lifecycle — from first periods to healthy ageing.',
  });

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
            <LibraryBig className="size-4" /> Clinically reviewed
          </p>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">The knowledge library</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Women’s health across the whole lifecycle — each article reviewed, signed and dated by a named
            clinician, with sources you can check yourself.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the library…"
              className="pl-9"
              aria-label="Search articles"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setParams({})}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                area === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/60 hover:bg-accent',
              )}
            >
              All
            </button>
            {AREAS.map((a) => (
              <button
                key={a.slug}
                onClick={() => setParams({ area: a.slug })}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  area === a.slug ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/60 hover:bg-accent',
                )}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {areasWithContent.length === 0 ? (
          <EmptyState message="Nothing matches that search yet. Try a different term — or ask the community anonymously." />
        ) : (
          <div className="space-y-12">
            {areasWithContent.map((a) => (
              <section key={a.slug} className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-display font-semibold text-2xl">
                    {a.name}
                    {a.swahili && <span className="ml-2 text-sm font-sans font-medium text-gold">{a.swahili}</span>}
                  </h2>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {a.articles.map((art) => (
                    <ArticleCard key={art.slug} article={art} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
