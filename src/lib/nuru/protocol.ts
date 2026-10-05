/**
 * NuruWomen protocol constants. See NIP.md for the full specification.
 */

/** `t` tag marking content that belongs to the commons. */
export const NURU_TAG = 'nuru-commons';

/** Questions are plain kind-1 notes so any Nostr client can read them. */
export const QUESTION_KIND = 1;
/** Answers are kind-1 replies (NIP-10) carrying a NIP-32 self-label. */
export const ANSWER_KIND = 1;
/** "Helpful" votes are kind-7 reactions. */
export const HELPFUL_KIND = 7;
/** Library articles are NIP-23 long-form. */
export const ARTICLE_KIND = 30023;
/** Evidence Cards - custom addressable kind (see NIP.md). */
export const EVIDENCE_CARD_KIND = 35113;
/** NIP-51 follow set listing manually verified clinician pubkeys. */
export const CLINICIAN_LIST_KIND = 30000;
export const CLINICIAN_LIST_DTAG = 'nuru-verified-clinicians';
/** NIP-52 time-based calendar events - community health events. */
export const CALENDAR_EVENT_KIND = 31923;

/** NIP-32 label namespace used to classify answer types. */
export const ANSWER_TYPE_NAMESPACE = 'nuru.answer-type';

export type AnswerType = 'lived-experience' | 'clinical-response';

export const ANSWER_TYPES: AnswerType[] = ['lived-experience', 'clinical-response'];

/**
 * Project authority key for the commons. Evidence cards and the clinician
 * registry are only trusted when authored by it.
 */
export const COMMONS_PUBKEY =
  '2c4a8f6e0d1b3a597c8e2f4a6b8d0c1e3a5b7d9f1c3e5a7b9d1f3c5e7a9b1d3f5a';
