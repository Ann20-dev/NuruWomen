import { useMemo, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { CoverageHeatmap } from '@/components/nuru/CoverageHeatmap';
import { KenyaHealthChart } from '@/components/nuru/KenyaHealthChart';
import { PhoneInfoArt } from '@/components/nuru/art/PhoneInfoArt';
import { Card, CardContent } from '@/components/ui/card';
import coverage from '@/data/researchCoverage.json';

const LEVEL_WORDS: Record<number, string> = { 0: 'Gap', 1: 'Some data', 2: 'Well covered' };

export default function BlindSpotsPage() {
  useSeoMeta({ title: 'Research coverage — NuruWomen', description: 'Where reliable women’s health data exists across Africa — and where the gaps are.' });
  const [country, setCountry] = useState('Kenya');
  const countries = useMemo(() => [...new Set(coverage.detail.map(r => r.country))].sort(), []);
  const totalRecords = useMemo(() => coverage.summary.reduce((sum, row) => sum + row.records, 0), []);
  return <SiteLayout><div className="container py-10 sm:py-14 space-y-10">
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-widest text-gold font-bold">Knowledge Gap Observatory</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Where the answers are missing</h1>
      <p className="text-lg text-muted-foreground">Some health questions are easy to answer with good research. Others barely have any. This map shows how much reliable information exists for each topic, in each country — and where women are still left without answers.</p>
    </div>

    <PhoneInfoArt className="w-full max-w-3xl rounded-xl border" />

    <CoverageHeatmap />

    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm text-left"><caption className="text-left p-4 font-semibold">Coverage by topic</caption>
        <thead className="bg-secondary"><tr>{['Topic','Countries covered','Share','Data points','Source'].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
        <tbody>{coverage.summary.map(row => <tr key={row.mvp_topic} className="border-t"><th className="p-3 font-medium">{row.mvp_topic}</th><td className="p-3">{row.countries_covered} of {row.total_countries}</td><td className="p-3">{row.coverage_pct}%</td><td className="p-3">{row.records.toLocaleString()}</td><td className="p-3 max-w-xs">{row.is_proxy ? 'Research estimate, ages 15–24' : 'World Health Organization'}</td></tr>)}</tbody>
      </table>
    </div>

    <Card><CardContent className="p-5 sm:p-7 space-y-5">
      <div className="space-y-1.5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Kenya in focus</p>
        <h2 className="font-display text-2xl font-semibold">What the numbers say about Kenyan women</h2>
        <p className="text-sm text-muted-foreground">The latest World Health Organization figures for the topics this commons covers.</p>
      </div>
      <KenyaHealthChart />
    </CardContent></Card>

    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <Card><CardContent className="p-5 space-y-4">
        <label htmlFor="coverage-country" className="font-semibold block">Explore a country</label>
        <select id="coverage-country" value={country} onChange={e => setCountry(e.target.value)} className="rounded-lg border bg-background px-3 py-2">{countries.map(c => <option key={c}>{c}</option>)}</select>
        <div className="grid sm:grid-cols-2 gap-3">{coverage.detail.filter(row => row.country === country).map(row => <div key={row.mvp_topic} className="rounded-lg border p-4"><h2 className="font-semibold">{row.mvp_topic}</h2><p className="text-sm mt-2">{row.records.toLocaleString()} data points</p><p className="text-xs text-muted-foreground mt-1">{LEVEL_WORDS[row.level] ?? 'Gap'}</p></div>)}</div>
      </CardContent></Card>

      <Card><CardContent className="p-5 space-y-3">
        <h2 className="font-display text-xl font-semibold">How to read the map</h2>
        <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
          <li><strong className="text-foreground">Dark:</strong> well covered — several reliable studies found</li>
          <li><strong className="text-foreground">Lighter:</strong> some data, but thin</li>
          <li><strong className="text-foreground">Pale:</strong> a gap — nothing reliable found yet</li>
        </ul>
        <p className="text-sm text-muted-foreground">Behind every cell are real records from the World Health Organization — {totalRecords.toLocaleString()} in total. Menstrual health has no global indicator at all, so it relies on research estimates. That absence is exactly the kind of blind spot this page exists to show.</p>
      </CardContent></Card>
    </div>

    <Card><CardContent className="p-5 space-y-3"><h2 className="font-display text-xl font-semibold">What's next</h2><p className="text-sm text-muted-foreground">A privacy-first dashboard of the questions women actually ask is on the way. It will only ever show large groups — never a single person or a single question.</p></CardContent></Card>
  </div></SiteLayout>;
}
