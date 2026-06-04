import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export type CompareFormat =
  | 'text'
  | 'enum'
  | 'currency'
  | 'boolean'
  | 'number'
  | 'percent';

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

/** Resolves a raw enum value to a localized label, or null when unknown. */
export type EnumTranslator = (value: string) => string | null;

export interface CompareFormatHelpers {
  labels: CompareLabels;
  translateEnum: EnumTranslator;
  formatPercent: (value: number) => string;
}

export type { SchoolHit };
