import { z } from 'zod';

export const activeTemplateResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
    version: z.number(),
    publishedAt: z.string().nullable().optional(),
    templateData: z.unknown(),
  }),
});

export type ActiveTemplateResponse = z.infer<typeof activeTemplateResponseSchema>;
