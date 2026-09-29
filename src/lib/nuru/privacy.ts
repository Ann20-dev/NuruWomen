/**
 * Client-side PII detection. Runs before any event is signed so personal
 * identifiers never reach a public relay. Heuristic by design — it errs
 * toward over-flagging and always leaves the final decision to the user.
 */

export type PiiType = 'name' | 'phone' | 'email' | 'location' | 'id-number' | 'handle';

export interface PiiFinding {
  type: PiiType;
  label: string;
  match: string;
}

const PHONE_RE = /(?:\+?254[\s-]?|0)(7\d{2}|1\d{2})[\s-]?\d{3}[\s-]?\d{3}\b/g;
const LONG_NUMBER_RE = /\b\d{10,12}\b/g;
const ID_NUMBER_RE = /\b\d{7,9}\b/g;
const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const HANDLE_RE = /@[A-Za-z0-9_.]{3,}\b/g;
const NAME_RE = /(?:my name is|i am called|jina langu ni|mimi ni|call me)\s+([A-Z][A-Za-z'’.-]{1,20}(?:\s+[A-Z][A-Za-z'’.-]{1,20}){0,2})/gi;

/** Kenyan places commonly typed into questions (towns, cities, estates). */
const LOCATIONS = [
  'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'kitale', 'kakamega',
  'kisii', 'nyeri', 'machakos', 'meru', 'kilifi', 'malindi', 'garissa', 'isiolo',
  'busia', 'homa bay', 'migori', 'kericho', 'bomet', 'narok', 'kajiado', 'kitui',
  'embu', 'nanyuki', 'bungoma', 'voi', 'lamu', 'diani', 'watamu', 'ruaka', 'kikuyu',
  'rongai', 'ngong', 'kiambu', 'ruiru', 'juja', 'athi river', 'kibera', 'kawangware',
  'karen', 'westlands', 'eastleigh', 'kilimani', 'lavington', 'roysambu', 'kasarani',
  'embakasi', 'dagoretti', 'langata', 'umoja', 'buruburu', 'donholm', 'syokimau',
];

export function scanForPii(text: string): PiiFinding[] {
  const findings: PiiFinding[] = [];
  const seen = new Set<string>();
  const push = (f: PiiFinding) => {
    const key = `${f.type}:${f.match.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      findings.push(f);
    }
  };

  for (const m of text.matchAll(PHONE_RE)) {
    push({ type: 'phone', label: 'Phone number', match: m[0] });
  }
  for (const m of text.matchAll(EMAIL_RE)) {
    push({ type: 'email', label: 'Email address', match: m[0] });
  }
  for (const m of text.matchAll(HANDLE_RE)) {
    push({ type: 'handle', label: 'Social handle', match: m[0] });
  }
  for (const m of text.matchAll(NAME_RE)) {
    if (m[1]) push({ type: 'name', label: 'Possible name', match: m[1] });
  }
  for (const m of text.matchAll(LONG_NUMBER_RE)) {
    push({ type: 'phone', label: 'Possible phone / account number', match: m[0] });
  }
  // 7–9 digit runs that are not part of an already-flagged longer number
  for (const m of text.matchAll(ID_NUMBER_RE)) {
    const already = findings.some((f) => f.match.includes(m[0]));
    if (!already) push({ type: 'id-number', label: 'Possible ID number', match: m[0] });
  }

  const lower = text.toLowerCase();
  for (const place of LOCATIONS) {
    const re = new RegExp(`\\b${place.replace(' ', '\\s')}\\b`, 'i');
    const m = lower.match(re);
    if (m) push({ type: 'location', label: 'Location', match: m[0] });
  }

  return findings;
}

/** Replace every detected fragment with a neutral placeholder. */
export function redactPii(text: string, findings: PiiFinding[]): string {
  let out = text;
  const sorted = [...findings].sort((a, b) => b.match.length - a.match.length);
  for (const f of sorted) {
    out = out.split(f.match).join('[removed]');
    // also try case-insensitive replacement for locations
    const re = new RegExp(escapeRegExp(f.match), 'gi');
    out = out.replace(re, '[removed]');
  }
  // Tidy duplicated placeholders
  return out.replace(/(\[removed\]\s*){2,}/g, '[removed] ').trim();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
