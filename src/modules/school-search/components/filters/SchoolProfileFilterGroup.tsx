'use client';

import { useTranslations } from 'next-intl';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { FilterGroup } from '@/modules/school-search/components/filters/FilterGroup';
import { ReligiousAffiliationChips } from '@/modules/school-search/components/filters/ReligiousAffiliationChips';
import {
  ACCOMMODATION_OPTIONS,
  SECTOR_OPTIONS,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type {
  Accommodation,
  Sector,
} from '@/modules/school-search/types/filter.types';

export function SchoolProfileFilterGroup() {
  const t = useTranslations('SchoolSearch.spec');

  const sectors = useSchoolSearchStore((s) => s.sectors);
  const toggleSector = useSchoolSearchStore((s) => s.toggleSector);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const toggleAccommodation = useSchoolSearchStore((s) => s.toggleAccommodation);

  const sectorChange = (next: Sector[] | Sector | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const changed = [
      ...sectors.filter((v) => !nextArr.includes(v)),
      ...nextArr.filter((v) => !sectors.includes(v)),
    ];
    changed.forEach(toggleSector);
  };

  const accommodationChange = (next: Accommodation[] | Accommodation | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const changed = [
      ...accommodation.filter((v) => !nextArr.includes(v)),
      ...nextArr.filter((v) => !accommodation.includes(v)),
    ];
    changed.forEach(toggleAccommodation);
  };

  return (
    <FilterGroup title={t('schoolProfile.title')} defaultOpen>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('schoolProfile.sectorLabel')}
          </span>
          <FilterChipGroup<Sector>
            options={SECTOR_OPTIONS}
            value={sectors}
            onChange={sectorChange}
            multi
            ariaLabel={t('schoolProfile.sectorLabel')}
            size="sm"
            getLabel={(option) => t(option.labelKey as never)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('schoolProfile.accommodationLabel')}
          </span>
          <FilterChipGroup<Accommodation>
            options={ACCOMMODATION_OPTIONS}
            value={accommodation}
            onChange={accommodationChange}
            multi
            ariaLabel={t('schoolProfile.accommodationLabel')}
            size="sm"
            getLabel={(option) => t(option.labelKey as never)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('schoolProfile.religionLabel')}
          </span>
          <ReligiousAffiliationChips />
        </div>
      </div>
    </FilterGroup>
  );
}
