import { z } from 'zod';

// Mirrors the C-A5 response of GET /api/agents/me/analytics exactly.
export const schoolAnalyticsRowSchema = z.object({
  schoolDocumentId: z.string(),
  schoolName: z.string().nullable(),
  submitted: z.number(),
  offers: z.number(),
  enrolled: z.number(),
  offerRate: z.number(),
  avgDaysToOffer: z.number().nullable(),
});

export const analyticsTotalsSchema = z.object({
  applications: z.number(),
  submitted: z.number(),
  offers: z.number(),
  enrolled: z.number(),
  offerRate: z.number(),
  avgDaysToOffer: z.number().nullable(),
});

export const agentAnalyticsResponseSchema = z.object({
  data: z.object({
    bySchool: z.array(schoolAnalyticsRowSchema),
    totals: analyticsTotalsSchema,
  }),
});
