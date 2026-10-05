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
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import type { UiKey } from '@/lib/nuru/i18n';

const LAYERS: { art: () => ReactElement; titleKey: UiKey; bodyKey: UiKey }[] = [
  {
    art: () => <WomenCircleArt className="w-full aspect-[3/2]" />,
    titleKey: 'layer.lived',
    bodyKey: 'about.livedBody',
  },
  {
    art: () => <ClinicianArt className="w-full aspect-[3/2]" />,
    titleKey: 'layer.clinical',
    bodyKey: 'about.clinicalBody',
  },
  {
    art: () => <EvidenceArt className="w-full aspect-[3/2]" />,
    titleKey: 'layer.evidence',
    bodyKey: 'about.evidenceBody',
  },
];

const WHAT_KEYS: UiKey[] = ['about.what1', 'about.what2', 'about.what3', 'about.what4', 'about.what5', 'about.what6'];

export default function AboutPage() {
  useSeoMeta({ title: 'About — NuruWomen', description: 'An English and Kiswahili women’s health knowledge commons for Kenya and beyond.' });
  const { t } = useUiLanguage();

  return <SiteLayout><div className="container py-10 sm:py-14 max-w-5xl space-y-12">
    <div className="space-y-3">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">{t('about.title')}</h1>
      <p className="text-lg text-muted-foreground">{t('about.intro')}</p>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      {LAYERS.map(({ art: Art, titleKey, bodyKey }) => (
        <Card key={titleKey} className="overflow-hidden">
          <Art />
          <CardContent className="p-5 space-y-3">
            <h2 className="font-display text-xl font-semibold">{t(titleKey)}</h2>
            <p className="text-sm text-muted-foreground">{t(bodyKey)}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{t('about.areasTitle')}</h2>
      <p>{t('about.areasBody')}</p>
    </section>

    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{t('about.whatTitle')}</h2>
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
        {WHAT_KEYS.map((k) => <li key={k}>{t(k)}</li>)}
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{t('about.privacyTitle')}</h2>
      <p className="text-muted-foreground">{t('about.privacyBody')}</p>
    </section>

    {/* Verified clinical panel */}
    <section id="clinicians" className="space-y-5">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-clinical inline-flex items-center gap-1.5">
          <Stethoscope className="size-4" /> {t('about.cliniciansKicker')}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t('about.cliniciansTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('about.cliniciansBody')}</p>
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
                {c.org} · {t('about.registerChecked')} {c.verifiedSince}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed border-clinical/35 bg-clinical-soft/30">
          <CardContent className="p-5 space-y-2.5 h-full flex flex-col justify-center">
            <h3 className="font-display font-semibold text-lg">{t('about.volunteerCardTitle')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('about.volunteerCardBody')}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-clinical/25">
        <CardContent className="p-5 flex items-start gap-3">
          <ShieldCheck className="size-5 text-clinical shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{t('about.howVerification')}</strong>{' '}
            {t('about.verificationBody')}
          </p>
        </CardContent>
      </Card>
    </section>

    {/* Translations */}
    <section id="translate" className="space-y-4">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold inline-flex items-center gap-1.5">
          <Languages className="size-4" /> {t('about.translateKicker')}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t('about.translateTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('about.translateBody1')}{' '}
          (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/lib/nuru/i18n.ts</code>)
          {t('about.translateBody2')}
        </p>
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
          <GitFork className="size-4 shrink-0" />
          {t('about.translateFork')}
        </p>
      </div>
    </section>

    <section id="volunteer" className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{t('about.buildingTitle')}</h2>
      <p className="text-muted-foreground">
        {t('about.buildingBody')}{' '}
        <Link to="/research" className="text-primary underline">{t('about.buildingLink')}</Link>{' '}
        {t('about.buildingAfter')}
      </p>
    </section>
    <p><Link to="/ask" className="text-primary underline">{t('common.askQuestion')}</Link></p>
  </div></SiteLayout>;
}
