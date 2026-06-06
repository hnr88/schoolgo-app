import type { TuitionBasis } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

export const YEAR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export const DEFAULT_YEARS = 4;

export const RATE_OPTIONS = [0, 3, 5, 7] as const;
export const DEFAULT_RATE_PCT = 5;

export const TUITION_BASIS_OPTIONS: readonly TuitionBasis[] = ['lowest', 'highest'];
export const DEFAULT_TUITION_BASIS: TuitionBasis = 'lowest';
