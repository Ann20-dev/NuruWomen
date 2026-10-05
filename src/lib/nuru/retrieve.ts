/**
 * On-device retrieval: matches question text to library articles and to the
 * clinically reviewed evidence catalog. Deterministic keyword/topic overlap -
 * the same classifiable cues as the routing rules, never a diagnosis.
 */
import { ARTICLES } from '@/data/articles';
import { EVIDENCE_PAPERS, type EvidencePaper } from '@/data/evidenceCatalog';
import type { Article } from '@/lib/nuru/types';
import { classifyTopics } from './classify';
import { classifyDemoTopics } from './demoTopics';

export interface RetrievalResult {
  articles: Article[];
  papers: EvidencePaper[];
}

function tagMatchesSlug(tag: string, slug: string): boolean {
  return tag === slug || tag.includes(slug) || slug.includes(tag);
}

/** Retrieve reading for free text (title + body of a question or answer). */
export function retrieveForText(text: string, max = 3): RetrievalResult {
  const subtopicMatches = classifyTopics(text, 6);
  const subSlugs = new Set(subtopicMatches.map((m) => m.topic.slug));
  const categories = new Set<string>(classifyDemoTopics(text).category_ids);

  const articles = ARTICLES.map((article) => {
    let score = article.topics.filter((t) => subSlugs.has(t)).length * 3;
    const hay = `${article.title} ${article.summary}`.toLowerCase();
    for (const match of subtopicMatches) {
      if (match.topic.keywords.some((kw) => hay.includes(kw))) score += 1;
    }
    return { article, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.article.slug < b.article.slug ? -1 : 1))
    .slice(0, max)
    .map((x) => x.article);

  const papers = EVIDENCE_PAPERS.map((paper) => {
    let score = categories.has(paper.topic) ? 3 : 0;
    for (const slug of subSlugs) {
      if (paper.library_tags.some((tag) => tagMatchesSlug(tag, slug))) score += 1;
    }
    const hay = `${paper.title} ${paper.clinical_use}`.toLowerCase();
    for (const match of subtopicMatches) {
      if (match.topic.keywords.some((kw) => hay.includes(kw))) score += 1;
    }
    return { paper, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.paper.year - a.paper.year)
    .slice(0, max)
    .map((x) => x.paper);

  return { articles, papers };
}

/** Retrieve reading for an already-tagged question (slugs known). */
export function retrieveForTopics(topics: string[]): RetrievalResult {
  const wanted = new Set(topics);
  return {
    articles: ARTICLES.filter((a) => a.topics.some((t) => wanted.has(t))).slice(0, 3),
    papers: EVIDENCE_PAPERS.filter((p) =>
      p.library_tags.some((tag) => [...wanted].some((slug) => tagMatchesSlug(tag, slug))),
    ).slice(0, 3),
  };
}

