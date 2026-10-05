import { useMemo, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Flame } from 'lucide-react';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { CoverageHeatmap } from '@/components/nuru/CoverageHeatmap';
import { KenyaHealthChart } from '@/components/nuru/KenyaHealthChart';
import { PhoneInfoArt } from '@/components/nuru/art/PhoneInfoArt';
import { TrendingBoard } from '@/components/nuru/TrendingTopics';
import { currentMonthLabel } from '@/lib/nuru/format';
import { Card, CardContent } from '@/components/ui/card';
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { uiLocale, type UiKey } from '@/lib/nuru/i18n';
import { areaDisplayName } from '@/lib/nuru/topics';
import coverage from '@/data/researchCoverage.json';

const LEVEL_KEYS: Record<number, UiKey> = { 0: 'coverage.level0', 1: 'coverage.level1', 2: 'coverage.level2' };

export default function BlindSpotsPage() {
  useSeoMeta({ title: 'Research coverage — NuruWomen', description: 'Where reliable women’s health data exists across Africa — and where the gaps are.' });
  const { t, lang } = useUiLanguage();
  const locale = uiLocale(lang);
  const [country, setCountry] = useState('Kenya');
  const countries = useMemo(() => [...new Set(coverage.detail.map(r => r.country))].sort(), []);
  const totalRecords = useMemo(() => coverage.summary.reduce((sum, row) => sum + row.records, 0), []);
  const topicName = (name: string) => areaDisplayName(name, lang);

  return <SiteLayout><div className="container py-10 sm:py-14 space-y-10">
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-widest text-gold font-bold">{t('coverage.kicker')}</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">{t('coverage.title')}</h1>
      <p className="text-lg text-muted-foreground">{t('coverage.subtitle')}</p>
    </div>

    <PhoneInfoArt className="w-full max-w-3xl rounded-xl border" />

    <CoverageHeatmap />

    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm text-left"><caption className="text-left p-4 font-semibold">{t('coverage.tableCaption')}</caption>
        <thead className="bg-secondary"><tr>{[t('coverage.colTopic'), t('coverage.colCountries'), t('coverage.colShare'), t('coverage.colRecords'), t('coverage.colSource')].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
        <tbody>{coverage.summary.map(row => <tr key={row.mvp_topic} className="border-t"><th className="p-3 font-medium">{topicName(row.mvp_topic)}</th><td className="p-3">{row.countries_covered} {t('coverage.of')} {row.total_countries}</td><td className="p-3">{row.coverage_pct}%</td><td className="p-3">{row.records.toLocaleString()}</td><td className="p-3 max-w-xs">{row.is_proxy ? t('coverage.sourceProxy') : t('coverage.sourceWho')}</td></tr>)}</tbody>
      </table>
    </div>

    <Card><CardContent className="p-5 sm:p-7 space-y-5">
      <div className="space-y-1.5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{t('coverage.kenyaKicker')}</p>
        <h2 className="font-display text-2xl font-semibold">{t('coverage.kenyaTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('coverage.kenyaSubtitle')}</p>
      </div>
      <KenyaHealthChart />
    </CardContent></Card>

    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <Card><CardContent className="p-5 space-y-4">
        <label htmlFor="coverage-country" className="font-semibold block">{t('coverage.exploreCountry')}</label>
        <select id="coverage-country" value={country} onChange={e => setCountry(e.target.value)} className="rounded-lg border bg-background px-3 py-2">{countries.map(c => <option key={c}>{c}</option>)}</select>
        <div className="grid sm:grid-cols-2 gap-3">{coverage.detail.filter(row => row.country === country).map(row => <div key={row.mvp_topic} className="rounded-lg border p-4"><h2 className="font-semibold">{topicName(row.mvp_topic)}</h2><p className="text-sm mt-2">{row.records.toLocaleString()} {t('coverage.dataPoints')}</p><p className="text-xs text-muted-foreground mt-1">{t(LEVEL_KEYS[row.level] ?? 'coverage.level0')}</p></div>)}</div>
      </CardContent></Card>

      <Card><CardContent className="p-5 space-y-3">
        <h2 className="font-display text-xl font-semibold">{t('coverage.howToTitle')}</h2>
        <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
          <li><strong className="text-foreground">{t('coverage.howToDark')}</strong> {t('coverage.howToDarkBody')}</li>
          <li><strong className="text-foreground">{t('coverage.howToMid')}</strong> {t('coverage.howToMidBody')}</li>
          <li><strong className="text-foreground">{t('coverage.howToPale')}</strong> {t('coverage.howToPaleBody')}</li>
        </ul>
        <p className="text-sm text-muted-foreground">{t('coverage.howToBody1')} {totalRecords.toLocaleString()} {t('coverage.howToBody2')}</p>
      </CardContent></Card>
    </div>

    <section className="space-y-5">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs uppercase tracking-widest text-gold font-bold inline-flex items-center gap-1.5">
          <Flame className="size-4" /> {t('home.trendingKicker')} · {currentMonthLabel(locale)}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t('coverage.trendingTitle')}</h2>
        <p className="text-muted-foreground">{t('coverage.trendingBody')}</p>
      </div>
      <TrendingBoard />
      <Card><CardContent className="p-5 space-y-2">
        <h3 className="font-semibold text-sm">{t('coverage.whyTitle')}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t('coverage.whyBody')}</p>
      </CardContent></Card>
    </section>
  </div></SiteLayout>;
}
