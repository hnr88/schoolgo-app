import { z } from 'zod';

export const reviewDimensionSchema = z.enum([
  'academics',
  'pastoral',
  'value',
  'facilities',
  'comms',
  'eal',
]);

export const reviewListItemSchema = z.object({
  documentId: z.string(),
  overallStar: z.number().int().nullable(),
  body: z.string().nullable(),
  wouldRecommend: z.boolean(),
  consideredSwitching: z.boolean(),
  dimensionScores: z.record(reviewDimensionSchema, z.number()).nullable(),
  verifiedRelationship: z.boolean(),
  helpfulCount: z.number().int(),
  createdAt: z.string(),
  authorName: z.string().nullable(),
});

export const reviewAggregateSchema = z.object({
  count: z.number().int(),
  avgRating: z.number().nullable(),
  dimensionAverages: z.record(reviewDimensionSchema, z.number().nullable()),
});

export const reviewsForSchoolResponseSchema = z.object({
  data: z.array(reviewListItemSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number().int(),
      pageSize: z.number().int(),
      pageCount: z.number().int(),
      total: z.number().int(),
    }),
    aggregate: reviewAggregateSchema,
  }),
});

export const helpfulResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
    helpfulCount: z.number().int(),
    alreadyVoted: z.boolean(),
  }),
});

const dimensionScoreField = z.number().int().min(1).max(5);

export const writeReviewSchema = z.object({
  schoolDocumentId: z.string().min(1, 'schoolRequired'),
  overallStar: z.number().int().min(1, 'overallStarRequired').max(5),
  academics: dimensionScoreField,
  pastoral: dimensionScoreField,
  value: dimensionScoreField,
  facilities: dimensionScoreField,
  comms: dimensionScoreField,
  eal: dimensionScoreField,
  body: z.string().trim().max(5000, 'bodyTooLong').optional(),
  wouldRecommend: z.boolean(),
  consideredSwitching: z.boolean(),
});

export type WriteReviewValues = z.infer<typeof writeReviewSchema>;
