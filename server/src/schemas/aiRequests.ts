import { z } from 'zod';

/**
 * Count Unicode codepoints, matching Python's len(). JavaScript's .length
 * counts UTF-16 code units and over-counts emoji and many non-Latin scripts.
 * Limits here must agree with ai/app/schemas.py exactly.
 */
function codepointLength(value: string): number {
  return Array.from(value).length;
}

/**
 * Mirrors meaningful_text in ai/app/schemas.py: control characters other
 * than newline, carriage return and tab are rejected.
 */
function hasOnlySupportedControlChars(value: string): boolean {
  for (const char of value) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;
    if (code < 32 && char !== '\n' && char !== '\r' && char !== '\t') {
      return false;
    }
  }
  return true;
}

/** A free-text field with the same rules the AI service applies. */
function freeText(maxCodepoints: number) {
  return z
    .string()
    .min(1, 'Must not be empty.')
    .refine((v) => v.trim().length > 0, {
      message: 'Must not be only whitespace.',
    })
    .refine((v) => codepointLength(v) <= maxCodepoints, {
      message: `Must be at most ${maxCodepoints} characters.`,
    })
    .refine(hasOnlySupportedControlChars, {
      message: 'Contains an unsupported control character.',
    });
}

/** Content version tag, e.g. "v1.2.0". Pattern from ai/app/schemas.py. */
const versionTag = z
  .string()
  .regex(
    /^[A-Za-z0-9._-]{1,32}$/,
    'Must be 1 to 32 characters: letters, digits, dot, underscore or hyphen.',
  );

/**
 * POST /api/ai/nuru/analyze
 * Fields are exactly those listed in docs/ai-handoff/TEAM_HANDOFF.md.
 */
export const AnalyzeRequestSchema = z.strictObject({
  title: freeText(120),
  content: freeText(2879),
  response_language: z.enum(['en', 'sw']),
  synthetic_only: z.literal(true),
  include_demo_cards: z.boolean().optional(),
});

/** POST /api/ai/translation-check */
export const TranslationCheckRequestSchema = z.strictObject({
  source_text: freeText(3000),
  target_text: freeText(3000),
  source_version: versionTag,
  translated_from_version: versionTag,
  synthetic_only: z.literal(true),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type TranslationCheckRequest = z.infer<
  typeof TranslationCheckRequestSchema
>;