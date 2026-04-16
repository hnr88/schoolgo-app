'use client';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { FILTER_CHIP_IDS } from '@/modules/school-search/constants/school.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

export function FilterChips() {
  const t = useTranslations('SchoolSearch.chips');
  const activeChips = useSchoolSearchStore((s) => s.activeChips);
  const toggleChip = useSchoolSearchStore((s) => s.toggleChip);

  return (
    <div className='flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar'>
      {FILTER_CHIP_IDS.map((id) => {
        const isActive = activeChips.includes(id);
        return (
          <button
            key={id}
            type='button'
            onClick={() => toggleChip(id)}
            aria-pressed={isActive}
            className={cn(
              'whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-colors',
              isActive
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high shadow-sm shadow-on-surface/5',
            )}
          >
            {t(id)}
          </button>
        );
      })}
    </div>
  );
}
