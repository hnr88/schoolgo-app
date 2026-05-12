'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import {
  RELIGIOUS_AFFILIATION_DEFAULT,
  RELIGIOUS_AFFILIATION_EXTRA,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { ReligiousAffiliation } from '@/modules/school-search/types/filter.types';

const TOTAL_COUNT =
  RELIGIOUS_AFFILIATION_DEFAULT.length + RELIGIOUS_AFFILIATION_EXTRA.length;

export function ReligiousAffiliationChips() {
  const t = useTranslations('SchoolSearch.spec');
  const values = useSchoolSearchStore((s) => s.religiousAffiliations);
  const toggle = useSchoolSearchStore((s) => s.toggleReligiousAffiliation);

  const [showAll, setShowAll] = useState(false);
  const options = showAll
    ? [...RELIGIOUS_AFFILIATION_DEFAULT, ...RELIGIOUS_AFFILIATION_EXTRA]
    : RELIGIOUS_AFFILIATION_DEFAULT;

  const handleChange = (next: ReligiousAffiliation[] | ReligiousAffiliation | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const removed = values.filter((v) => !nextArr.includes(v));
    const added = nextArr.filter((v) => !values.includes(v));
    [...removed, ...added].forEach(toggle);
  };

  return (
    <div className="flex flex-col gap-2">
      <FilterChipGroup<ReligiousAffiliation>
        options={options}
        value={values}
        onChange={handleChange}
        multi
        ariaLabel={t('schoolProfile.religionLabel')}
        size="sm"
        getLabel={(option) => t(option.labelKey as never)}
      />
      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        className="self-start text-xs font-medium text-primary underline-offset-2 hover:underline"
      >
        {showAll ? t('showFewer') : t('showAll', { count: TOTAL_COUNT })}
      </button>
    </div>
  );
}
