import type { AnswerType } from '@/lib/nuru/protocol';
import type { NostrEvent } from '@nostrify/nostrify';

export interface SeedAnswer {
  id: string;
  type: AnswerType;
  authorName: string;
  authorPubkey: string;
  /** Role badge - e.g. "Verified Clinician · OB/GYN" or "Peer Support Volunteer". */
  role?: string;
  /** Extra tag for lived experience - e.g. "Endometriosis". */
  experienceTag?: string;
  text: string;
  helpful: number;
  createdAt: number;
}

export interface SeedQuestion {
  id: string;
  title: string;
  content: string;
  topics: string[];
  authorName: string;
  authorPubkey: string;
  createdAt: number;
  answers: SeedAnswer[];
  /** Slug of the attached evidence card, if one exists. */
  evidenceCard?: string;
  /** Optional non-graphic image (https URL) attached to the question. */
  image?: string;
  /** Aggregated community signal shown under the question. */
  signal?: { similarCount: number; insight?: string };
}

export interface EvidenceCardData {
  slug: string;
  title: string;
  topic: string;
  summary: string;
  commonCauses: string[];
  redFlags: string[];
  questionsForClinician: string[];
  sources: { label: string; url: string }[];
  reviewedAt: string;
  reviewer: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  area: string;
  topics: string[];
  minutes: number;
  reviewer: string;
  reviewerRole: string;
  reviewedAt: string;
  sources: { label: string; url: string }[];
  sections: ArticleSection[];
}

export interface Clinician {
  name: string;
  pubkey: string;
  role: string;
  specialty: string;
  org: string;
  verifiedSince: string;
}

export interface BlindSpotStat {
  topic: string;
  label: string;
  count: number;
  deltaPct: number;
  note?: string;
}

/* ---------- Community events ---------- */

export type HealthEventType = 'screening' | 'webinar' | 'community' | 'training' | 'awareness';

export interface HealthEvent {
  id: string;
  title: string;
  summary: string;
  /** Unix timestamp (seconds) for the start; optional end. */
  startsAt: number;
  endsAt?: number;
  /** Human-readable place - "Nairobi · Kibera" or "Online (Zoom)". */
  location: string;
  isOnline: boolean;
  type: HealthEventType;
  organizer: string;
  cost: string;
  languages: string[];
  topics: string[];
  /** Optional https link for registration or details. */
  link?: string;
  isSeed: boolean;
  event?: NostrEvent;
}

/* ---------- Unified view models (seed + live Nostr events) ---------- */

export interface Question {
  id: string;
  title: string;
  content: string;
  topics: string[];
  authorPubkey: string;
  /** Pseudonym for seed content; live events resolve via useAuthor. */
  authorName?: string;
  createdAt: number;
  isSeed: boolean;
  evidenceCard?: string;
  /** Optional non-graphic image (https URL) attached to the question. */
  image?: string;
  signal?: { similarCount: number; insight?: string };
  event?: NostrEvent;
}

export interface Answer {
  id: string;
  type: AnswerType;
  authorPubkey: string;
  authorName?: string;
  role?: string;
  experienceTag?: string;
  text: string;
  /** Seed helpful votes; live reaction counts are added on top. */
  helpful: number;
  createdAt: number;
  isSeed: boolean;
  event?: NostrEvent;
}
