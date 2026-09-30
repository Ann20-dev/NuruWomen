/** Local suggestions only. No scan can certify anonymity or authorise publishing. */
export type PiiType = 'name' | 'phone' | 'email' | 'location' | 'id-number' | 'handle';
export interface PiiFinding {
  type: PiiType;
  label: string;
  match: string;
  /** UTF-16 offsets into the exact scanned string, unlike Python codepoint offsets. */
  start: number;
  end: number;
}
interface Pattern { type: PiiType; label: string; re: RegExp; group: number }
const patterns: Pattern[] = [
  { type: 'email', label: 'Possible email', re: /(?<![\w.+-])[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/gi, group: 0 },
  { type: 'phone', label: 'Possible phone', re: /(?<!\w)(?:(?:\+?254|00254)[\s.-]?[17]|0[17])(?:[\s.-]?\d){8}(?!\d)/g, group: 0 },
  { type: 'id-number', label: 'Possible identifier', re: /\b(?:national\s*id|id\s*(?:number|no\.?)?|kitambulisho|passport)\s*[:#=-]?\s*([A-Z0-9-]{5,20})\b/gi, group: 1 },
  { type: 'name', label: 'Possible name', re: /\b(?:my name is|i am called|jina langu ni|ninaitwa|naitwa)\s+([\p{L}\p{N}_'-]+(?:[ \t]+[\p{L}\p{N}_'-]+){0,2})/giu, group: 1 },
  { type: 'location', label: 'Possible address', re: /\b(?:i live (?:at|in)|my address is|ninaishi(?:\s+(?:katika|mtaa\s+wa))?)\s+([^\n,.!?;]{2,70})/gi, group: 1 },
  { type: 'handle', label: 'Possible handle', re: /(?<!\w)@[A-Za-z0-9_]{3,30}\b/g, group: 0 },
];
const stopWords = new Set(['i', 'and', 'but', 'have', 'am', 'na', 'nina', 'ninaumwa', 'ninahisi', 'mjamzito', 'maumivu', 'hedhi', 'damu']);
export function scanForPii(text: string): PiiFinding[] {
  const candidates: PiiFinding[] = [];
  for (const pattern of patterns) {
    for (const m of text.matchAll(pattern.re)) {
      let fragment = m[pattern.group];
      if (!fragment) continue;
      const start = m.index + (pattern.group ? m[0].lastIndexOf(fragment) : 0);
      if (pattern.type === 'name') {
        for (const word of fragment.matchAll(/[\p{L}\p{N}_'-]+/gu)) {
          if (stopWords.has(word[0].toLowerCase())) {
            fragment = fragment.slice(0, word.index).trimEnd();
            break;
          }
        }
      }
      if (fragment) candidates.push({ type: pattern.type, label: pattern.label, match: fragment, start, end: start + fragment.length });
    }
  }
  const accepted: PiiFinding[] = [];
  candidates.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start);
  for (const item of candidates) {
    if (!accepted.some((x) => item.start < x.end && x.start < item.end)) accepted.push(item);
  }
  return accepted.sort((a, b) => a.start - b.start);
}
/** Refuse stale/invalid spans instead of replacing arbitrary matching words elsewhere. */
export function redactPii(text: string, findings: PiiFinding[]): string {
  const ordered = [...findings].sort((a, b) => a.start - b.start);
  for (let i = 0; i < ordered.length; i++) {
    const f = ordered[i];
    if (!Number.isInteger(f.start) || !Number.isInteger(f.end) || f.start < 0 || f.end <= f.start ||
        f.end > text.length || text.slice(f.start, f.end) !== f.match || (i > 0 && ordered[i - 1].end > f.start)) {
      throw new Error('Text changed or findings are invalid. Run the privacy scan again.');
    }
  }
  let result = text;
  for (const f of ordered.reverse()) result = result.slice(0, f.start) + '[removed]' + result.slice(f.end);
  return result;
}
