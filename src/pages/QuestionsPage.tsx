import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleQuestion, Rss } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { QuestionCard } from '@/components/nuru/QuestionCard';
import { EmptyState, QuestionCardSkeleton } from '@/components/nuru/EmptyState';
import { Reveal } from '@/components/nuru/Reveal';
import { LottiePlayer } from '@/components/nuru/LottiePlayer';
import questionAnimation from '@/assets/lottie/question.json';
import { Button } from '@/components/ui/button';
import { useNuruQuestions } from '@/hooks/useNuruQuestions';
import { SEED_QUESTIONS } from '@/data/questions';
import { TOPICS } from '@/lib/nuru/topics';
import { countSimilarQuestions } from '@/lib/nuru/similar';
import { cn } from '@/lib/utils';

export default function QuestionsPage() {
  useSeoMeta({
    title: 'Community questions · NuruWomen',
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

  // Live similar-question counts, computed on-device for live threads that
  // carry no curated signal.
  const similarCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const q of questions ?? []) {
      if (q.isSeed || q.signal) continue;
      const count = countSimilarQuestions(q, questions ?? [], { excludeId: q.id });
      if (count > 0) map[q.id] = count;
    }
    return map;
  }, [questions]);

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight flex items-center gap-3">
              Community questions
              <LottiePlayer animationData={questionAnimation} className="size-9 sm:size-11 shrink-0" />
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Anonymous questions from women across the commons, each answered in three clearly separated
              layers. New questions appear here as they’re asked.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/ask"><MessageCircleQuestion className="size-4" /> Ask anonymously</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by topic">
          <button
            onClick={() => setTopic('all')}
            aria-pressed={topic === 'all'}
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
              aria-pressed={topic === t.slug}
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
          <EmptyState
            message="No questions in this topic yet. Be the first to ask, anonymously, in under a minute."
            action={
              <Button asChild className="rounded-full">
                <Link to="/ask"><MessageCircleQuestion className="size-4" /> Ask anonymously</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
              <Rss className="size-3.5" />
              {filtered.length} question{filtered.length === 1 ? '' : 's'}
              {topic !== 'all' && ' in this topic'} · newest first, alongside curated threads
            </p>
            {filtered.map((q, i) => (
              <Reveal key={q.id} delay={Math.min(i * 80, 400)}>
                <QuestionCard question={q} answerCount={seedAnswerCounts[q.id]} similarCount={similarCounts[q.id]} headingLevel="h2" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
