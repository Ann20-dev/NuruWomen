/** Browser-to-gateway client. Never put WHC_API_KEY or a provider key in Vite. */
import { DEMO_TOPICS, type DemoTopicId, type DemoCategory } from './demoTopics';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export type ResponseLanguage = 'en' | 'sw';
export interface NuruRequest {
  title: string;
  content: string;
  response_language: ResponseLanguage;
  synthetic_only: true;
  include_demo_cards?: boolean;
}
export interface PrivacySummary {
  redacted_text: string;
  contains_detected_identifiers: boolean;
  anonymity_guaranteed: false;
  requires_user_confirmation: true;
}
export interface EvidenceCard {
  id: string; title: string; body: string; language: ResponseLanguage;
  version: string; demo_only: boolean; eligible_for_publication: boolean;
}
export interface NuruAnalysis {
  schema_version: 'nuru-ai-v2';
  mode: 'synthetic_demo';
  privacy: { title: PrivacySummary; content: PrivacySummary };
  safety: { status: 'potential_urgent_concern' | 'no_rule_match'; rule_ids: string[]; message: string | null; clinically_validated: false };
  routing: { taxonomy_version: string; suggestions: { slug: string; score: number; broad_topic: DemoTopicId | null }[]; categories: DemoCategory[]; category_ids: DemoTopicId[]; subtopic_ids: string[]; scope_status: 'in_demo' | 'mixed_scope' | 'needs_human_routing'; ambiguous_pregnancy_loss_wording: boolean; needs_topic_review: true };
  review: { required: true; reason_codes: string[]; knowledge_status: 'approved_content_available' | 'no_approved_answer'; clinical_authority_verified_by_ai: false };
  evidence: { approved_matches: EvidenceCard[]; demo_matches: EvidenceCard[]; language: ResponseLanguage };
  publication_allowed: false;
}
function object(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Invalid AI response.');
  return value as Record<string, unknown>;
}
function string(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Invalid AI response.');
  return value;
}
function bool(value: unknown): boolean {
  if (typeof value !== 'boolean') throw new Error('Invalid AI response.');
  return value;
}
function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error('Invalid AI response.');
  return value;
}
function language(value: unknown): ResponseLanguage {
  if (value !== 'en' && value !== 'sw') throw new Error('Invalid AI response language.');
  return value;
}
function topicId(value: unknown): DemoTopicId {
  if (!DEMO_TOPICS.some(t => t.id === value)) throw new Error('Unknown demo category.');
  return value as DemoTopicId;
}
function score(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new Error('Invalid topic score.');
  return value;
}
function privacy(value: unknown): PrivacySummary {
  const p = object(value);
  if (p.anonymity_guaranteed !== false || p.requires_user_confirmation !== true) throw new Error('Unsupported privacy contract.');
  return { redacted_text: string(p.redacted_text), contains_detected_identifiers: bool(p.contains_detected_identifiers), anonymity_guaranteed: false, requires_user_confirmation: true };
}
function cards(value: unknown, demo: boolean, lang: ResponseLanguage): EvidenceCard[] {
  return array(value).map((item) => {
    const c = object(item);
    if (c.demo_only !== demo || c.eligible_for_publication !== !demo || c.language !== lang) throw new Error('Invalid evidence contract.');
    return { id: string(c.id), title: string(c.title), body: string(c.body), language: language(c.language), version: string(c.version), demo_only: demo, eligible_for_publication: !demo };
  });
}
/** Check the response at runtime; a TypeScript cast alone does not validate network data. */
export function parseNuruAnalysis(value: unknown): NuruAnalysis {
  const r = object(value);
  if (r.schema_version !== 'nuru-ai-v2' || r.mode !== 'synthetic_demo' || r.publication_allowed !== false) throw new Error('Unsupported AI contract.');
  const p = object(r.privacy), s = object(r.safety), routing = object(r.routing), e = object(r.evidence);
  if ((s.status !== 'potential_urgent_concern' && s.status !== 'no_rule_match') || s.clinically_validated !== false || routing.needs_topic_review !== true) throw new Error('Unsupported AI contract.');
  const lang = language(e.language);
  const suggestions = array(routing.suggestions).map((item) => {
    const t = object(item);
    if (typeof t.score !== 'number' || !Number.isFinite(t.score) || t.score < 0) throw new Error('Invalid topic score.');
    return { slug: string(t.slug), score: t.score, broad_topic: t.broad_topic === null ? null : topicId(t.broad_topic) };
  });
  const review = object(r.review);
  if (review.required !== true || review.clinical_authority_verified_by_ai !== false || (review.knowledge_status !== 'no_approved_answer' && review.knowledge_status !== 'approved_content_available')) throw new Error('Invalid review contract.');
  if (!['in_demo','mixed_scope','needs_human_routing'].includes(string(routing.scope_status))) throw new Error('Invalid routing status.');
  const categories = array(routing.categories).map(value => { const c = object(value); return { id: topicId(c.id), score: score(c.score), matched_cues: array(c.matched_cues).map(string) }; });
  const ids = array(routing.category_ids).map(topicId);
  if (JSON.stringify(ids) !== JSON.stringify(categories.map(c => c.id)) || new Set(ids).size !== ids.length) throw new Error('Inconsistent categories.');
  const subtopics = array(routing.subtopic_ids).map(string);
  if (subtopics.some(id => id !== 'abortion')) throw new Error('Unknown subtopic.');
  return {
    schema_version: 'nuru-ai-v2', mode: 'synthetic_demo', publication_allowed: false,
    privacy: { title: privacy(p.title), content: privacy(p.content) },
    safety: { status: s.status, clinically_validated: false, rule_ids: array(s.rule_ids).map(string), message: s.message === null ? null : string(s.message) },
    routing: { taxonomy_version: string(routing.taxonomy_version), suggestions, categories, category_ids: ids, subtopic_ids: subtopics, scope_status: routing.scope_status as NuruAnalysis['routing']['scope_status'], ambiguous_pregnancy_loss_wording: bool(routing.ambiguous_pregnancy_loss_wording), needs_topic_review: true },
    review: { required: true, reason_codes: array(review.reason_codes).map(string), knowledge_status: review.knowledge_status, clinical_authority_verified_by_ai: false },
    evidence: { language: lang, approved_matches: cards(e.approved_matches, false, lang), demo_matches: cards(e.demo_matches, true, lang) },
  };
}
async function request(path: string, body: unknown, signal?: AbortSignal): Promise<unknown> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, 10000);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { method: 'POST', credentials: 'omit', cache: 'no-store', redirect: 'error',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal });
    if (!response.ok) throw new Error(`AI check unavailable (HTTP ${response.status}).`);
    return await response.json() as unknown;
  } catch {
    // Never include request text, credentials or the server error body in a UI error.
    throw new Error(controller.signal.aborted ? 'AI check cancelled or timed out.' : 'AI check unavailable. Try again.');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}
export async function analyzeNuru(payload: NuruRequest, signal?: AbortSignal): Promise<NuruAnalysis> {
  if (payload.synthetic_only !== true || !payload.title.trim() || !payload.content.trim() ||
      Array.from(payload.title).length > 120 || Array.from(payload.content).length > 2879) throw new Error('Use a synthetic title of 1-120 characters and body of 1-2879 characters.');
  const result = parseNuruAnalysis(await request('/api/ai/nuru/analyze', payload, signal));
  if (result.evidence.language !== payload.response_language) throw new Error('AI response language does not match the request.');
  return result;
}
/** Per-component controller. Call invalidate immediately on EVERY text/language edit and unmount. */
export function createLatestAnalyzer() {
  let revision = 0;
  let controller: AbortController | undefined;
  const invalidate = () => { revision++; controller?.abort(); };
  return {
    invalidate,
    async analyze(payload: NuruRequest): Promise<NuruAnalysis | null> {
      invalidate();
      const current = revision;
      controller = new AbortController();
      try {
        const result = await analyzeNuru(payload, controller.signal);
        return current === revision ? result : null;
      } catch (error) {
        if (current !== revision) return null;
        throw error;
      }
    },
  };
}
export interface TranslationRequest {
  source_text: string; target_text: string; source_version: string; translated_from_version: string; synthetic_only: true;
}
export async function checkTranslationDraft(payload: TranslationRequest, signal?: AbortSignal) {
  if (payload.synthetic_only !== true) throw new Error('Synthetic drafts only.');
  const result = object(await request('/api/ai/translation-check', payload, signal));
  if (result.ready_to_publish !== false || result.status !== 'human_language_and_clinical_review_required') throw new Error('Unsupported translation contract.');
  return { checks: array(result.checks).map(string), ready_to_publish: false as const, status: 'human_language_and_clinical_review_required' as const, limitations: string(result.limitations) };
}
