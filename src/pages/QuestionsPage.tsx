import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleQuestion, Rss } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { QuestionCard } from '@/components/nuru/QuestionCard';
import { EmptyState, QuestionCardSkeleton } from '@/components/nuru/EmptyState';
import { Button } from '@/components/ui/button';
import { useNuruQuestions } from '@/hooks/useNuruQuestions';
import { SEED_QUESTIONS } from '@/data/questions';
import { TOPICS } from '@/lib/nuru/topics';
import { cn } from '@/lib/utils';

export default function QuestionsPage() {
  useSeoMeta({
    title: 'Community questions — Nuru Commons',
    description: 'Anonymous women’s health questions answered through three separated layers: lived experience, clinical response and evidence.',
  });

  const { data: questions, isLoading } = useNuruQuestions();
  const [topic, setTopic] = useState<string>('all');

  const filtered = useMemo(() => {
    if (!questions) return [];
    if (topic === 'all') return questions;
    return questions.filter((q) => q.topics.includes(topic));
  }, [questions, topic]);

  const seedAnswerCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const q of SEED_QUESTIONS) map[q.id] = q.answers.length;
    return map;
  }, []);

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Community questions</h1>
            <p className="text-muted-foreground leading-relaxed">
              Anonymous questions from women across the commons — each answered in three clearly separated
              layers. Live questions stream in from Nostr relays.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/ask"><MessageCircleQuestion className="size-4" /> Ask anonymously</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by topic">
          <button
            onClick={() => setTopic('all')}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              topic === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/60 hover:bg-accent',
            )}
          >
            All topics
          </button>
          {TOPICS.map((t) => (
            <button
              key={t.slug}
              onClick={() => setTopic(t.slug)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                topic === t.slug ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/60 hover:bg-accent',
              )}
            >
              {t.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState message="No questions in this topic yet. Be the first to ask — anonymously, in under a minute." />
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
              <Rss className="size-3.5" />
              {filtered.length} question{filtered.length === 1 ? '' : 's'}
              {topic !== 'all' && ' in this topic'} · live events merged with curated threads
            </p>
            {filtered.map((q) => (
              <QuestionCard key={q.id} question={q} answerCount={seedAnswerCounts[q.id]} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
