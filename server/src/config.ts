import { z } from 'zod';

/**
 * Every environment variable this server depends on, with its validation rule.
 * If the real environment does not satisfy this schema, the process exits
 * before it can serve a single request.
 */
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().int().positive().max(65535).default(3000),

  AI_SERVICE_URL: z.url({
    message: 'Must be a full URL including the scheme, e.g. http://127.0.0.1:8000',
  }),

  WHC_API_KEY: z
    .string()
    .min(32, 'Must be at least 32 characters.')
    .refine((key) => !key.startsWith('REPLACE_'), {
      message: 'Still set to the placeholder from .env.example.',
    })
    .refine((key) => !/\s/.test(key), {
      message: 'Must not contain whitespace.'
    })
    .refine((key) => /^[\x20-\x7E]+$/.test(key), {
      message: 'Must be printable ASCII only.',
    }),

  /** Comma-separated browser origins permitted to call the API. */
  ALLOWED_ORIGINS: z.string().default(''),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\nServer configuration is invalid. Fix these and restart:\n');
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('\nSee server/.env.example for the expected values.\n');
  process.exit(1);
}

/**
 * Validated configuration. Frozen so no later code can mutate it.
 *
 * WARNING: aiServiceKey is a secret. Do not log this object, do not include it
 * in an error response, do not expose it on a route.
 */
export const config = Object.freeze({
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  aiServiceUrl: parsed.data.AI_SERVICE_URL.replace(/\/+$/, ''),
  aiServiceKey: parsed.data.WHC_API_KEY,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0),
});

export const isProduction = config.nodeEnv === 'production';