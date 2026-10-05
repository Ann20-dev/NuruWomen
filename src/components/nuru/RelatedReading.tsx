import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Microscope } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import type { RetrievalResult } from '@/lib/nuru/retrieve';
import { sanitizeUrl } from '@/lib/utils';

/**
 * "Related reading" - articles from the library and papers from the
 * clinically reviewed catalog, retrieved for the current question.
 */
export function RelatedReading({ retrieval }: { retrieval: RetrievalResult }) {
  const { articles, papers } = retrieval;
  if (articles.length === 0 && papers.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <BookOpen className="size-4.5 text-primary" /> Related reading
        </h2>

        {articles.length > 0 && (
          <ul className="space-y-2.5">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/library/${a.slug}`}
                  className="block rounded-lg border p-3 transition-colors hover:border-primary/40 hover:bg-accent/50"
                >
                  <p className="font-medium text-sm leading-snug">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Library article · {a.minutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {papers.length > 0 && (
          <div className="space-y-2.5 border-t pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
              <Microscope className="size-3.5 text-plum" /> From the clinically reviewed catalog
            </p>
            <ul className="space-y-2.5">
              {papers.map((p) => {
                const url = sanitizeUrl(p.access_url);
                return (
                  <li key={p.title}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-plum/25 bg-plum-soft/40 p-3 transition-colors hover:border-plum/50"
                      >
                        <p className="font-medium text-sm leading-snug">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                          {p.journal_or_source} · {p.year} <ExternalLink className="size-3" />
                        </p>
                      </a>
                    ) : (
                      <p className="rounded-lg border p-3 font-medium text-sm leading-snug">{p.title}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
