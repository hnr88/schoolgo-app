import { z } from 'zod';

export const reviewDimensionSchema = z.enum([
  'academics',
  'pastoral',
  'value',
  'facilities',
  'comms',
  'eal',
]);

export const reviewStatusSchema = z.enum(['pending', 'published', 'flagged']);

export const reviewResponseSchema = z.object({
  documentId: z.string(),
  body: z.string().nullable(),
  status: z.string(),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  authorStaff: z
    .object({
      documentId: z.string().nullable(),
      roleTitle: z.string().nullable(),
      name: z.string().nullable(),
    })
    .nullable(),
});

export const reputationReviewSchema = z.object({
  documentId: z.string(),
  overallStar: z.number().int().nullable(),
  body: z.string().nullable(),
  wouldRecommend: z.boolean(),
  consideredSwitching: z.boolean(),
  dimensionScores: z.record(reviewDimensionSchema, z.number()).nullable(),
  status: reviewStatusSchema.or(z.string()),
  verifiedRelationship: z.boolean(),
  helpfulCount: z.number().int(),
  createdAt: z.string(),
  authorName: z.string().nullable(),
  hasResponse: z.boolean(),
  response: reviewResponseSchema.nullable(),
});

export const reputationAggregateSchema = z.object({
  count: z.number().int(),
  avgRating: z.number().nullable(),
  dimensionAverages: z.record(reviewDimensionSchema, z.number().nullable()),
});

export const reputationReviewsResponseSchema = z.object({
  data: z.array(reputationReviewSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number().int(),
      pageSize: z.number().int(),
      pageCount: z.number().int(),
      total: z.number().int(),
    }),
    aggregate: reputationAggregateSchema,
  }),
});

const dimensionAveragesGroupSchema = z.object({
  count: z.number().int(),
  avgRating: z.number().nullable(),
  dimensionAverages: z.record(reviewDimensionSchema, z.number().nullable()),
});

export const benchmarkResponseSchema = z.object({
  data: z.object({
    school: z.object({
      documentId: z.string(),
      sector: z.string().nullable(),
      state: z.string().nullable(),
    }),
    own: dimensionAveragesGroupSchema,
    sector: dimensionAveragesGroupSchema.extend({ key: z.string().nullable() }),
    state: dimensionAveragesGroupSchema.extend({ key: z.string().nullable() }),
  }),
  meta: z.object({ dimensions: z.array(reviewDimensionSchema) }),
});

export const respondResponseSchema = z.object({ data: reviewResponseSchema.nullable() });

export const flagResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
    reason: z.string().nullable(),
    status: z.string(),
    createdAt: z.string(),
  }),
});

export const respondSchema = z.object({
  body: z.string().trim().min(1, 'responseRequired').max(5000, 'responseTooLong'),
});

export const flagSchema = z.object({
  reason: z.string().trim().min(1, 'reasonRequired').max(2000, 'reasonTooLong'),
});

export type RespondValues = z.infer<typeof respondSchema>;
export type FlagValues = z.infer<typeof flagSchema>;
