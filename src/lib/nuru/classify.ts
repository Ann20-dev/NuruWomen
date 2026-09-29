/**
 * Keyword-based topic classification. Deliberately simple and transparent —
 * it suggests tags; the user always confirms them. On the server roadmap this
 * is where clustering and multilingual models plug in.
 */

import { TOPICS, type Topic } from './topics';

export interface TopicMatch {
  topic: Topic;
  score: number;
}

export function classifyTopics(text: string, max = 3): TopicMatch[] {
  const lower = text.toLowerCase();
  const matches: TopicMatch[] = [];

  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        // Longer keyword phrases are stronger signals
        score += kw.length >= 12 ? 3 : kw.length >= 6 ? 2 : 1;
      }
    }
    if (score > 0) matches.push({ topic, score });
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, max);
}
