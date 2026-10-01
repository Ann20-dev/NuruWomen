import { Router } from 'express';

import { ValidationError } from '../errors.js';
import {
  AnalyzeRequestSchema,
  TranslationCheckRequestSchema,
} from '../schemas/aiRequests.js';
import { callAiService } from '../services/aiService.js';

export const aiRouter = Router();

/** POST /api/ai/nuru/analyze */
aiRouter.post('/nuru/analyze', async (req, res) => {
  const parsed = AnalyzeRequestSchema.safeParse(req.body);
  if (!parsed.success) throw new ValidationError(parsed.error);

  // TEAM_HANDOFF.md: preserve the service JSON response unchanged.
  const analysis = await callAiService('analyze', parsed.data);
  res.status(200).json(analysis);
});

/** POST /api/ai/translation-check */
aiRouter.post('/translation-check', async (req, res) => {
  const parsed = TranslationCheckRequestSchema.safeParse(req.body);
  if (!parsed.success) throw new ValidationError(parsed.error);

  const result = await callAiService('translationCheck', parsed.data);
  res.status(200).json(result);
});