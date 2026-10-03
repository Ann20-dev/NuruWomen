import { useMemo, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { ExternalLink } from 'lucide-react';
import { SiteLayout } from '@/components/nuru/SiteLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import library from '@/data/researchLibrary.json';
import { sanitizeUrl } from '@/lib/utils';

export default function ResearchPage() {
  useSeoMeta({ title: 'Research catalogue — NuruWomen', description: 'Imported research references from 2020 onward across five women’s health topics.' });
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const papers = useMemo(() => library.papers.filter(p => p.year >= 2020 && (topic === 'all' || p.topic === topic) && `${p.title} ${p.journal_or_source}`.toLowerCase().includes(query.toLowerCase())), [topic, query]);
  return <SiteLayout><div className="container py-10 sm:py-14 space-y-6">
    <h1 className="font-display text-3xl sm:text-4xl font-semibold">Research catalogue</h1>
    <p className="max-w-3xl text-muted-foreground">{library.papers.length} clinically reviewed references guiding every topic. Each entry links to the original publication.</p>
    <div className="flex flex-wrap gap-3"><Input aria-label="Search research titles" placeholder="Search a title or journal" value={query} onChange={e => setQuery(e.target.value)} className="max-w-lg" /><select aria-label="Filter research topic" value={topic} onChange={e => setTopic(e.target.value)} className="rounded-lg border bg-background px-3 py-2"><option value="all">All five topics</option>{library.topics.map(t => <option key={t} value={t}>{t.replaceAll('_',' ')}</option>)}</select></div>
    <p className="text-sm text-muted-foreground" aria-live="polite">{papers.length} matching references</p>
    <div className="grid sm:grid-cols-2 gap-4">{papers.map(p => { const url = sanitizeUrl(p.access_url); return <Card key={p.title}><CardContent className="p-5 space-y-3"><p className="text-xs text-primary uppercase">{p.topic.replaceAll('_',' ')} · {p.year}</p><h2 className="font-display font-semibold text-lg">{p.title}</h2><p className="text-sm">{p.journal_or_source} · {p.evidence_type}</p><p className="text-xs text-muted-foreground">{p.open_access}</p>{url && <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline text-sm">Open source record <ExternalLink className="size-3" /></a>}</CardContent></Card>; })}</div>
    {papers.length === 0 && <p>No matching references. Try another topic or search term.</p>}
  </div></SiteLayout>;
}
