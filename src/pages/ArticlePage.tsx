import { Link, useParams } from 'react-router-dom';
import { BadgeCheck, CalendarCheck2, Clock3, Download, ExternalLink } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { EvidenceCardView } from '@/components/nuru/EvidenceCardView';
import { QuestionCard } from '@/components/nuru/QuestionCard';
import { TopicChips } from '@/components/nuru/TopicChips';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { articleBySlug, articlesForArea } from '@/data/articles';
import { evidenceCardsForTopic } from '@/data/evidenceCards';
import { SEED_QUESTIONS } from '@/data/questions';
import { getArea } from '@/lib/nuru/topics';
import { sanitizeUrl } from '@/lib/utils';
import { ArticleCard } from '@/components/nuru/ArticleCard';
import NotFound from '@/pages/NotFound';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleBySlug(slug) : undefined;
  const { toast } = useToast();

  useSeoMeta({
    title: article ? `${article.title} — NuruWomen` : 'Article — NuruWomen',
    description: article?.summary,
  });

  if (!article) return <NotFound />;

  const area = getArea(article.area);
  const evidence = article.topics.flatMap((t) => evidenceCardsForTopic(t)).slice(0, 1);
  const relatedQuestions = SEED_QUESTIONS.filter((q) => q.topics.some((t) => article.topics.includes(t))).slice(0, 2);
  const relatedArticles = articlesForArea(article.area).filter((a) => a.slug !== article.slug).slice(0, 3);

  const exportMarkdown = () => {
    const lines: string[] = [
      `# ${article.title}`,
      '',
      `> ${article.summary}`,
      '',
      `Area: ${area?.name ?? article.area} · Author ${article.reviewer} (${article.reviewerRole}), ${article.reviewedAt}`,
      '',
    ];
    for (const s of article.sections) {
      if (s.heading) lines.push(`## ${s.heading}`, '');
      for (const p of s.paragraphs ?? []) lines.push(p, '');
      for (const li of s.list ?? []) lines.push(`- ${li}`);
      if (s.list) lines.push('');
    }
    lines.push('## Sources');
    for (const s of article.sources) lines.push(`- [${s.label}](${s.url})`);
    lines.push('', '---', 'Exported from NuruWomen — open women’s health knowledge. Educational only.');

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Article downloaded', description: 'Share it, translate it, reuse it.' });
  };

  return (
    <SiteLayout>
      <article className="container py-10 sm:py-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <Link to="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Library
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="text-primary">{area?.name}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1"><Clock3 className="size-3" />{article.minutes} min read</span>
            </div>
            <h1 className="font-display font-semibold text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{article.summary}</p>
            <TopicChips slugs={article.topics} />
          </div>

          {/* Review attestation */}
          <Card className="border-clinical/35 bg-clinical-soft/40">
            <CardContent className="p-4 sm:p-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-clinical">
                <BadgeCheck className="size-4.5" /> Clinically reviewed
              </span>
              <span className="text-sm text-muted-foreground">
                {article.reviewer} · {article.reviewerRole}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarCheck2 className="size-4" /> {article.reviewedAt}
              </span>
              <Button variant="outline" size="sm" onClick={exportMarkdown} className="ml-auto rounded-full bg-background">
                <Download className="size-3.5" /> Export .md
              </Button>
            </CardContent>
          </Card>

          {/* Body */}
          <div className="space-y-8">
            {article.sections.map((section, i) => (
              <section key={i} className="space-y-4">
                {section.heading && (
                  <h2 className="font-display font-semibold text-2xl tracking-tight pt-2">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className={`leading-[1.75] text-[1.05rem] ${i === 0 && j === 0 ? 'drop-cap' : ''}`}
                  >
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 pl-5 list-disc text-[1.05rem] leading-relaxed marker:text-primary">
                    {section.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Sources */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sources & further reading</h2>
              <ul className="space-y-1.5">
                {article.sources.map((s) => {
                  const url = sanitizeUrl(s.url);
                  return (
                    <li key={s.label}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2"
                        >
                          {s.label} <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        <span className="text-sm">{s.label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="text-xs text-muted-foreground border-t pt-3">
                Educational content. It cannot replace personal medical advice —
                if symptoms worry you, see a clinician.
              </p>
            </CardContent>
          </Card>

          {/* Evidence card */}
          {evidence[0] && (
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-2xl">The evidence card</h2>
              <EvidenceCardView card={evidence[0]} compact />
            </div>
          )}

          {/* Community questions */}
          {relatedQuestions.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-2xl">What women are asking</h2>
              {relatedQuestions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={{
                    id: q.id,
                    title: q.title,
                    content: q.content,
                    topics: q.topics,
                    authorPubkey: q.authorPubkey,
                    authorName: q.authorName,
                    createdAt: q.createdAt,
                    isSeed: true,
                    evidenceCard: q.evidenceCard,
                    signal: q.signal,
                  }}
                  answerCount={q.answers.length}
                />
              ))}
            </div>
          )}

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-2xl">Keep reading</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
