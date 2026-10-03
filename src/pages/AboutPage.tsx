import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  BookOpenCheck,
  Download,
  GitFork,
  HeartHandshake,
  KeyRound,
  Lock,
  MessagesSquare,
  ShieldCheck,
  Stethoscope,
  ThumbsUp,
  Users,
} from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { Reveal } from '@/components/nuru/Reveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CLINICIANS } from '@/data/clinicians';

const VOLUNTEER_ROLES = [
  { role: 'Doctors', work: 'Clinical content review and evidence card sign-off' },
  { role: 'Nurses & midwives', work: 'Health-education responses on questions' },
  { role: 'Pharmacists', work: 'Medication education and side-effect guidance' },
  { role: 'Nutritionists', work: 'Evidence-based nutrition guidance' },
  { role: 'Mental-health professionals', work: 'Psychological wellbeing education' },
  { role: 'Community Health Promoters', work: 'Local service navigation and referral' },
  { role: 'Researchers', work: 'Evidence summaries and source curation' },
  { role: 'Women with lived experience', work: 'Peer support and first-person knowledge' },
  { role: 'Translators', work: 'Kiswahili and local-language accessibility' },
  { role: 'Moderators', work: 'Safety, privacy and community standards' },
];

const NEVER_PUBLIC = ['Medical records', 'Names', 'Phone numbers', 'Addresses', 'Diagnosis reports', 'Lab results', 'ID numbers', 'Detailed private history'];
const PUBLIC_LIST = ['Anonymous questions', 'Reviewed health articles', 'Clinical attestations', 'Health education', 'Labelled community answers', 'Aggregate blind-spot statistics'];

export default function AboutPage() {
  useSeoMeta({
    title: 'How it works — Nuru Commons',
    description: 'The model behind Nuru Commons: three clearly separated kinds of knowledge, privacy-first identity, verified clinicians, and knowledge anyone can reuse.',
  });

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-16 max-w-5xl">
        {/* Intro */}
        <Reveal>
        <div className="max-w-2xl space-y-4">
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight">
            Not another health app. <span className="text-primary">Knowledge infrastructure.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuru Commons (<em>nuru</em> — “light” in Kiswahili) is an open, privacy-first women’s health
            knowledge commons for Africa. Women ask sensitive questions anonymously, share lived experience,
            and receive clearly labelled peer and professional answers — while the platform measures, in
            aggregate, what the health system is failing to explain.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It is deliberately <strong>not</strong> a period tracker, a fertility app, a telemedicine platform,
            an AI doctor, or another health blog. The AI here removes your identifiers and clusters questions —
            humans remain responsible for medical interpretation.
          </p>
        </div>
        </Reveal>

        {/* Three layers */}
        <Reveal>
        <section className="space-y-6">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">The Three-Layer Answer</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { Icon: MessagesSquare, color: 'text-clay', bg: 'bg-clay-soft', title: 'Lived experience', body: '“I have endometriosis and this is what happened to me.” Always labelled: personal experience, not medical advice.' },
              { Icon: Stethoscope, color: 'text-clinical', bg: 'bg-clinical-soft', title: 'Clinical response', body: 'Education from manually verified professionals. Labelled with their role, and always distinguished from a personal consultation.' },
              { Icon: BookOpenCheck, color: 'text-plum', bg: 'bg-plum-soft', title: 'Evidence card', body: 'Structured summaries: causes, red flags, questions for your clinician, sources, and the date of last medical review.' },
            ].map(({ Icon, color, bg, title, body }) => (
              <Card key={title}>
                <CardContent className="p-6 space-y-3">
                  <span className={`inline-flex size-11 items-center justify-center rounded-xl ${bg} ${color}`}>
                    <Icon className="size-5.5" />
                  </span>
                  <h3 className="font-display font-semibold text-xl">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            A clinician may say a side effect is uncommon while hundreds of women describe living it. That
            doesn’t make the women a clinical trial — but it may reveal something worth investigating.
            The platform preserves both forms of knowledge without confusing them.
          </p>
        </section>
        </Reveal>

        {/* Privacy architecture */}
        <Reveal>
        <section className="space-y-6">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">The privacy architecture</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="border-clinical/35 bg-clinical-soft/40">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="size-5 text-clinical" /> Public by design
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {PUBLIC_LIST.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-clinical shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lock className="size-5 text-destructive" /> Never public
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {NEVER_PUBLIC.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-destructive shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2"><KeyRound className="size-5 text-primary" /> Identity without surrender</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nuru is built on Nostr, an open network no single company owns. Your identity is a private
                  key that stays on your device — not an account we hold. Ask with a one-time anonymous
                  identity — no email, phone or ID — or keep a consistent nickname. Browser extensions let
                  existing users sign in without this site ever seeing their private key.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2"><BadgeCheck className="size-5 text-clinical" /> Clinician verification, honestly</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A username on the internet does <em>not</em> prove someone is a doctor.
                  Clinicians here are verified manually against professional registers (KMPDC, Nursing Council
                  of Kenya, PPB) and then badged. Technology proves who posted; our process proves the profession.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        </Reveal>

        {/* Verified panel */}
        <Reveal>
        <section className="space-y-6">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">The clinical review panel <span className="text-sm font-sans font-normal text-muted-foreground">(demo registry)</span></h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CLINICIANS.map((c) => (
              <Card key={c.pubkey} className="border-clinical/30">
                <CardContent className="p-5 space-y-1.5">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-clinical font-medium">{c.role}</p>
                  <p className="text-xs text-muted-foreground">{c.org}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                    <BadgeCheck className="size-3.5 text-clinical" /> Verified {c.verifiedSince}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            On the live network this registry is published openly, so any app can read the same list of
            verified clinicians. The people shown here are demo personas illustrating the model.
          </p>
        </section>
        </Reveal>

        {/* Reputation */}
        <Reveal>
        <section className="space-y-6">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">Reputation, not likes</h2>
          <Card>
            <CardContent className="p-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="text-muted-foreground leading-relaxed max-w-xl text-[0.95rem]">
                A viral answer isn’t necessarily a correct one. Nuru replaces popularity with provenance:
                answers earn “Helpful” votes, carry evidence links, and show clinician review — so trust
                is earned by accuracy, not applause.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-secondary/60 px-3 py-1 text-xs font-semibold"><ThumbsUp className="size-3.5" /> Helpful · 142</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-plum-soft text-plum px-3 py-1 text-xs font-semibold">Evidence-linked ✓</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-clinical-soft text-clinical px-3 py-1 text-xs font-semibold">Clinician-reviewed ✓</span>
              </div>
            </CardContent>
          </Card>
        </section>
        </Reveal>

        {/* Volunteers */}
        <Reveal>
        <section id="volunteer" className="space-y-6 scroll-mt-24">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">Who makes this work</h2>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {VOLUNTEER_ROLES.map((v) => (
              <li key={v.role} className="border-t border-border pt-4 space-y-1">
                <p className="font-semibold text-sm flex items-center gap-2">
                  <HeartHandshake className="size-4 text-primary" /> {v.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.work}</p>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Every answer displays the responder’s role, so “a nurse’s education” and “a sister’s experience”
            are never ambiguous. Want to volunteer? <Link to="/questions" className="text-primary font-medium hover:underline">Start by sharing what you know</Link> —
            clinical verification happens offline before any badge is issued.
          </p>
        </section>
        </Reveal>

        {/* Open knowledge */}
        <Reveal>
        <section className="space-y-6">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">A digital public good</h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                Icon: Download,
                title: 'Open export',
                body: 'Reviewed knowledge exports as Markdown, JSON and open data packs any clinic, community health promoter or NGO can reuse — even offline.',
              },
              {
                Icon: GitFork,
                title: 'Make it yours',
                body: 'Start a Women’s Health Commons for Kenya, Uganda or Nigeria: swap referral directories, languages and guidelines without rebuilding anything.',
              },
              {
                Icon: Users,
                title: 'Portable',
                body: 'Questions, answers, labels and reviews use an open standard, so other apps can read and build on the same format — documented for developers in NIP.md.',
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="border-t-2 border-primary/40 pt-6 space-y-3">
                <span className="inline-flex items-center gap-2 text-primary">
                  <Icon className="size-5" />
                  <span className="text-xs font-bold uppercase tracking-[0.12em]">{title}</span>
                </span>
                <p className="text-muted-foreground leading-relaxed text-[0.97rem]">{body}</p>
              </div>
            ))}
          </div>
        </section>
        </Reveal>

        {/* Honest limits */}
        <Reveal>
        <Card className="border-destructive/25">
          <CardContent className="p-6 space-y-3">
            <h2 className="font-display font-semibold text-xl flex items-center gap-2">
              <ShieldCheck className="size-5 text-destructive" /> Honest limits
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              <li>· No web platform offers perfect anonymity: the open network can see when something was posted, and private messages are not perfectly future-proof. We say so plainly.</li>
              <li>· Nothing here is medical advice or diagnosis. Red-flag symptoms are routed to urgent care, not to the crowd.</li>
              <li>· Blind-spot statistics are aggregate-only with minimum group sizes — no small-community exposure.</li>
              <li>· Kenya’s Data Protection Act treats health data as sensitive personal data. Our answer is architectural: don’t collect it in the first place.</li>
            </ul>
          </CardContent>
        </Card>
        </Reveal>

        <Reveal>
        <div className="flex flex-wrap gap-3 pb-4">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/ask">Ask anonymously</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/blind-spots">See the blind spots</Link>
          </Button>
        </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
