import { z } from 'zod';

// Mirrors GET /api/agents/me/pipeline-forecast (A4) exactly.
export const RISK_LEVELS = ['onTrack', 'watch', 'overdue'] as const;

export const forecastRiskSchema = z.enum(RISK_LEVELS);

export const forecastBasisSchema = z.enum(['history', 'offer_deadline', 'none']);

export const forecastItemSchema = z.object({
  documentId: z.string(),
  status: z.string(),
  nextStatus: z.string().nullable(),
  statusChangedAt: z.string().nullable(),
  projectedNextStageAt: z.string().nullable(),
  medianHoursForNextStage: z.number().nullable(),
  sampleCount: z.number(),
  basis: forecastBasisSchema,
  risk: forecastRiskSchema,
  student: z
    .object({ firstName: z.string().nullable(), lastName: z.string().nullable() })
    .nullable(),
  school: z
    .object({ documentId: z.string(), name: z.string().nullable() })
    .nullable(),
});

export const forecastCountsSchema = z.object({
  overdue: z.number(),
  watch: z.number(),
  onTrack: z.number(),
});

export const pipelineForecastResponseSchema = z.object({
  data: z.array(forecastItemSchema),
  meta: z.object({
    counts: forecastCountsSchema,
    totalActive: z.number(),
    generatedAt: z.string(),
  }),
});

// Mirrors GET /api/schools/:documentId/stage-stats exactly.
export const stageStatSchema = z.object({
  fromStatus: z.string(),
  toStatus: z.string(),
  medianHours: z.number(),
  medianDays: z.number(),
  sampleCount: z.number(),
});

export const stageStatsResponseSchema = z.object({
  data: z.object({
    school: z.object({ documentId: z.string(), name: z.string().nullable() }),
    stages: z.array(stageStatSchema),
  }),
  meta: z.object({
    computedAt: z.string(),
    totalSamples: z.number(),
    stageCount: z.number(),
  }),
});
