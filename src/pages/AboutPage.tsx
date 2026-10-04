import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, GitFork, Languages, ShieldCheck, Stethoscope } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { WomenCircleArt } from '@/components/nuru/art/WomenCircleArt';
import { ClinicianArt } from '@/components/nuru/art/ClinicianArt';
import { EvidenceArt } from '@/components/nuru/art/EvidenceArt';
import { CLINICIANS } from '@/data/clinicians';

const LAYERS: { art: () => ReactElement; title: string; body: string }[] = [
  {
    art: () => <WomenCircleArt className="w-full aspect-[3/2]" />,
    title: 'Lived experience',
    body: 'Personal stories show the community layer. They are shared experiences, not medical advice.',
  },
  {
    art: () => <ClinicianArt className="w-full aspect-[3/2]" />,
    title: 'Clinical responses',
    body: 'Answers written with clinicians. Live clinician verification is still being built.',
  },
  {
    art: () => <EvidenceArt className="w-full aspect-[3/2]" />,
    title: 'Evidence',
    body: 'Structured educational articles and the research catalogue, reviewed by the clinical panel. They cannot replace personal medical advice.',
  },
];

export default function AboutPage() {
  useSeoMeta({ title: 'About — NuruWomen', description: 'An English and Kiswahili women’s health knowledge commons for Kenya and beyond.' });
  return <SiteLayout><div className="container py-10 sm:py-14 max-w-5xl space-y-12">
    <div className="space-y-3">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">About NuruWomen</h1>
      <p className="text-lg text-muted-foreground">Nuru means light in Kiswahili. The project explores how women in Kenya and across Africa can access clearer health information while keeping community stories, professional education and evidence in separate layers.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-4">{LAYERS.map(({ art: Art, title, body }) => <Card key={title} className="overflow-hidden"><Art /><CardContent className="p-5 space-y-3"><h2 className="font-display text-xl font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{body}</p></CardContent></Card>)}</div>

    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">Five areas of health</h2><p>Menstrual health, sexual health, healthy ageing, postpartum health and mental health. Every question is automatically sorted into these areas; anything unclear is reviewed by a person, not a machine.</p></section>
    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">What NuruWomen does</h2><ul className="list-disc pl-5 space-y-2 text-muted-foreground"><li>Checks every question for privacy and safety before it is published.</li><li>Works in English and Kiswahili.</li><li>Publishes questions and answers anonymously — no accounts, ever.</li><li>Links every topic to recent clinical research.</li><li>Maps where reliable women's health data exists — and where it's missing — across 53 African countries.</li><li>Gathers upcoming women's health events — screenings, webinars and circles — on one open calendar.</li></ul></section>
    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">Your privacy</h2><p className="text-muted-foreground">Questions are published anonymously — no account, no name, nothing stored that points back to you. Images you attach are stripped of hidden metadata (location, device) before upload. Public posts can't be taken back, and automatic scans can miss things, so please never share medical records or identifying details. No online service can promise perfect anonymity.</p></section>

    {/* Verified clinical panel */}
    <section id="clinicians" className="space-y-5">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-clinical inline-flex items-center gap-1.5">
          <Stethoscope className="size-4" /> Verified clinical panel
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">Doctors must be verified — here is what that means</h2>
        <p className="text-muted-foreground leading-relaxed">
          No one can call themselves a clinician on the commons by signing up. Every professional is
          checked by a person against official registers — the Kenya Medical Practitioners and Dentists
          Council (KMPDC), the Nursing Council of Kenya, the Pharmacy and Poisons Board, or the
          equivalent register in their country — before their answers carry the teal clinical label.
          Self-declared titles, usernames and profile links are never accepted as proof.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLINICIANS.map((c) => (
          <Card key={c.pubkey} className="border-clinical/25">
            <CardContent className="p-5 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-semibold text-lg leading-snug">{c.name}</h3>
                <BadgeCheck className="size-5 shrink-0 text-clinical" aria-label="Verified clinician" />
              </div>
              <p className="text-sm font-medium text-clinical">{c.role}</p>
              <p className="text-sm text-muted-foreground">{c.specialty}</p>
              <p className="text-xs text-muted-foreground pt-1 border-t border-clinical/15">
                {c.org} · Register checked, verified {c.verifiedSince}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed border-clinical/35 bg-clinical-soft/30">
          <CardContent className="p-5 space-y-2.5 h-full flex flex-col justify-center">
            <h3 className="font-display font-semibold text-lg">Are you a health professional?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Volunteer an hour a week. After a register check, your answers carry the clinical
              label and help someone who has waited years to ask.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-clinical/25">
        <CardContent className="p-5 flex items-start gap-3">
          <ShieldCheck className="size-5 text-clinical shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How verification works:</strong> a clinician shares
            their registration number privately with the review team; the team confirms it against
            the official register; only then is their public key added to the verified-clinician
            registry (a NIP-51 list published by the commons authority key). Clients treat the
            registry — never self-labelling — as the source of the clinical badge.
          </p>
        </CardContent>
      </Card>
    </section>

    {/* Translations */}
    <section id="translate" className="space-y-4">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold inline-flex items-center gap-1.5">
          <Languages className="size-4" /> Every African language
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">Built in English and Kiswahili — ready for your language</h2>
        <p className="text-muted-foreground leading-relaxed">
          Today the interface and the analysis rules work in English and Kiswahili. The commons is
          open source, and translations are one of the most valuable contributions anyone can make:
          every screen string lives in one dictionary file
          (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/lib/nuru/i18n.ts</code>),
          and the keyword rules that sort questions live alongside it. Add your language — Yoruba,
          Hausa, Amharic, Igbo, Shona, isiZulu, French, Arabic — and the language switcher picks it
          up automatically. No machine translation is used; every language is reviewed by a speaker.
        </p>
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
          <GitFork className="size-4 shrink-0" />
          Fork the project, translate the dictionary, open a pull request.
        </p>
      </div>
    </section>

    <section id="volunteer" className="space-y-3"><h2 className="font-display text-2xl font-semibold">What we're building toward</h2><p className="text-muted-foreground">Verified clinician accounts, full Kiswahili review, and careful human moderation — so every answer can one day come from someone whose training we have checked. <Link to="/research" className="text-primary underline">Browse the research</Link> that guides us today.</p></section>
    <p><Link to="/ask" className="text-primary underline">Ask a question</Link></p>
  </div></SiteLayout>;
}
