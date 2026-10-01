import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Fingerprint,
  GitFork,
  KeyRound,
  MessageCircleQuestion,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { LayerBadge, LayerDisclaimer } from '@/components/nuru/LayerBadge';
import { AuthorLine } from '@/components/nuru/AuthorLine';
import { HelpfulButton } from '@/components/nuru/HelpfulButton';
import { CommunitySignal } from '@/components/nuru/CommunitySignal';
import { TopicChips } from '@/components/nuru/TopicChips';
import { Reveal } from '@/components/nuru/Reveal';
import { AnimatedWords } from '@/components/nuru/AnimatedWords';
import { HeroScene } from '@/components/nuru/hero/HeroScene';
import { LottiePlayer } from '@/components/nuru/LottiePlayer';
import { CountUp } from '@/components/nuru/CountUp';
import heartPulseAnimation from '@/assets/lottie/heart-pulse.json';
import { SEED_QUESTIONS } from '@/data/questions';
import { evidenceCardBySlug } from '@/data/evidenceCards';
import { BLIND_SPOT_TOTAL } from '@/data/blindspots';
import { timeAgo } from '@/lib/nuru/format';

const DEMO_QUESTION = SEED_QUESTIONS[0];
const DEMO_EVIDENCE = evidenceCardBySlug(DEMO_QUESTION.evidenceCard ?? '');
const DEMO_LIVED = DEMO_QUESTION.answers.find((a) => a.type === 'lived-experience');
const DEMO_CLINICAL = DEMO_QUESTION.answers.find((a) => a.type === 'clinical-response');

export default function Index() {
  useSeoMeta({
    title: 'Nuru Commons — Women’s Health Commons Africa',
    description:
      'A privacy-first, open women’s health knowledge commons for Africa. Anonymous questions, lived experience and clinically reviewed evidence — clearly separated, never mixed up.',
  });

  const [askHover, setAskHover] = useState(false);

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative texture-glow border-b overflow-hidden">
        <div className="container relative py-14 sm:py-20 lg:py-24 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="relative z-10 space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary animate-rise">
              <ShieldCheck className="size-3.5" />
              Private by design · Free &amp; open · Community owned
            </p>
            <h1 className="font-display font-semibold text-[2.6rem] leading-[1.05] sm:text-6xl tracking-tight">
              <AnimatedWords text="What were you never taught about your body?" highlight={['never', 'taught']} highlightClassName="hero-word" />
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.55s' }}>
              Ask sensitive health questions anonymously. Get real stories from women who’ve lived it
              and answers checked by clinicians — clearly labelled, never mixed up.
            </p>
            <div className="flex flex-wrap items-center gap-3 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Button asChild size="lg" className="rounded-full text-base px-6">
                <Link
                  to="/ask"
                  onMouseEnter={() => setAskHover(true)}
                  onMouseLeave={() => setAskHover(false)}
                  onFocus={() => setAskHover(true)}
                  onBlur={() => setAskHover(false)}
                >
                  <MessageCircleQuestion className="size-5" />
                  Ask anonymously
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base px-6 bg-card">
                <Link to="/library">
                  Explore the library
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            {/* Quiet reassurance, not feature cards */}
            <div className="flex flex-wrap gap-x-7 gap-y-2 pt-2 text-[0.82rem] text-muted-foreground/90 animate-fade-in" style={{ animationDelay: '0.85s' }}>
              <span className="inline-flex items-center gap-1.5"><Fingerprint className="size-3.5 text-primary/70" /> No email, phone or ID required</span>
              <span className="inline-flex items-center gap-1.5"><KeyRound className="size-3.5 text-primary/70" /> Your identity stays yours</span>
              <span className="inline-flex items-center gap-1.5"><GitFork className="size-3.5 text-primary/70" /> Open for anyone to build on</span>
            </div>
          </div>

          {/* The knowledge object — slightly entering the headline's space */}
          <HeroScene askHover={askHover} className="lg:-ml-14" />
        </div>
      </section>

      {/* ── Live demo thread ─────────────────────────────── */}
      <section className="border-y bg-secondary/40">
        <div className="container py-16 sm:py-24">
          <Reveal>
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">A real thread</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              One question, three kinds of answers
            </h2>
          </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
            <Reveal className="space-y-5">
              {/* One card, three layers — separated by shading and labels */}
              <Card className="overflow-hidden border-primary/25 shadow-md">
                <CardContent className="p-0">
                  {/* The question */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Anonymous question · {timeAgo(DEMO_QUESTION.createdAt)}
                      </span>
                      <TopicChips slugs={DEMO_QUESTION.topics} />
                    </div>
                    <h3 className="font-display font-semibold text-xl leading-snug">{DEMO_QUESTION.title}</h3>
                    <p className="leading-relaxed text-[0.97rem]">{DEMO_QUESTION.content}</p>
                  </div>

                  {/* Lived experience band */}
                  {DEMO_LIVED && (
                    <div className="space-y-4 border-t border-clay/20 border-l-4 border-l-clay/70 bg-clay-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="lived-experience" />
                      <AuthorLine
                        pubkey={DEMO_LIVED.authorPubkey}
                        name={DEMO_LIVED.authorName}
                        role={DEMO_LIVED.role}
                        experienceTag={DEMO_LIVED.experienceTag}
                        createdAt={DEMO_LIVED.createdAt}
                      />
                      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{DEMO_LIVED.text}</p>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <LayerDisclaimer layer="lived-experience" />
                        <HelpfulButton
                          targetId={DEMO_LIVED.id}
                          targetPubkey={DEMO_LIVED.authorPubkey}
                          targetKind={1}
                          questionId={DEMO_QUESTION.id}
                          count={DEMO_LIVED.helpful}
                        />
                      </div>
                    </div>
                  )}

                  {/* Clinical response band */}
                  {DEMO_CLINICAL && (
                    <div className="space-y-4 border-t border-clinical/20 border-l-4 border-l-clinical/70 bg-clinical-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="clinical-response" />
                      <AuthorLine
                        pubkey={DEMO_CLINICAL.authorPubkey}
                        name={DEMO_CLINICAL.authorName}
                        role={DEMO_CLINICAL.role}
                        createdAt={DEMO_CLINICAL.createdAt}
                      />
                      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{DEMO_CLINICAL.text}</p>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <LayerDisclaimer layer="clinical-response" />
                        <HelpfulButton
                          targetId={DEMO_CLINICAL.id}
                          targetPubkey={DEMO_CLINICAL.authorPubkey}
                          targetKind={1}
                          questionId={DEMO_QUESTION.id}
                          count={DEMO_CLINICAL.helpful}
                        />
                      </div>
                    </div>
                  )}

                  {/* Evidence band */}
                  {DEMO_EVIDENCE && (
                    <div className="space-y-3 border-t border-plum/20 border-l-4 border-l-plum/70 bg-plum-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="evidence-card" />
                      <h4 className="font-display font-semibold text-lg leading-snug">{DEMO_EVIDENCE.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{DEMO_EVIDENCE.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        Reviewed by {DEMO_EVIDENCE.reviewer} · {DEMO_EVIDENCE.reviewedAt}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/question/${DEMO_QUESTION.id}`}>
                  Read the full thread <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>

            <Reveal className="space-y-5" delay={180}>
              {DEMO_QUESTION.signal && (
                <CommunitySignal
                  similarCount={DEMO_QUESTION.signal.similarCount}
                  insight={DEMO_QUESTION.signal.insight}
                />
              )}
              <p className="text-sm text-muted-foreground leading-relaxed px-1">
                Stories stay stories. Clinical answers stay clinical. Evidence stays sourced.{' '}
                <Link to="/about" className="text-primary font-medium hover:underline">How it works</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Blind Spots teaser ───────────────────────────── */}
      <section className="border-y bg-card">
        <Reveal className="container py-10 sm:py-12">
          <Link to="/blind-spots" className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                <TrendingUp className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-xl sm:text-2xl leading-snug">
                  <CountUp value={BLIND_SPOT_TOTAL} /> anonymous questions this month
                </p>
                <p className="text-sm text-muted-foreground">
                  Counted together, never individually — a live map of what women were never taught.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              See the Blind Spot dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="container pb-4">
        <Reveal>
        <div className="rounded-3xl bg-primary text-primary-foreground px-6 py-14 sm:px-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 texture-dots" aria-hidden />
          <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-primary-foreground/10 blur-3xl animate-drift" aria-hidden />
          <div className="absolute -bottom-48 right-[10%] size-[24rem] rounded-full bg-gold/20 blur-3xl animate-float-slow" aria-hidden />
          <LottiePlayer animationData={heartPulseAnimation} className="relative mx-auto size-16" />
          <h2 className="relative font-display font-semibold text-3xl sm:text-5xl tracking-tight max-w-2xl mx-auto leading-tight">
            Ask the question you’ve been carrying.
          </h2>
          <p className="relative text-lg text-primary-foreground/85 max-w-xl mx-auto leading-relaxed">
            Anonymously, in English or Kiswahili, answered by women who’ve lived it and professionals who’ve studied it.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full text-base px-7">
              <Link to="/ask">
                <MessageCircleQuestion className="size-5" />
                Ask anonymously
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base px-7 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/questions">See what women are asking</Link>
            </Button>
          </div>
        </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
