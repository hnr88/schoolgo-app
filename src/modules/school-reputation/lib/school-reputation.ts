import { REVIEW_DIMENSIONS } from '@/modules/school-reputation/constants/school-reputation.constants';
import type {
  Benchmark,
  BenchmarkRow,
  ReputationReview,
} from '@/modules/school-reputation/types/school-reputation.types';

export function buildBenchmarkRows(benchmark: Benchmark): BenchmarkRow[] {
  return REVIEW_DIMENSIONS.map((dimension) => ({
    dimension,
    own: benchmark.own.dimensionAverages[dimension] ?? null,
    sector: benchmark.sector.dimensionAverages[dimension] ?? null,
    state: benchmark.state.dimensionAverages[dimension] ?? null,
  }));
}

export function formatScore(value: number | null): string | null {
  return typeof value === 'number' ? value.toFixed(1) : null;
}

/** Signed gap of own vs peer, rounded to one decimal. `null` when either side is missing. */
export function scoreDelta(own: number | null, peer: number | null): number | null {
  if (typeof own !== 'number' || typeof peer !== 'number') return null;
  return Math.round((own - peer) * 10) / 10;
}

export function countUnanswered(reviews: ReputationReview[]): number {
  return reviews.reduce((total, review) => (review.hasResponse ? total : total + 1), 0);
}
