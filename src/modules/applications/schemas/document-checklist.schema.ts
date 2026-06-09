import { z } from 'zod';

export const documentChecklistItemSchema = z.object({
  documentType: z.string(),
  required: z.literal(true),
  attached: z.boolean(),
  studentDocumentId: z.string().nullable(),
});

export const documentChecklistResponseSchema = z.object({
  data: z.object({
    items: z.array(documentChecklistItemSchema),
    complete: z.boolean(),
  }),
});

export type DocumentChecklistItem = z.infer<typeof documentChecklistItemSchema>;
export type DocumentChecklist = z.infer<typeof documentChecklistResponseSchema>['data'];
