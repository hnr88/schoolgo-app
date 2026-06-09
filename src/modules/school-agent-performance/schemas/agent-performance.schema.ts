import { z } from 'zod';

// Mirrors the C-S5 response of GET /api/school-staffs/me/analytics/agent-performance exactly.
export const agentPerformanceRowSchema = z.object({
  agentDocumentId: z.string().nullable(),
  companyName: z.string().nullable(),
  submitted: z.number(),
  offers: z.number(),
  accepted: z.number(),
  enrolled: z.number(),
  offerRate: z.number(),
  acceptanceRate: z.number(),
  avgDaysToOffer: z.number().nullable(),
});

export const agentPerformanceTotalsSchema = z.object({
  applications: z.number(),
  submitted: z.number(),
  offers: z.number(),
  accepted: z.number(),
  enrolled: z.number(),
  offerRate: z.number(),
  acceptanceRate: z.number(),
  avgDaysToOffer: z.number().nullable(),
});

export const agentPerformanceResponseSchema = z.object({
  data: z.object({
    byAgent: z.array(agentPerformanceRowSchema),
    totals: agentPerformanceTotalsSchema,
  }),
});
