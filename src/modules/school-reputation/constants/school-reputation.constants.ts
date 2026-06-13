import type { ReviewDimension } from '@/modules/school-reputation/types/school-reputation.types';

export const SCHOOL_REPUTATION_REVIEWS_QUERY_KEY = ['school-reputation', 'reviews'] as const;

export const SCHOOL_REPUTATION_BENCHMARK_QUERY_KEY = ['school-reputation', 'benchmark'] as const;

export const SCHOOL_REPUTATION_PAGE_SIZE = 100;

export const REVIEW_DIMENSIONS: readonly ReviewDimension[] = [
  'academics',
  'pastoral',
  'value',
  'facilities',
  'comms',
  'eal',
] as const;

export const REVIEW_STAR_VALUES = [1, 2, 3, 4, 5] as const;

export const REVIEW_STATUS_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  published: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  pending: { dot: 'bg-foggy/60', bg: 'bg-muted', text: 'text-foggy' },
  flagged: { dot: 'bg-vivid-coral-strong', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};
