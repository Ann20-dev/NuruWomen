/** Five demo categories. All labels and routing cues require language review. */
import { DEMO_TAXONOMY } from './aiRules';
import { scanForPii, redactPii } from './privacy';
export type DemoTopicId = typeof DEMO_TAXONOMY.topics[number]['id'];
export const DEMO_TOPICS = DEMO_TAXONOMY.topics;
export interface DemoCategory { id: DemoTopicId; score: number; matched_cues: string[] }
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = (phrase: string) => `(?<![\\p{L}\\p{N}_])${phrase.split(/\s+/).map(escape).join('\\s+')}(?![\\p{L}\\p{N}_])`;
const has = (text: string, phrase: string) => new RegExp(pattern(phrase), 'u').test(text);
/** Explicit multi-label suggestions. A mention is never a diagnosis or proof of personal experience. */
export function classifyDemoTopics(text: string) {
  const cleaned = redactPii(text, scanForPii(text)).normalize('NFKC').replace(/\p{Cf}/gu, '').toLowerCase();
  const categories: DemoCategory[] = [];
  for (const topic of DEMO_TOPICS) {
    let candidate = cleaned;
    for (const phrase of topic.ignore_phrases) candidate = candidate.replace(new RegExp(pattern(phrase), 'gu'), ' ');
    const cues = topic.keywords.filter(kw => has(candidate, kw));
    if (cues.length) categories.push({ id: topic.id, score: cues.length, matched_cues: [...cues] });
  }
  const abortion = DEMO_TAXONOMY.subtopics[0].keywords.some(kw => has(cleaned, kw));
  const ambiguous = DEMO_TAXONOMY.ambiguous_pregnancy_loss_terms.some(kw => has(cleaned, kw));
  const scopeText = abortion ? cleaned.replace(new RegExp(pattern('termination of pregnancy'), 'gu'), ' ') : cleaned;
  const outside = DEMO_TAXONOMY.out_of_scope_keywords.some(kw => has(scopeText, kw));
  return {
    taxonomy_version: DEMO_TAXONOMY.version, categories, category_ids: categories.map(c => c.id),
    subtopic_ids: abortion ? ['abortion'] : [], ambiguous_pregnancy_loss_wording: ambiguous,
    outside_demo_cue: outside,
    scope_status: categories.length ? (outside ? 'mixed_scope' : 'in_demo') : 'needs_human_routing',
    needs_topic_review: true as const, diagnosis: false as const, method: 'explicit_bilingual_cues',
  };
}
