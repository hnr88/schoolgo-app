import { z } from 'zod';

// Mirrors the C1 applicant-fit endpoints on school-staff exactly:
//   GET /school-staffs/me/applicant-fit            -> cohort (paginated)
//   GET /school-staffs/me/applications/:id/fit-breakdown
//   GET/PUT /school-staffs/me/applicant-fit-config

export const fitBandSchema = z.enum(['reach', 'match', 'safety']);

export const fitStatusSchema = z.enum(['met', 'warning', 'blocker', 'unknown']);

export const fitCriterionSchema = z.enum([
  'age',
  'english',
  'gender',
  'documents',
  'quality',
  'curriculum',
  'capacity',
]);

export const fitContributionSchema = z.object({
  criterion: fitCriterionSchema,
  status: fitStatusSchema,
  detail: z.string(),
  weight: z.number(),
  fraction: z.number(),
  weightedScore: z.number(),
});

export const fitStudentSchema = z
  .object({
    documentId: z.string().nullable(),
    name: z.string(),
    nationality: z.string().nullable(),
  })
  .nullable();

export const fitAgentSchema = z
  .object({
    documentId: z.string(),
    companyName: z.string().nullable(),
  })
  .nullable();

export const applicantFitRowSchema = z.object({
  applicationDocumentId: z.string(),
  status: z.string(),
  submittedAt: z.string(),
  targetYearLevel: z.string().nullable(),
  targetIntake: z.string().nullable(),
  student: fitStudentSchema,
  agent: fitAgentSchema,
  score: z.number(),
  band: fitBandSchema,
  overallFit: fitStatusSchema,
  contributions: z.array(fitContributionSchema),
});

export const fitPaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export const applicantFitResponseSchema = z.object({
  data: z.array(applicantFitRowSchema),
  meta: z.object({ pagination: fitPaginationSchema }),
});

export const fitWeightsSchema = z.object({
  age: z.number(),
  english: z.number(),
  gender: z.number(),
  documents: z.number(),
  quality: z.number(),
  curriculum: z.number(),
  capacity: z.number(),
});

export const fitThresholdsSchema = z.object({
  reach: z.number(),
  match: z.number(),
  safety: z.number(),
});

export const applicantFitConfigSchema = z.object({
  documentId: z.string().nullable(),
  weights: fitWeightsSchema,
  thresholds: fitThresholdsSchema,
  active: z.boolean(),
});

export const applicantFitConfigResponseSchema = z.object({
  data: applicantFitConfigSchema,
});

export const fitBreakdownSchema = z.object({
  applicationDocumentId: z.string(),
  student: fitStudentSchema,
  score: z.number(),
  band: fitBandSchema,
  overallFit: fitStatusSchema,
  contributions: z.array(fitContributionSchema),
  config: z.object({ weights: fitWeightsSchema, thresholds: fitThresholdsSchema }),
});

export const fitBreakdownResponseSchema = z.object({
  data: fitBreakdownSchema,
});
