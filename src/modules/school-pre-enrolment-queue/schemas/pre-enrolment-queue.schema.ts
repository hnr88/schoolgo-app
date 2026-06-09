import { z } from 'zod';

export const queueItemTypeSchema = z.enum([
  'written_agreement',
  'oshc',
  'guardian_nomination',
  'financial_evidence',
  'custom',
]);

export const queueItemStatusSchema = z.enum(['pending', 'submitted']);

export const queueItemSchema = z.object({
  documentId: z.string(),
  itemType: queueItemTypeSchema,
  customLabel: z.string().nullable(),
  status: queueItemStatusSchema,
  submittedAt: z.string().nullable(),
  application: z
    .object({
      documentId: z.string(),
      student: z
        .object({
          firstName: z.string().nullable(),
          lastName: z.string().nullable(),
        })
        .nullable(),
    })
    .nullable(),
});

export const queueResponseSchema = z.object({
  data: z.array(queueItemSchema),
});

export const reviewQueueItemSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  note: z.string().trim().max(2000).optional(),
});

export const queueStaffMeSchema = z.object({
  documentId: z.string(),
  permissionLevel: z.enum(['admin', 'staff']),
});

export const queueStaffMeResponseSchema = z.object({
  data: queueStaffMeSchema,
});

export type PreEnrolmentQueueItemType = z.infer<typeof queueItemTypeSchema>;
export type PreEnrolmentQueueItem = z.infer<typeof queueItemSchema>;
export type ReviewQueueItemInput = z.infer<typeof reviewQueueItemSchema>;
