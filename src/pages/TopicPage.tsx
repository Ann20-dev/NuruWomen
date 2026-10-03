import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, HeartHandshake, MessageCircleQuestion, Users } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { ArticleCard } from '@/components/nuru/ArticleCard';
import { EvidenceCardView } from '@/components/nuru/EvidenceCardView';
import { QuestionCard } from '@/components/nuru/QuestionCard';
import { EmptyState } from '@/components/nuru/EmptyState';
import { Reveal } from '@/components/nuru/Reveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNuruQuestions } from '@/hooks/useNuruQuestions';
import { articlesForTopic } from '@/data/articles';
import { evidenceCardsForTopic } from '@/data/evidenceCards';
import { EXPERIENCE_COUNTS, BLIND_SPOTS } from '@/data/blindspots';
import { getArea, getTopic, topicsForArea } from '@/lib/nuru/topics';
import { formatNumber } from '@/lib/nuru/format';
import NotFound from '@/pages/NotFound';

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? getTopic(slug) : undefined;
  const { data: questions } = useNuruQuestions();

  useSeoMeta({
    title: topic ? `${topic.name} — NuruWomen` : 'Topic — NuruWomen',
    description: topic?.blurb,
  });

  if (!topic) return <NotFound />;

  const area = getArea(topic.area);
  const articles = articlesForTopic(topic.slug);
  const evidence = evidenceCardsForTopic(topic.slug);
  const experienceCount = EXPERIENCE_COUNTS[topic.slug] ?? 0;
  const blindSpot = BLIND_SPOTS.find((b) => b.topic === topic.slug);
  const related = (questions ?? []).filter((q) => q.topics.includes(topic.slug));
  const siblings = topicsForArea(topic.area).filter((t) => t.slug !== topic.slug);

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <Link to="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← {area?.name ?? 'Library'}
          </Link>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight uppercase-wide">
            {topic.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{topic.blurb}</p>
          {blindSpot && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-gold">{formatNumber(blindSpot.count)} questions</span> asked
              about this topic this month · <span className="text-gold font-semibold">+{blindSpot.deltaPct}%</span>
            </p>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
          <div className="space-y-12">
            {/* Clinical overview */}
            <Reveal>
            <section className="space-y-4">
              <div className="border-b pb-2">
                <h2 className="font-display font-semibold text-2xl flex items-center gap-2">
                  <BookOpen className="size-5 text-plum" /> Clinical overview
                </h2>
                <p className="text-sm text-muted-foreground">Reviewed, source-linked education.</p>
              </div>
              {articles.length === 0 ? (
                <EmptyState message="A reviewed article for this topic is in the editorial queue." />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {articles.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              )}
            </section>
            </Reveal>

            {/* Common questions */}
            <Reveal>
            <section className="space-y-4">
              <div className="border-b pb-2">
                <h2 className="font-display font-semibold text-2xl flex items-center gap-2">
                  <MessageCircleQuestion className="size-5 text-primary" /> Common questions
                </h2>
                <p className="text-sm text-muted-foreground">Asked anonymously, answered in three layers.</p>
              </div>
              {related.length === 0 ? (
                <EmptyState message="No questions on this topic yet — yours could be the first." />
              ) : (
                <div className="space-y-4">
                  {related.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              )}
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/ask">Ask your own question <ArrowRight className="size-4" /></Link>
              </Button>
            </section>
            </Reveal>
          </div>

          <Reveal className="space-y-6 lg:sticky lg:top-24" delay={150}>
          <aside className="space-y-6">
            {/* Community experiences */}
            <Card className="border-clay/35 bg-clay-soft/50">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-clay" />
                  <h2 className="font-display font-semibold text-xl">Community experiences</h2>
                </div>
                <p className="font-display text-4xl font-semibold text-clay">{formatNumber(experienceCount)}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  community experiences illustrate {topic.name.toLowerCase()} — preserved as
                  experience, never presented as evidence.
                </p>
                <Button asChild size="sm" variant="outline" className="rounded-full bg-background border-clay/40 text-clay hover:bg-clay-soft">
                  <Link to={`/question/${related[0]?.id ?? ''}`} aria-disabled={!related[0]}>
                    <HeartHandshake className="size-3.5" /> Read their stories
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Evidence cards */}
            {evidence.length > 0 && (
              <div className="space-y-3">
                {evidence.map((card) => (
                  <EvidenceCardView key={card.slug} card={card} compact />
                ))}
              </div>
            )}
          </aside>
          </Reveal>
        </div>

        {/* Sibling topics */}
        {siblings.length > 0 && (
          <section className="space-y-3 border-t pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              More in {area?.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {siblings.map((t) => (
                <Link
                  key={t.slug}
                  to={`/topics/${t.slug}`}
                  className="rounded-full border bg-secondary/60 px-3.5 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
