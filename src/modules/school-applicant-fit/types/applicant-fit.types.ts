import type { z } from 'zod';
import type {
  applicantFitConfigSchema,
  applicantFitResponseSchema,
  applicantFitRowSchema,
  fitBandSchema,
  fitBreakdownSchema,
  fitContributionSchema,
  fitCriterionSchema,
  fitPaginationSchema,
  fitStatusSchema,
  fitThresholdsSchema,
  fitWeightsSchema,
} from '@/modules/school-applicant-fit/schemas/applicant-fit.schema';

export type FitBand = z.infer<typeof fitBandSchema>;
export type FitStatus = z.infer<typeof fitStatusSchema>;
export type FitCriterion = z.infer<typeof fitCriterionSchema>;
export type FitContribution = z.infer<typeof fitContributionSchema>;
export type ApplicantFitRow = z.infer<typeof applicantFitRowSchema>;
export type FitPagination = z.infer<typeof fitPaginationSchema>;
export type ApplicantFitResponse = z.infer<typeof applicantFitResponseSchema>;
export type FitWeights = z.infer<typeof fitWeightsSchema>;
export type FitThresholds = z.infer<typeof fitThresholdsSchema>;
export type ApplicantFitConfig = z.infer<typeof applicantFitConfigSchema>;
export type FitBreakdown = z.infer<typeof fitBreakdownSchema>;

export type FitSortField = 'score' | 'band';
export type FitSortOrder = 'asc' | 'desc';

export interface ApplicantFitQueryParams {
  sort: FitSortField;
  order: FitSortOrder;
  page: number;
  pageSize: number;
}

export interface UpdateFitConfigInput {
  weights: FitWeights;
  thresholds: FitThresholds;
}
