import type { Question } from './types';

/**
 * On-device "similar questions" matching. Deliberately simple and
 * deterministic - the same spirit as the keyword classifiers, never a
 * semantic model: shared topics count double, shared significant title words
 * count once. Runs fully in the browser; nothing about the writer's draft
 * leaves the device for this.
 */

const STOPWORDS = new Set([
  // English
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'but', 'by', 'can', 'could',
  'do', 'does', 'for', 'from', 'had', 'has', 'have', 'how', 'i', 'if', 'in', 'is',
  'it', 'its', 'me', 'my', 'not', 'of', 'on', 'or', 'should', 'so', 'that', 'the',
  'this', 'to', 'was', 'we', 'what', 'when', 'which', 'why', 'will', 'with', 'you',
  'your', 'about', 'after', 'again', 'am', 'im', "i'm", 'ive', "i've", 'even',
  'every', 'get', 'got', 'still', 'than', 'them', 'they', 'too', 'very', 'were',
  // Kiswahili
  'ya', 'wa', 'na', 'ni', 'kwa', 'la', 'za', 'cha', 'au', 'ama', 'mimi', 'wangu',
  'yangu', 'sana', 'kama', 'bila', 'hii', 'hilo', 'je', 'kweli', 'pia', 'lakini',
]);

function significantWords(text: string): Set<string> {
  const words = text.toLowerCase().match(/[\p{L}]{3,}/gu) ?? [];
  return new Set(words.filter((w) => !STOPWORDS.has(w)));
}

export interface SimilarMatch {
  question: Question;
  score: number;
}

/**
 * Questions similar to a draft or an existing question, best first.
 * `excludeId` skips the question itself when scoring an existing thread.
 */
export function findSimilarQuestions(
  target: { title: string; content?: string; topics: string[] },
  all: Question[],
  options: { excludeId?: string; limit?: number; minScore?: number } = {},
): SimilarMatch[] {
  const { excludeId, limit = 3, minScore = 2 } = options;
  const targetTopics = new Set(target.topics);
  const targetWords = significantWords(`${target.title} ${target.content ?? ''}`);
  if (targetTopics.size === 0 && targetWords.size === 0) return [];

  const matches: SimilarMatch[] = [];
  for (const q of all) {
    if (q.id === excludeId) continue;
    let score = 0;
    for (const t of q.topics) if (targetTopics.has(t)) score += 2;
    if (targetWords.size > 0) {
      const words = significantWords(q.title);
      for (const w of words) if (targetWords.has(w)) score += 1;
    }
    if (score >= minScore) matches.push({ question: q, score });
  }

  return matches.sort((a, b) => b.score - a.score || b.question.createdAt - a.question.createdAt).slice(0, limit);
}

/** Aggregate count for the community-signal panel (caps at the list size). */
export function countSimilarQuestions(
  target: { title: string; content?: string; topics: string[] },
  all: Question[],
  options: { excludeId?: string; minScore?: number } = {},
): number {
  return findSimilarQuestions(target, all, { ...options, limit: all.length }).length;
}
