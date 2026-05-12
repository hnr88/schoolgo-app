import type { EntryYearLevel } from '@/modules/school-search/types/filter.types';

const AGE_BY_YEAR_LEVEL: Record<EntryYearLevel, number> = {
  gr4: 9,
  gr5: 10,
  gr6: 11,
  yr7: 12,
  yr8: 13,
  yr9: 14,
  yr10: 15,
  yr11: 16,
  yr12: 17,
};

const YEAR_LEVEL_BY_AGE: Record<number, EntryYearLevel[]> = {
  9: ['gr4'],
  10: ['gr5'],
  11: ['gr6'],
  12: ['yr7'],
  13: ['yr8'],
  14: ['yr8', 'yr9'],
  15: ['yr9', 'yr10'],
  16: ['yr10', 'yr11'],
  17: ['yr11', 'yr12'],
};

export interface CricosHint {
  age: number;
  expectedYearLevels: EntryYearLevel[];
}

export function getCricosAgeHint(
  age: number | null,
  selectedYearLevels: readonly EntryYearLevel[],
): CricosHint | null {
  if (age == null || selectedYearLevels.length === 0) return null;
  const expected = YEAR_LEVEL_BY_AGE[age] ?? [];
  if (expected.length === 0) return null;
  const matchesAny = selectedYearLevels.some((yl) => expected.includes(yl));
  if (matchesAny) return null;
  return { age, expectedYearLevels: expected };
}

export function getExpectedAgeForYearLevel(level: EntryYearLevel): number {
  return AGE_BY_YEAR_LEVEL[level];
}
