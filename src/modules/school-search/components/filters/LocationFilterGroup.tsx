'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { FilterGroup } from '@/modules/school-search/components/filters/FilterGroup';
import { STATE_FILTER_OPTIONS } from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { AustralianState } from '@/modules/school-search/types/school.types';

export function LocationFilterGroup() {
  const t = useTranslations('SchoolSearch.spec.location');
  const tStates = useTranslations('SchoolSearch.states');

  const states = useSchoolSearchStore((s) => s.states);
  const setStates = useSchoolSearchStore((s) => s.setStates);
  const suburb = useSchoolSearchStore((s) => s.suburb);
  const setSuburb = useSchoolSearchStore((s) => s.setSuburb);

  const [suburbDraft, setSuburbDraft] = useState(suburb);

  const handleStatesChange = (next: AustralianState[] | AustralianState | null) => {
    if (Array.isArray(next)) {
      setStates(next);
      return;
    }
    setStates(next ? [next] : []);
  };

  const commitSuburb = () => {
    if (suburbDraft.trim() !== suburb) {
      setSuburb(suburbDraft.trim());
    }
  };

  return (
    <FilterGroup title={t('title')} defaultOpen>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">{t('stateLabel')}</span>
          <FilterChipGroup<AustralianState>
            options={STATE_FILTER_OPTIONS}
            value={states}
            onChange={handleStatesChange}
            multi
            ariaLabel={t('stateLabel')}
            size="sm"
            getLabel={(option) => tStates(option.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="spec-suburb-input"
            className="text-xs font-medium text-muted-foreground"
          >
            {t('suburbLabel')}
          </label>
          <Input
            id="spec-suburb-input"
            type="text"
            inputMode="text"
            placeholder={t('suburbPlaceholder')}
            value={suburbDraft}
            onChange={(e) => setSuburbDraft(e.target.value)}
            onBlur={commitSuburb}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitSuburb();
              }
            }}
          />
        </div>
      </div>
    </FilterGroup>
  );
}
