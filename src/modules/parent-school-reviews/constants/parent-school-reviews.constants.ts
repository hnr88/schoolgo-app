import type { ReviewDimension } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

export const PARENT_REVIEWS_QUERY_KEY = ['parent', 'school-reviews'] as const;

export const PARENT_REVIEW_SCHOOLS_QUERY_KEY = ['parent', 'review-schools'] as const;

export const PARENT_REVIEWS_PAGE_SIZE = 50;

export const REVIEW_DIMENSIONS: readonly ReviewDimension[] = [
  'academics',
  'pastoral',
  'value',
  'facilities',
  'comms',
  'eal',
] as const;

export const REVIEW_STAR_VALUES = [1, 2, 3, 4, 5] as const;
