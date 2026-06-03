import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export type CompareFormat = 'text' | 'enum' | 'currency' | 'boolean' | 'number';

export interface CompareAttribute {
  key: keyof SchoolHit;
  labelKey: string;
  format: CompareFormat;
}

export interface CompareLabels {
  yes: string;
  no: string;
  empty: string;
}

export type { SchoolHit };
