import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenCheck,
  Fingerprint,
  GitFork,
  KeyRound,
  MessageCircleQuestion,
  MessagesSquare,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { LayerBadge } from '@/components/nuru/LayerBadge';
import { AnswerCard } from '@/components/nuru/AnswerCard';
import { EvidenceCardView } from '@/components/nuru/EvidenceCardView';
import { CommunitySignal } from '@/components/nuru/CommunitySignal';
import { TopicChips } from '@/components/nuru/TopicChips';
import { SEED_QUESTIONS } from '@/data/questions';
import { evidenceCardBySlug } from '@/data/evidenceCards';
import { BLIND_SPOTS } from '@/data/blindspots';
import { AREAS } from '@/lib/nuru/topics';
import { formatNumber, timeAgo } from '@/lib/nuru/format';

const DEMO_QUESTION = SEED_QUESTIONS[0];
const DEMO_EVIDENCE = evidenceCardBySlug(DEMO_QUESTION.evidenceCard ?? '');

export default function Index() {
  useSeoMeta({
    title: 'Nuru Commons — Women’s Health Commons Africa',
    description:
      'A privacy-first, open women’s health knowledge commons for Africa. Anonymous questions, lived experience and clinically reviewed evidence — clearly separated on Nostr.',
  });

  const topBlindSpots = [...BLIND_SPOTS].sort((a, b) => b.count - a.count).slice(0, 6);
  const maxCount = topBlindSpots[0]?.count ?? 1;

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="texture-glow border-b overflow-hidden">
        <div className="container py-16 sm:py-24 grid gap-12 lg:grid-cols-[1.15fr_1fr] items-center">
          <div className="space-y-7 animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              <ShieldCheck className="size-3.5" />
              Privacy-first · Open source · Built on Nostr
            </p>
            <h1 className="font-display font-semibold text-[2.6rem] leading-[1.05] sm:text-6xl tracking-tight">
              What were you <em className="text-primary not-italic underline decoration-gold decoration-4 underline-offset-8">never taught</em> about your body?
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Nuru Commons is a women’s health knowledge commons for Africa — where you can ask sensitive
              questions anonymously, hear other women’s lived experience, and read clinically reviewed
              evidence, with each kind of knowledge clearly labelled and never blurred together.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full text-base px-6">
                <Link to="/ask">
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
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Fingerprint className="size-4 text-primary" /> No email, phone or ID required</span>
              <span className="inline-flex items-center gap-1.5"><KeyRound className="size-4 text-primary" /> Your identity stays yours</span>
              <span className="inline-flex items-center gap-1.5"><GitFork className="size-4 text-primary" /> Forkable public good</span>
            </div>
          </div>

          {/* Hero visual: the three layers, stacked */}
          <div className="relative hidden lg:block animate-fade-in" aria-hidden>
            <div className="absolute inset-0 texture-dots rounded-3xl" />
            <div className="relative space-y-4 p-2">
              <Card className="rotate-[-1.5deg] shadow-lg border-clay/40">
                <CardContent className="p-5 space-y-2">
                  <LayerBadge layer="lived-experience" />
                  <p className="font-display text-lg leading-snug">“I lived through this. Here is what happened to me.”</p>
                  <p className="text-xs text-muted-foreground">Shared, believed, and clearly marked as experience — not advice.</p>
                </CardContent>
              </Card>
              <Card className="rotate-[1deg] shadow-lg border-clinical/40 ml-8">
                <CardContent className="p-5 space-y-2">
                  <LayerBadge layer="clinical-response" />
                  <p className="font-display text-lg leading-snug">“Here is what clinical guidance says — and what to ask next.”</p>
                  <p className="text-xs text-muted-foreground">Verified professionals, manually checked against professional registers.</p>
                </CardContent>
              </Card>
              <Card className="rotate-[-0.5deg] shadow-lg border-plum/40 ml-3">
                <CardContent className="p-5 space-y-2">
                  <LayerBadge layer="evidence-card" />
                  <p className="font-display text-lg leading-snug">Structured evidence. Sources, red flags, review date — signed.</p>
                  <p className="text-xs text-muted-foreground">Portable Nostr events any app can read, verify and reuse.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why three layers ─────────────────────────────── */}
      <section className="container py-16 sm:py-24">
        <div className="max-w-2xl space-y-4 mb-12">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Three kinds of knowledge. <span className="text-primary">Never confused.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The problem isn’t that women lack health information — it’s that medical evidence, personal
            experience, misinformation and advertising all arrive looking the same. Nuru keeps them apart,
            on purpose.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              layer: 'lived-experience' as const,
              title: 'Lived experience',
              body: '“I have endometriosis and this is what happened to me.” Real women, real stories — honoured as experience, never dressed up as medical fact.',
              Icon: MessagesSquare,
              accent: 'text-clay',
              bg: 'bg-clay-soft',
            },
            {
              layer: 'clinical-response' as const,
              title: 'Clinical response',
              body: '“According to current clinical guidance, these symptoms can have several causes…” Verified health professionals, clearly badged, education not diagnosis.',
              Icon: Stethoscope,
              accent: 'text-clinical',
              bg: 'bg-clinical-soft',
            },
            {
              layer: 'evidence-card' as const,
              title: 'Evidence card',
              body: 'Structured, reviewed summaries: common causes, red flags, what to ask your clinician, sources and the date of the last medical review.',
              Icon: BookOpenCheck,
              accent: 'text-plum',
              bg: 'bg-plum-soft',
            },
          ].map(({ layer, title, body, Icon, accent, bg }) => (
            <Card key={layer} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <span className={`inline-flex size-11 items-center justify-center rounded-xl ${bg} ${accent}`}>
                  <Icon className="size-5.5" />
                </span>
                <div className="space-y-2">
                  <LayerBadge layer={layer} />
                  <h3 className="font-display font-semibold text-xl">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A doctor may say a side effect is uncommon while 200 women describe living it. Both matter.
          One is clinical evidence; the other is a signal worth investigating. We preserve both — without
          ever mixing them up.
        </p>
      </section>

      {/* ── Live demo thread ─────────────────────────────── */}
      <section className="border-y bg-secondary/40">
        <div className="container py-16 sm:py-24">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">A real thread, one question</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              Watch the three layers answer together
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
            <div className="space-y-5">
              {/* The question */}
              <Card className="border-primary/30 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Anonymous question · {timeAgo(DEMO_QUESTION.createdAt)}
                    </span>
                    <TopicChips slugs={DEMO_QUESTION.topics} />
                  </div>
                  <h3 className="font-display font-semibold text-xl leading-snug">{DEMO_QUESTION.title}</h3>
                  <p className="leading-relaxed text-[0.97rem]">{DEMO_QUESTION.content}</p>
                </CardContent>
              </Card>

              {/* Lived experience layer */}
              <div className="space-y-3">
                <LayerBadge layer="lived-experience" />
                {DEMO_QUESTION.answers.filter((a) => a.type === 'lived-experience').slice(0, 1).map((a) => (
                  <AnswerCard
                    key={a.id}
                    answer={{ ...a, isSeed: true }}
                    questionId={DEMO_QUESTION.id}
                    helpfulCount={0}
                  />
                ))}
              </div>

              {/* Clinical layer */}
              <div className="space-y-3">
                <LayerBadge layer="clinical-response" />
                {DEMO_QUESTION.answers.filter((a) => a.type === 'clinical-response').slice(0, 1).map((a) => (
                  <AnswerCard
                    key={a.id}
                    answer={{ ...a, isSeed: true }}
                    questionId={DEMO_QUESTION.id}
                    helpfulCount={0}
                  />
                ))}
              </div>

              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/question/${DEMO_QUESTION.id}`}>
                  Read the full thread <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-5">
              {DEMO_EVIDENCE && <EvidenceCardView card={DEMO_EVIDENCE} compact />}
              {DEMO_QUESTION.signal && (
                <CommunitySignal
                  similarCount={DEMO_QUESTION.signal.similarCount}
                  insight={DEMO_QUESTION.signal.insight}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Blind Spots preview ──────────────────────────── */}
      <section className="container py-16 sm:py-24 grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Women’s Health Blind Spots</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            We don’t just answer one woman. <span className="text-gold">We measure what women were never taught.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every anonymous question is classified and counted — in aggregate, never individually. What
            emerges is a live map of the questions the health system keeps failing to explain, useful to
            educators, clinicians, NGOs and county health teams.
          </p>
          <Button asChild className="rounded-full" variant="outline">
            <Link to="/blind-spots">
              <TrendingUp className="size-4" />
              Open the Blind Spot dashboard
            </Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Questions this month · aggregate only
            </p>
            <div className="space-y-3">
              {topBlindSpots.map((s) => (
                <Link key={s.topic} to={`/topics/${s.topic}`} className="block group">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{s.label}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {formatNumber(s.count)} · <span className="text-gold font-semibold">+{s.deltaPct}%</span>
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all"
                      style={{ width: `${Math.round((s.count / maxCount) * 100)}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Published only above a minimum group size (k ≥ 25). No small groups, no individuals, no locations.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── Library across the lifecycle ─────────────────── */}
      <section className="border-y bg-card">
        <div className="container py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="max-w-xl space-y-3">
              <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
                The knowledge library, across a woman’s whole life
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From first periods to healthy ageing — clinician-reviewed, source-linked, and exportable
                as open knowledge packs.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/library">Browse all topics <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/library?area=${area.slug}`}
                className="group rounded-xl border bg-background p-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{area.name}</h3>
                {area.swahili && <p className="text-xs text-gold font-medium mt-0.5">{area.swahili}</p>}
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{area.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Identity & privacy ───────────────────────────── */}
      <section className="container py-16 sm:py-24">
        <div className="max-w-2xl space-y-4 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Identity without exposure</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Ask without handing yourself over
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nostr identities are cryptographic keys, not platform accounts. A woman can ask
            “is pain during sex normal?” without surrendering her name, number or email to anyone —
            including us.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: Fingerprint,
              title: 'Temporary identity',
              body: 'One tap generates a throwaway keypair that exists only for this question. When you leave, there is no account to leak, hack or subpoena.',
            },
            {
              Icon: KeyRound,
              title: 'Your keys, your identity',
              body: 'Already on Nostr? Sign in with a browser signer (NIP-07) — your private key never touches this site. Keep a persistent pseudonym if you want a community presence.',
            },
            {
              Icon: Users,
              title: 'Verified professionals',
              body: 'Clinicians are verified manually against professional registers, then badged. Cryptography proves the key; our process proves the profession. Neither pretends to do the other’s job.',
            },
          ].map(({ Icon, title, body }) => (
            <Card key={title}>
              <CardContent className="p-6 space-y-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5.5" />
                </span>
                <h3 className="font-display font-semibold text-xl">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-destructive/25">
          <CardContent className="p-5 sm:p-6 flex items-start gap-3">
            <ShieldCheck className="size-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Honest limits:</strong> public relays are public. Nuru strips
              names, numbers and locations before anything is signed, publishes statistics only in safe
              aggregates, and never puts medical records on relays. Anonymity here is strong — but no web
              platform should ever promise perfect anonymity, and we won’t.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="container pb-4">
        <div className="rounded-3xl bg-primary text-primary-foreground px-6 py-14 sm:px-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 texture-dots" aria-hidden />
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
      </section>
    </SiteLayout>
  );
}
