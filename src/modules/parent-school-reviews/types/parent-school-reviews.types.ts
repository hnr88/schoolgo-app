import type {
  reviewAggregateSchema,
  reviewListItemSchema,
  reviewsForSchoolResponseSchema,
  writeReviewSchema,
} from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';
import type { z } from 'zod';

export type ReviewDimension =
  | 'academics'
  | 'pastoral'
  | 'value'
  | 'facilities'
  | 'comms'
  | 'eal';

export type ReviewListItem = z.infer<typeof reviewListItemSchema>;
export type ReviewAggregate = z.infer<typeof reviewAggregateSchema>;
export type ReviewsForSchoolResponse = z.infer<typeof reviewsForSchoolResponseSchema>;
export type WriteReviewValues = z.infer<typeof writeReviewSchema>;

export interface ReviewableSchool {
  documentId: string;
  name: string;
}

export interface ParentReviewWithSchool extends ReviewListItem {
  school: ReviewableSchool;
}

export interface WriteReviewPayload {
  overallStar: number;
  dimensionScores: Record<ReviewDimension, number>;
  body?: string;
  wouldRecommend: boolean;
  consideredSwitching: boolean;
}
