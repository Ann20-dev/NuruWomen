import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { WomenCircleArt } from '@/components/nuru/art/WomenCircleArt';
import { ClinicianArt } from '@/components/nuru/art/ClinicianArt';
import { EvidenceArt } from '@/components/nuru/art/EvidenceArt';

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
  return <SiteLayout><div className="container py-10 sm:py-14 max-w-5xl space-y-8">
    <h1 className="font-display text-3xl sm:text-4xl font-semibold">About NuruWomen</h1>
    <p className="text-lg text-muted-foreground">Nuru means light in Kiswahili. The project explores how women in Kenya and across Africa can access clearer health information while keeping community stories, professional education and evidence in separate layers.</p>
    <div className="grid md:grid-cols-3 gap-4">{LAYERS.map(({ art: Art, title, body }) => <Card key={title} className="overflow-hidden"><Art /><CardContent className="p-5 space-y-3"><h2 className="font-display text-xl font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{body}</p></CardContent></Card>)}</div>
    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">Five areas of health</h2><p>Menstrual health, sexual health, healthy ageing, postpartum health and mental health. Every question is automatically sorted into these areas; anything unclear is reviewed by a person, not a machine.</p></section>
    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">What NuruWomen does</h2><ul className="list-disc pl-5 space-y-2 text-muted-foreground"><li>Checks every question for privacy and safety before it is published.</li><li>Works in English and Kiswahili.</li><li>Publishes questions and answers anonymously — no accounts, ever.</li><li>Links every topic to recent clinical research.</li><li>Maps where reliable women's health data exists — and where it's missing — across 53 African countries.</li></ul></section>
    <section className="space-y-3"><h2 className="font-display text-2xl font-semibold">Your privacy</h2><p className="text-muted-foreground">Questions are published anonymously — no account, no name, nothing stored that points back to you. Public posts can't be taken back, and automatic scans can miss things, so please never share medical records or identifying details. No online service can promise perfect anonymity.</p></section>
    <section id="volunteer" className="space-y-3"><h2 className="font-display text-2xl font-semibold">What we're building toward</h2><p className="text-muted-foreground">Verified clinician accounts, full Kiswahili review, and careful human moderation — so every answer can one day come from someone whose training we have checked. <Link to="/research" className="text-primary underline">Browse the research</Link> that guides us today.</p></section>
    <p><Link to="/ask" className="text-primary underline">Ask a question</Link></p>
  </div></SiteLayout>;
}
