import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export type TuitionBasis = 'lowest' | 'highest';

export interface CostProjection {
  /** Estimated tuition for each enrolled year, indexed for fee growth. */
  perYear: number[];
  /** Sum of every year in `perYear`. */
  total: number;
}

export interface CostEstimatorRow {
  documentId: string;
  name: string;
  slug: string;
  location: string;
  logoUrl: string | null;
  scholarshipAvailable: boolean;
  boardingAvailable: boolean;
  /** Selected annual tuition, or null when the school publishes no fee. */
  annualBase: number | null;
  /** Multi-year projection, or null when `annualBase` is null. */
  projection: CostProjection | null;
  /** True for the cheapest priced school in the current selection. */
  isCheapest: boolean;
}

export interface CostEstimatorSummary {
  pricedCount: number;
  unpricedCount: number;
  cheapestTotal: number | null;
  dearestTotal: number | null;
  averageTotal: number | null;
}

export type { SchoolHit };
