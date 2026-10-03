/**
 * On-device analysis: the same privacy, safety and routing rules the Python
 * service runs (exported to `aiRules.ts` by `ai/scripts/export_nuru_rules.py`),
 * executed in the browser. Used when the AI gateway is unreachable, so topic
 * categorization and privacy suggestions work on a static deployment too.
 *
 * Limits are identical to the server rules: keyword evidence only, never a
 * diagnosis, never an anonymity guarantee, and nothing here approves content.
 */
import type { EvidenceCard, NuruAnalysis, NuruRequest, PrivacySummary } from './aiClient';
import { DEMO_TOPICS, classifyDemoTopics, type DemoTopicId } from './demoTopics';
import { NURU_TAXONOMY } from './aiRules';
import { classifyTopics } from './classify';
import { scanForPii, redactPii } from './privacy';
import { scanSafety } from './safety';
import { EVIDENCE_CARDS } from '@/data/evidenceCards';

function privacySummary(text: string): PrivacySummary {
  const findings = scanForPii(text);
  return {
    redacted_text: findings.length > 0 ? redactPii(text, findings) : text,
    contains_detected_identifiers: findings.length > 0,
    anonymity_guaranteed: false,
    requires_user_confirmation: true,
  };
}

function asDemoTopic(value: string | null): DemoTopicId | null {
  return DEMO_TOPICS.some((t) => t.id === value) ? (value as DemoTopicId) : null;
}

export function analyzeLocally(payload: NuruRequest): NuruAnalysis {
  const combined = `${payload.title}\n${payload.content}`;
  const routing = classifyDemoTopics(combined);
  const safetyFlags = scanSafety(combined, payload.response_language);

  const broadBySlug = new Map<string, string | null>(NURU_TAXONOMY.topics.map((row) => [row.slug, row.broad_topic] as const));
  const suggestions = classifyTopics(combined).map((match) => ({
    slug: match.topic.slug,
    score: match.score,
    broad_topic: asDemoTopic(broadBySlug.get(match.topic.slug) ?? null),
  }));

  // Draft evidence exists in English only; other languages get no local cards.
  const suggestedSlugs = new Set(suggestions.map((s) => s.slug));
  const demoMatches: EvidenceCard[] = payload.response_language === 'en'
    ? EVIDENCE_CARDS.filter((card) => suggestedSlugs.has(card.topic)).map((card) => ({
        id: card.slug,
        title: card.title,
        body: card.summary,
        language: 'en' as const,
        version: 'local-draft-v1',
        demo_only: true,
        eligible_for_publication: false,
      }))
    : [];

  const reasonCodes = ['local_rules_engine', 'human_review_required'];
  if (routing.ambiguous_pregnancy_loss_wording) reasonCodes.push('ambiguous_pregnancy_loss_wording');
  if (routing.scope_status !== 'in_demo') reasonCodes.push(routing.scope_status);

  return {
    schema_version: 'nuru-ai-v2',
    mode: 'synthetic_demo',
    privacy: { title: privacySummary(payload.title), content: privacySummary(payload.content) },
    safety: {
      status: safetyFlags.length > 0 ? 'potential_urgent_concern' : 'no_rule_match',
      rule_ids: safetyFlags.map((f) => f.id),
      message: safetyFlags[0]?.guidance ?? null,
      clinically_validated: false,
    },
    routing: {
      taxonomy_version: routing.taxonomy_version,
      suggestions,
      categories: routing.categories,
      category_ids: routing.category_ids,
      subtopic_ids: routing.subtopic_ids,
      scope_status: routing.scope_status as NuruAnalysis['routing']['scope_status'],
      ambiguous_pregnancy_loss_wording: routing.ambiguous_pregnancy_loss_wording,
      needs_topic_review: true,
    },
    review: {
      required: true,
      reason_codes: reasonCodes,
      knowledge_status: 'no_approved_answer',
      clinical_authority_verified_by_ai: false,
    },
    evidence: {
      approved_matches: [],
      demo_matches: demoMatches,
      language: payload.response_language,
    },
    publication_allowed: false,
  };
}

