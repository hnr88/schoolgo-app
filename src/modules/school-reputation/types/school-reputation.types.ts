import type { z } from 'zod';
import type {
  benchmarkResponseSchema,
  flagSchema,
  reputationAggregateSchema,
  reputationReviewSchema,
  reputationReviewsResponseSchema,
  respondSchema,
  reviewResponseSchema,
} from '@/modules/school-reputation/schemas/school-reputation.schema';

export type ReviewDimension =
  | 'academics'
  | 'pastoral'
  | 'value'
  | 'facilities'
  | 'comms'
  | 'eal';

export type ReputationReview = z.infer<typeof reputationReviewSchema>;
export type ReputationAggregate = z.infer<typeof reputationAggregateSchema>;
export type ReputationReviewsResponse = z.infer<typeof reputationReviewsResponseSchema>;
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
export type BenchmarkResponse = z.infer<typeof benchmarkResponseSchema>;
export type Benchmark = BenchmarkResponse['data'];

export type RespondValues = z.infer<typeof respondSchema>;
export type FlagValues = z.infer<typeof flagSchema>;

export interface BenchmarkRow {
  dimension: ReviewDimension;
  own: number | null;
  sector: number | null;
  state: number | null;
}
