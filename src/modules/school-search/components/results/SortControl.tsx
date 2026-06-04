'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ADVANCED_SORT_OPTIONS,
  BASIC_SORT_OPTIONS,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SortOption } from '@/modules/school-search/types/filter.types';

interface SortControlProps {
  isAdvanced: boolean;
  className?: string;
}

export function SortControl({ isAdvanced, className }: SortControlProps) {
  const t = useTranslations('SchoolSearch.spec.sort');
  const sortBy = useSchoolSearchStore((s) => s.sortBy);
  const setSortBy = useSchoolSearchStore((s) => s.setSortBy);

  const options = isAdvanced ? ADVANCED_SORT_OPTIONS : BASIC_SORT_OPTIONS;

  const handleChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  return (
    <Select value={sortBy} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        aria-label={t('label')}
        className={cn('gap-1.5 rounded-pill text-xs font-medium', className)}
      >
        <span className="text-muted-foreground">{t('label')}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {t(opt.labelKey.split('.').pop() as never)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
