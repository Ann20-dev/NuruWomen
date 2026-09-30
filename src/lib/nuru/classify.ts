/** Bilingual tag suggestions. Counts are keyword evidence, never diagnostic probabilities. */
import { TOPICS, type Topic } from './topics';
import { NURU_TAXONOMY } from './aiRules';
import { scanForPii, redactPii } from './privacy';
export interface TopicMatch { topic: Topic; score: number }
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function classifyTopics(text: string, max = 3): TopicMatch[] {
  if (!Number.isFinite(max) || max <= 0) return [];
  const cleaned = redactPii(text, scanForPii(text)).normalize('NFKC').replace(/\p{Cf}/gu, '').toLowerCase();
  const matches: TopicMatch[] = [];
  for (const row of NURU_TAXONOMY.topics) {
    const topic = TOPICS.find((t) => t.slug === row.slug);
    if (!topic) continue;
    const score = row.keywords.filter((kw) => {
      const phrase = kw.split(/\s+/).map(escape).join('\\s+');
      return new RegExp(`(?<![\\p{L}\\p{N}_])${phrase}(?![\\p{L}\\p{N}_])`, 'u').test(cleaned);
    }).length;
    if (score) matches.push({ topic, score });
  }
  return matches.sort((a, b) => b.score - a.score || (a.topic.slug < b.topic.slug ? -1 : 1)).slice(0, Math.min(3, Math.floor(max)));
}
