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
  Users,
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
import { SectionHeader } from '@/components/nuru/SectionHeader';
import { AnimatedWords } from '@/components/nuru/AnimatedWords';
import { HeroScene } from '@/components/nuru/hero/HeroScene';
import { PhotoFigure } from '@/components/nuru/PhotoFigure';
import { TrendingArt } from '@/components/nuru/art/TrendingArt';
import { LottiePlayer } from '@/components/nuru/LottiePlayer';
import { CountUp } from '@/components/nuru/CountUp';
import { KitengeDivider } from '@/components/nuru/art/KitengeDivider';
import { type TopicArtKind } from '@/components/nuru/art/TopicArt';
import { TrendingStrip } from '@/components/nuru/TrendingTopics';
import { currentMonthLabel } from '@/lib/nuru/format';
import heartPulseAnimation from '@/assets/lottie/heart-pulse.json';
import { SEED_QUESTIONS } from '@/data/questions';
import { evidenceCardBySlug } from '@/data/evidenceCards';
import { BLIND_SPOT_TOTAL } from '@/data/blindspots';
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { uiLocale } from '@/lib/nuru/i18n';
import { getArea } from '@/lib/nuru/topics';
import { timeAgo } from '@/lib/nuru/format';

const EXAMPLE_QUESTION = SEED_QUESTIONS[0];
const EXAMPLE_EVIDENCE = evidenceCardBySlug(EXAMPLE_QUESTION.evidenceCard ?? '');
const EXAMPLE_LIVED = EXAMPLE_QUESTION.answers.find((a) => a.type === 'lived-experience');
const EXAMPLE_CLINICAL = EXAMPLE_QUESTION.answers.find((a) => a.type === 'clinical-response');

const TOPIC_TILES: { art: TopicArtKind; area: string }[] = [
  { art: 'menstrual-health', area: 'menstrual-health' },
  { art: 'sexual-health', area: 'sexual-health' },
  { art: 'healthy-ageing', area: 'healthy-ageing' },
  { art: 'postpartum', area: 'postpartum' },
  { art: 'mental-health', area: 'mental-health' },
];

const TOPIC_PHOTOS: Record<TopicArtKind, { src: string; alt: string }> = {
  'menstrual-health': {
    src: '/images/topic-menstrual.jpg',
    alt: 'A woman resting with a hot water bottle during her menstrual cycle',
  },
  'sexual-health': {
    src: '/images/topic-sexual.jpg',
    alt: 'A healthcare professional speaking with a patient in a clinic',
  },
  'healthy-ageing': {
    src: '/images/topic-ageing.jpg',
    alt: 'An older woman smiling outdoors in natural light',
  },
  postpartum: {
    src: '/images/topic-postpartum.jpg',
    alt: 'A mother holding her newborn baby close',
  },
  'mental-health': {
    src: '/images/topic-mental.jpg',
    alt: 'A woman taking a quiet moment for her mental wellbeing',
  },
};

export default function Index() {
  useSeoMeta({
    title: 'NuruWomen · Women’s Health Commons Africa',
    description:
      'A privacy-first, open women’s health knowledge commons for Africa. Anonymous questions, lived experience and evidence, clearly separated, never mixed up.',
  });

  const [askHover, setAskHover] = useState(false);
  const { t, lang } = useUiLanguage();
  const heroHighlights = t('hero.titleHighlights').split(',').map((w) => w.trim()).filter(Boolean);

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative border-b overflow-hidden">
        {/* Pattern backdrop - African-inspired, low opacity */}
        <div className="absolute inset-0 pattern-bg-wine pointer-events-none" aria-hidden />
        {/* Organic blobs behind illustration - removes flat emptiness */}
        <div className="absolute -top-20 left-10 size-[40rem] rounded-full bg-gold/20 blur-3xl animate-drift" aria-hidden />
        <div className="absolute -bottom-24 right-10 size-[32rem] rounded-full bg-terracotta/15 blur-2xl animate-float-slow" aria-hidden />
        <div className="absolute -top-48 right-8 size-[48rem] rounded-full bg-plum/10 blur-4xl animate-float" aria-hidden />

        <div className="container relative py-14 sm:py-20 lg:py-24 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center z-10">
          <div className="relative space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary animate-rise">
              <ShieldCheck className="size-3.5" />
              {t('hero.badge')}
            </p>
            <h1 className="font-display font-semibold text-[2.6rem] leading-[1.05] sm:text-6xl tracking-tight">
              <AnimatedWords text={t('hero.title')} highlight={heroHighlights} highlightClassName="hero-word" />
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.55s' }}>
              {t('hero.subtitle')}
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
                  {t('hero.ask')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base px-6 bg-card">
                <Link to="/library">
                  {t('hero.explore')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            {/* Quiet reassurance, not feature cards */}
            <div className="flex flex-wrap gap-x-7 gap-y-2 pt-2 text-[0.82rem] text-muted-foreground/90 animate-fade-in" style={{ animationDelay: '0.85s' }}>
              <span className="inline-flex items-center gap-1.5"><Fingerprint className="size-3.5 text-primary/70" /> {t('hero.reassure1')}</span>
              <span className="inline-flex items-center gap-1.5"><KeyRound className="size-3.5 text-primary/70" /> {t('hero.reassure2')}</span>
              <span className="inline-flex items-center gap-1.5"><GitFork className="size-3.5 text-primary/70" /> {t('hero.reassure3')}</span>
            </div>
          </div>

          {/* The knowledge object - slightly entering the headline's space */}
          <div className="relative">
            <HeroScene askHover={askHover} className="lg:-ml-14" />
            {/* Hero photograph: real women in warm conversation, with a subtle
                 plum overlay so any overlaid text stays readable. Aligned with
                 the content column and consistent with the rest of the UI. */}
            <PhotoFigure
              src="/images/hero-women.jpg"
              alt="Two women in warm conversation, smiling in natural light"
              width={560}
              height={374}
              className="shadow-warm mt-4 lg:mt-0 max-w-none"
              rounded-xl
              overlay
              cover
            />
          </div>
        </div>
      </section>

      <KitengeDivider />

      {/* ── Example thread ─────────────────────────────── */}
      <section className="border-y bg-secondary/40">
        <div className="container py-16 sm:py-24">
          <Reveal>
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{t('home.exampleKicker')}</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              {t('home.exampleTitle')}
            </h2>
          </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
            <Reveal className="space-y-5">
              {/* One card, three layers - separated by shading and labels */}
              <Card className="overflow-hidden border-primary/25 shadow-md">
                <CardContent className="p-0">
                  {/* The question */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Anonymous question · {timeAgo(EXAMPLE_QUESTION.createdAt)}
                      </span>
                      <TopicChips slugs={EXAMPLE_QUESTION.topics} />
                    </div>
                    <h3 className="font-display font-semibold text-xl leading-snug">{EXAMPLE_QUESTION.title}</h3>
                    <p className="leading-relaxed text-[0.97rem]">{EXAMPLE_QUESTION.content}</p>
                  </div>

                  {/* Lived experience band */}
                  {EXAMPLE_LIVED && (
                    <div className="space-y-4 border-t border-clay/20 border-l-4 border-l-clay/70 bg-clay-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="lived-experience" />
                      <AuthorLine
                        pubkey={EXAMPLE_LIVED.authorPubkey}
                        name={EXAMPLE_LIVED.authorName}
                        role={EXAMPLE_LIVED.role}
                        experienceTag={EXAMPLE_LIVED.experienceTag}
                        createdAt={EXAMPLE_LIVED.createdAt}
                      />
                      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{EXAMPLE_LIVED.text}</p>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <LayerDisclaimer layer="lived-experience" />
                        <HelpfulButton
                          targetId={EXAMPLE_LIVED.id}
                          targetPubkey={EXAMPLE_LIVED.authorPubkey}
                          targetKind={1}
                          questionId={EXAMPLE_QUESTION.id}
                          count={EXAMPLE_LIVED.helpful}
                        />
                      </div>
                    </div>
                  )}

                  {/* Clinical response band */}
                  {EXAMPLE_CLINICAL && (
                    <div className="space-y-4 border-t border-clinical/20 border-l-4 border-l-clinical/70 bg-clinical-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="clinical-response" />
                      <AuthorLine
                        pubkey={EXAMPLE_CLINICAL.authorPubkey}
                        name={EXAMPLE_CLINICAL.authorName}
                        role={EXAMPLE_CLINICAL.role}
                        createdAt={EXAMPLE_CLINICAL.createdAt}
                      />
                      <p className="leading-relaxed text-[0.97rem] whitespace-pre-wrap">{EXAMPLE_CLINICAL.text}</p>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <LayerDisclaimer layer="clinical-response" />
                        <HelpfulButton
                          targetId={EXAMPLE_CLINICAL.id}
                          targetPubkey={EXAMPLE_CLINICAL.authorPubkey}
                          targetKind={1}
                          questionId={EXAMPLE_QUESTION.id}
                          count={EXAMPLE_CLINICAL.helpful}
                        />
                      </div>
                    </div>
                  )}

                  {/* Evidence band */}
                  {EXAMPLE_EVIDENCE && (
                    <div className="space-y-3 border-t border-plum/20 border-l-4 border-l-plum/70 bg-plum-soft/50 p-6 sm:p-7">
                      <LayerBadge layer="evidence-card" />
                      <h4 className="font-display font-semibold text-lg leading-snug">{EXAMPLE_EVIDENCE.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{EXAMPLE_EVIDENCE.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        Clinical review: {EXAMPLE_EVIDENCE.reviewer} · {EXAMPLE_EVIDENCE.reviewedAt}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/question/${EXAMPLE_QUESTION.id}`}>
                  {t('home.readThread')} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>

            <Reveal className="space-y-5" delay={180}>
              {EXAMPLE_QUESTION.signal && (
                <CommunitySignal
                  similarCount={EXAMPLE_QUESTION.signal.similarCount}
                  insight={EXAMPLE_QUESTION.signal.insight}
                />
              )}
              <p className="text-sm text-muted-foreground leading-relaxed px-1">
                {t('home.layersNote')}{' '}
                <Link to="/about" className="text-primary font-medium hover:underline">{t('home.howItWorks')}</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Five topics, illustrated ─────────────────────── */}
      <section className="container py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 items-center mb-12">
          <Reveal className="space-y-3 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{t('home.areasKicker')}</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              {t('home.areasTitle')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('home.areasBody')}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <PhotoFigure
              src="/images/areas-hero.jpg"
              alt="Women across life stages, standing together in natural light"
              width={467}
              height={350}
              className="shadow-warm"
              rounded-xl
              cover
            />
          </Reveal>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          {TOPIC_TILES.map((tile, i) => {
            const area = getArea(tile.area);
            const name = lang === 'sw' ? (area?.swahili ?? area?.name ?? tile.area) : (area?.name ?? tile.area);
            const photo = TOPIC_PHOTOS[tile.art];
            return (
              <Reveal key={tile.art} delay={Math.min(i * 90, 360)}>
                <Link
                  to={`/library?area=${tile.area}`}
                  className="group block rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
                >
                  {photo && (
                    <PhotoFigure
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={267}
                      className="shadow-sm"
                      rounded-xl
                      cover
                    />
                  )}
                  <span className="block p-3.5 text-sm font-semibold text-center transition-colors group-hover:text-primary">
                    {name}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Community & care ────────────────────────────── */}
      <section className="container py-16 sm:py-20 border-y">
        <div className="space-y-3 mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
            <Users className="size-3.5" /> {t('home.communityKicker')}
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            {t('home.communityTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('home.communityBody')}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PhotoFigure
            src="/images/hero-group.jpg"
            alt="Three women sharing a joyful moment together outdoors"
            width={400}
            height={300}
            className="shadow-warm"
            rounded-xl
            cover
          />
          <PhotoFigure
            src="/images/community-women.jpg"
            alt="Four women in vibrant African dresses sharing a conversation outdoors"
            width={400}
            height={300}
            className="shadow-warm"
            rounded-xl
            cover
          />
          <PhotoFigure
            src="/images/women-learning.jpg"
            alt="Women collaborating together on a laptop indoors"
            width={400}
            height={300}
            className="shadow-warm"
            rounded-xl
            cover
          />
        </div>
      </section>

      {/* ── Most discussed this month ────────────────────── */}
      <section className="container pb-16 sm:pb-24">
        <Reveal>
          <SectionHeader
            kicker={`${t('home.trendingKicker')} · ${currentMonthLabel(uiLocale(lang))}`}
            heading={t('home.trendingTitle')}
            description={t('home.trendingSubtitle')}
            illustration={<TrendingArt className="w-48 h-32 sm:w-64 sm:h-40" />}
          />
          <div className="mt-6 rounded-2xl border border-gold/30 bg-gold-soft/40 px-6 py-7 sm:px-9 sm:py-8 space-y-4">
            <TrendingStrip />
            <div className="mt-4 pt-3 border-t border-gold/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
                {t('home.trendingNote')}
              </p>
              <Link
                to="/blind-spots"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {t('home.trendingCta')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            {/* Plain-language takeaway from aggregate signals */}
            <div className="mt-4 rounded-xl border border-gold/30 bg-gold-soft/30 p-4 sm:p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold inline-flex items-center gap-1.5">
                <TrendingUp className="size-3.5" /> {t('home.takeawayKicker')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
                {t('home.takeawayBody')}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <KitengeDivider />

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
                  <CountUp value={BLIND_SPOT_TOTAL} /> {t('home.coverageCount')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('home.coverageSub')}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {t('home.coverageCta')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="container pb-4">
        <Reveal>
        <div className="relative rounded-3xl px-6 py-14 sm:px-14 text-center space-y-6 overflow-hidden">
          {/* Richer burgundy gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(346_48%_30%)] to-[hsl(346_48%_22%)] text-primary-foreground" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-bg-gold opacity-40 pointer-events-none" aria-hidden />
          <div className="absolute inset-0 opacity-20 texture-dots" aria-hidden />
          {/* Glow blobs */}
          <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-primary-foreground/10 blur-3xl animate-drift" aria-hidden />
          <div className="absolute -bottom-48 right-[10%] size-[24rem] rounded-full bg-gold/20 blur-3xl animate-float-slow" aria-hidden />
          <LottiePlayer animationData={heartPulseAnimation} className="relative mx-auto size-16 glow-pulse" />
          <h2 className="relative font-display font-semibold text-3xl sm:text-5xl tracking-tight max-w-2xl mx-auto leading-tight">
            {t('home.ctaTitle')}
          </h2>
          <p className="relative text-lg text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
            {t('home.ctaBody')}
          </p>
          {/* Photograph: woman in warm, hopeful light */}
          <PhotoFigure
            src="/images/cta-woman.jpg"
            alt="Woman standing in warm natural light, looking hopeful"
            width={520}
            height={347}
            className="relative shadow-warm"
            rounded-xl
            cover
          />
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full text-base px-7 shadow-glow">
              <Link to="/ask">
                <MessageCircleQuestion className="size-5" />
                {t('home.ctaAsk')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base px-7 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20 shadow-glow">
              <Link to="/questions">{t('home.ctaBrowse')}</Link>
            </Button>
          </div>
        </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
