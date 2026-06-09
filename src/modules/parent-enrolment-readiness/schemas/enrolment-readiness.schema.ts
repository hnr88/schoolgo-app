import { z } from 'zod';

export const READINESS_ITEM_TYPES = [
  'written_agreement',
  'oshc',
  'guardian_nomination',
  'financial_evidence',
  'custom',
] as const;

export const READINESS_ITEM_STATUSES = ['pending', 'submitted', 'approved', 'rejected'] as const;

const applicationRefSchema = z.object({
  documentId: z.string(),
  school: z
    .object({
      name: z.string().nullish(),
    })
    .nullish(),
  student: z
    .object({
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
    })
    .nullish(),
});

// Flat Strapi v5 entity, exactly as /pre-enrolment-items/mine sanitizes it (C-P9).
export const readinessItemSchema = z.object({
  documentId: z.string(),
  itemType: z.enum(READINESS_ITEM_TYPES),
  customLabel: z.string().nullish(),
  status: z.enum(READINESS_ITEM_STATUSES),
  note: z.string().nullish(),
  submittedAt: z.string().nullish(),
  reviewedAt: z.string().nullish(),
  application: applicationRefSchema.nullish(),
});

// `mine` returns a bare { data: [...] } envelope (no pagination meta).
export const readinessResponseSchema = z.object({
  data: z.array(readinessItemSchema),
});
