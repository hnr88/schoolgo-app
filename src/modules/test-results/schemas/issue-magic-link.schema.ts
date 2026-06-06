import { z } from 'zod';

export const issueMagicLinkInputSchema = z.object({
  documentId: z
    .string()
    .trim()
    .min(1, 'A student documentId is required')
    .regex(/^[a-z0-9]{1,32}$/i, 'Invalid documentId'),
  testDocumentId: z
    .string()
    .trim()
    .regex(/^[a-z0-9]{1,32}$/i, 'Invalid testDocumentId')
    .optional(),
  ttlMinutes: z.number().int().positive().max(1440).optional(),
});
