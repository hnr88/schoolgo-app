import {
  PRIMARY_YEAR_LEVELS,
  SECONDARY_YEAR_LEVELS,
} from '@/modules/school-search/constants/filter-options.constants';
import type {
  EntryYearLevel,
  Gender,
  QuickChipId,
} from '@/modules/school-search/types/filter.types';

export function deriveSelectedChips(
  gender: readonly Gender[],
  accommodation: readonly string[],
  entryYearLevels: readonly EntryYearLevel[],
): QuickChipId[] {
  const selected: QuickChipId[] = [];
  if (gender.includes('boys')) selected.push('boys');
  if (gender.includes('girls')) selected.push('girls');
  if (gender.includes('co-ed')) selected.push('co-ed');
  if (accommodation.includes('boarding') || accommodation.includes('both')) {
    selected.push('boarding');
  }
  if (PRIMARY_YEAR_LEVELS.every((y) => entryYearLevels.includes(y))) {
    selected.push('primary');
  }
  if (SECONDARY_YEAR_LEVELS.every((y) => entryYearLevels.includes(y))) {
    selected.push('secondary');
  }
  return selected;
}
