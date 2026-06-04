'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AnnualFeeSlider } from '@/modules/school-search/components/topbar/AnnualFeeSlider';
import { QuickFilterChips } from '@/modules/school-search/components/topbar/QuickFilterChips';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface SearchTopBarProps {
  className?: string;
}

export function SearchTopBar({ className }: SearchTopBarProps) {
  const t = useTranslations('SchoolSearch.spec.topBar');
  const query = useSchoolSearchStore((s) => s.query);
  const setQuery = useSchoolSearchStore((s) => s.setQuery);

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-1',
        className,
      )}
      data-testid="spec-top-bar"
    >
      <div className="relative min-w-72 flex-1">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="pl-9"
          aria-label={t('searchPlaceholder')}
        />
      </div>
      <AnnualFeeSlider />
      <QuickFilterChips />
    </div>
  );
}
