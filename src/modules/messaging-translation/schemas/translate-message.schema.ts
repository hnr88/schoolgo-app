import { z } from 'zod';

export const translateMessageResultSchema = z
  .object({
    documentId: z.string(),
    originalLocale: z.string(),
    targetLocale: z.string(),
    original: z.string(),
    translated: z.string(),
    cached: z.boolean(),
    provider: z.string(),
  })
  .passthrough();

export const translateMessageResponseSchema = z.object({
  data: translateMessageResultSchema,
  meta: z.record(z.string(), z.unknown()).optional(),
});
