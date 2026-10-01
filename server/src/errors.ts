import type { ZodError } from 'zod';

/** A request that failed schema validation. Carries the Zod issues. */
export class ValidationError extends Error {
  readonly zodError: ZodError;

  constructor(zodError: ZodError) {
    super('Request validation failed');
    this.name = 'ValidationError';
    this.zodError = zodError;
  }
}