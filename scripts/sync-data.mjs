import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
// RFC-style quoted CSV fields; handles comma-containing source descriptions.
function readCsv(filename) {
  const text = fs.readFileSync(path.join(root, 'data', filename), 'utf8');
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
    else if (c === '\n' && !quoted) { row.push(cell.replace(/\r$/, '')); if (row.some(Boolean)) rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (quoted) throw new Error('Unclosed quoted CSV field');
  if (cell || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift();
  return rows.map(values => {
    if (values.length !== headers.length) throw new Error('CSV column count mismatch');
    return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
  });
}
const summary = readCsv('topic_coverage_summary.csv').map(r => ({...r, countries_covered: Number(r.countries_covered), total_countries: Number(r.total_countries), coverage_pct: Number(r.coverage_pct), records: Number(r.records), is_proxy: r.is_proxy === 'True'}));
const detail = readCsv('topic_country_detail.csv').map(r => ({...r, records: Number(r.records), level: Number(r.level)}));
if (summary.length !== 5 || new Set(detail.map(r => r.country)).size !== 53 || detail.length !== 265) throw new Error('Review changed coverage dimensions before publishing');
const library = JSON.parse(fs.readFileSync(path.join(root, 'ai/evidence/nuruwomen_clinical_library_manifest.json'), 'utf8'));
if (library.papers.some(p => !Number.isInteger(p.year) || p.year < 2020 || !p.access_url.startsWith('https://'))) throw new Error('Research catalogue must use 2020+ references and HTTPS source links');

// Canonical clinically-reviewed evidence catalog (data science handoff).
const catalog = readCsv('clinical_evidence_catalog.csv').map(r => ({
  topic: r.topic,
  title: r.title,
  year: Number(r.year),
  journal_or_source: r.journal_or_source,
  evidence_type: r.evidence_type,
  pmid: r.pmid || null,
  pmcid: r.pmcid || null,
  doi: r.doi || null,
  access_url: r.access_url,
  open_access: r.open_access,
  clinical_use: r.clinical_use,
  library_tags: r.library_tags.split('|').filter(Boolean),
}));
const catalogTopics = new Set(catalog.map(p => p.topic));
if (catalog.length !== 20 || catalogTopics.size !== 5 ||
    catalog.some(p => !Number.isInteger(p.year) || p.year < 2020 || !p.access_url.startsWith('https://') || !p.clinical_use)) {
  throw new Error('Evidence catalog must hold 20 clinically reviewed, 2020+ HTTPS-linked papers across the five topics');
}

fs.writeFileSync(path.join(root, 'src/data/researchCoverage.json'), JSON.stringify({status: 'unverified_imported_snapshot', summary, detail}, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'src/data/researchLibrary.json'), JSON.stringify(library, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'src/data/evidenceCatalog.json'), JSON.stringify({catalog_name: 'NuruWomen Clinical Evidence Catalog', papers: catalog}, null, 2) + '\n');
console.log(`Synced ${library.papers.length} research references, ${catalog.length} catalog papers and ${detail.length} country/topic rows.`);
