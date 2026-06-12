'use client';

import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ADVANCED_SORT_OPTIONS } from '@/modules/school-search/constants/filter-options.constants';
import { isAdvancedSort } from '@/modules/school-search/lib/search-capabilities';
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

  const handleChange = (value: SortOption | null) => {
    if (!value) return;
    if (!isAdvanced && isAdvancedSort(value)) return;
    setSortBy(value);
  };

  return (
    <Select value={sortBy} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        aria-label={t('label')}
        className={cn('h-9! gap-1.5 rounded-pill text-body-sm font-medium', className)}
      >
        <span className="text-muted-foreground">{t('label')}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-64 p-1">
        {ADVANCED_SORT_OPTIONS.map((opt) => {
          const locked = !isAdvanced && isAdvancedSort(opt.value);
          return (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={locked}
              className="min-h-9 gap-1.5 py-1.5 pl-3 text-body-sm"
            >
              <span className="inline-flex items-center gap-1.5">
                {locked && (
                  <Lock
                    className="size-3 text-muted-foreground"
                    aria-label={t('lockedOption')}
                  />
                )}
                {t(opt.labelKey.split('.').pop() as never)}
              </span>
            </SelectItem>
          );
        })}
        {!isAdvanced && (
          <div className="mt-1 border-t border-divider px-1 pt-1">
            <Link
              href="/sign-in"
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2 py-2 text-body-sm font-medium text-primary',
                'transition-colors hover:bg-accent',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              )}
            >
              <Lock className="size-3.5 shrink-0" aria-hidden="true" />
              {t('signInCta')}
            </Link>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
