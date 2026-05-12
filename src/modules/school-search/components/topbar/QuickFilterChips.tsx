'use client';

import { useTranslations } from 'next-intl';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import {
  PRIMARY_YEAR_LEVELS,
  QUICK_CHIP_OPTIONS,
  SECONDARY_YEAR_LEVELS,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type {
  EntryYearLevel,
  Gender,
  QuickChipId,
} from '@/modules/school-search/types/filter.types';

function deriveSelectedChips(
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

export function QuickFilterChips() {
  const t = useTranslations('SchoolSearch.spec');

  const gender = useSchoolSearchStore((s) => s.gender);
  const toggleGender = useSchoolSearchStore((s) => s.toggleGender);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const toggleAccommodation = useSchoolSearchStore((s) => s.toggleAccommodation);
  const entryYearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const setEntryYearLevels = useSchoolSearchStore((s) => s.setEntryYearLevels);

  const selected = deriveSelectedChips(gender, accommodation, entryYearLevels);

  const applyChip = (id: QuickChipId, willSelect: boolean) => {
    if (id === 'boys' || id === 'girls' || id === 'co-ed') {
      const isInGender = gender.includes(id);
      if (willSelect !== isInGender) toggleGender(id);
      return;
    }
    if (id === 'boarding') {
      const isInAccom = accommodation.includes('boarding');
      if (willSelect !== isInAccom) toggleAccommodation('boarding');
      return;
    }
    if (id === 'primary') {
      if (willSelect) {
        const next = Array.from(new Set([...entryYearLevels, ...PRIMARY_YEAR_LEVELS]));
        setEntryYearLevels(next);
      } else {
        setEntryYearLevels(
          entryYearLevels.filter((y) => !PRIMARY_YEAR_LEVELS.includes(y)),
        );
      }
      return;
    }
    if (id === 'secondary') {
      if (willSelect) {
        const next = Array.from(new Set([...entryYearLevels, ...SECONDARY_YEAR_LEVELS]));
        setEntryYearLevels(next);
      } else {
        setEntryYearLevels(
          entryYearLevels.filter((y) => !SECONDARY_YEAR_LEVELS.includes(y)),
        );
      }
    }
  };

  const handleChange = (next: QuickChipId[] | QuickChipId | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const removed = selected.filter((v) => !nextArr.includes(v));
    const added = nextArr.filter((v) => !selected.includes(v));
    removed.forEach((id) => applyChip(id, false));
    added.forEach((id) => applyChip(id, true));
  };

  return (
    <FilterChipGroup<QuickChipId>
      options={QUICK_CHIP_OPTIONS}
      value={selected}
      onChange={handleChange}
      multi
      ariaLabel={t('topBar.feeLabel')}
      size="sm"
      getLabel={(option) => t(option.labelKey as never)}
    />
  );
}
