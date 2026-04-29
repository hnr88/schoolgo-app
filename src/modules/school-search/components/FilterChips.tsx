'use client';
import { useTranslations } from 'next-intl';
import { Chip } from '@/modules/design-system';
import { FILTER_CHIP_IDS } from '@/modules/school-search/constants/school.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { cn } from '@/lib/utils';
import type { FilterChipsProps } from '@/modules/school-search/types/component.types';

export function FilterChips({ className }: FilterChipsProps) {
  const t = useTranslations('SchoolSearch.chips');
  const activeChips = useSchoolSearchStore((s) => s.activeChips);
  const toggleChip = useSchoolSearchStore((s) => s.toggleChip);

  return (
    <div className={cn('no-scrollbar flex items-center gap-2 overflow-x-auto pb-2', className)}>
      {FILTER_CHIP_IDS.map((id) => {
        const isActive = activeChips.includes(id);
        return (
          <Chip
            key={id}
            selected={isActive}
            onClick={() => toggleChip(id)}
            className='whitespace-nowrap'
          >
            {t(id)}
          </Chip>
        );
      })}
    </div>
  );
}
