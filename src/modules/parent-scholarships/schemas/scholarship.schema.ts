import { z } from 'zod';

const scholarshipSchoolSchema = z
  .object({
    documentId: z.string(),
    name: z.string(),
  })
  .nullable();

export const scholarshipSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  type: z.string(),
  amountAud: z.number().nullable(),
  amountPct: z.number().nullable(),
  criteria: z.unknown(),
  deadline: z.string().nullable(),
  active: z.boolean(),
  externalUrl: z.string().nullable(),
  school: scholarshipSchoolSchema,
});

export const scholarshipBrowseResponseSchema = z.object({
  data: z.array(scholarshipSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      total: z.number(),
    }),
  }),
});

const matchScholarshipSchema = z
  .object({
    documentId: z.string(),
    name: z.string(),
    type: z.string(),
    amountAud: z.number().nullable(),
    amountPct: z.number().nullable(),
    deadline: z.string().nullable(),
  })
  .nullable();

export const scholarshipMatchSchema = z.object({
  documentId: z.string(),
  eligible: z.boolean(),
  reason: z.string(),
  computedAt: z.string(),
  scholarship: matchScholarshipSchema,
});

export const scholarshipMatchResponseSchema = z.object({
  data: z.array(scholarshipMatchSchema),
  meta: z.object({
    evaluatedCount: z.number(),
    eligibleCount: z.number(),
  }),
});
