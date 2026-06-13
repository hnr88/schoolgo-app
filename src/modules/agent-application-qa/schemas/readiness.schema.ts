import { z } from 'zod';

// Verdict taxonomy returned by the backend readiness service.
export const READINESS_VERDICTS = ['ready', 'warn', 'block'] as const;

// Per-criterion fit-status taxonomy (mirrors the shared fit-scoring util).
export const READINESS_CHECK_STATUSES = ['met', 'warning', 'blocker', 'unknown'] as const;

export const readinessGapSchema = z.object({
  criterion: z.string(),
  status: z.enum(READINESS_CHECK_STATUSES),
  detail: z.string(),
});

export const schoolReadinessResultSchema = z.object({
  schoolDocumentId: z.string(),
  schoolName: z.string().nullish(),
  verdict: z.enum(READINESS_VERDICTS),
  checks: z.array(readinessGapSchema),
  gaps: z.array(readinessGapSchema),
});

// POST /students/:documentId/readiness-check is wrapped by Strapi
// transformResponse -> { data: { studentDocumentId, computedAt, results }, meta }.
export const readinessCheckResponseSchema = z.object({
  data: z.object({
    studentDocumentId: z.string(),
    computedAt: z.string(),
    results: z.array(schoolReadinessResultSchema),
  }),
});

export const readinessFormSchema = z.object({
  student: z.string().min(1),
  schools: z.array(z.string().min(1)).min(1).max(25),
});
