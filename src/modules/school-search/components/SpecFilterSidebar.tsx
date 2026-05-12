'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { useAuthStore } from '@/modules/auth';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AcademicFilterGroup } from '@/modules/school-search/components/filters/AcademicFilterGroup';
import { EnglishTestFilterGroup } from '@/modules/school-search/components/filters/EnglishTestFilterGroup';
import { EnrolmentFilterGroup } from '@/modules/school-search/components/filters/EnrolmentFilterGroup';
import { LocationFilterGroup } from '@/modules/school-search/components/filters/LocationFilterGroup';
import { SchoolProfileFilterGroup } from '@/modules/school-search/components/filters/SchoolProfileFilterGroup';
import { SaveSearchButton } from '@/modules/school-search/components/SaveSearchButton';
import {
  FEE_MAX,
  FEE_MIN,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface SpecFilterSidebarProps {
  className?: string;
  alwaysOn?: boolean;
}

export function SpecFilterSidebar({ className, alwaysOn = false }: SpecFilterSidebarProps) {
  const t = useTranslations('SchoolSearch.spec');
  const tFilters = useTranslations('SchoolSearch.filters');
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isHydrated && isAuthenticated;

  const reset = useSchoolSearchStore((s) => s.reset);
  const activeFilterCount = useSchoolSearchStore((s) => {
    let count = 0;
    if (s.suburb) count += 1;
    if (s.postcode) count += 1;
    if (s.states.length > 0) count += 1;
    if (s.feeMin !== FEE_MIN || s.feeMax !== FEE_MAX) count += 1;
    if (s.sectors.length > 0) count += 1;
    if (s.accommodation.length > 0) count += 1;
    if (s.religiousAffiliations.length > 0) count += 1;
    if (s.entryYearLevels.length > 0) count += 1;
    if (s.studentAge != null) count += 1;
    if (s.entryTerms.length > 0) count += 1;
    if (s.programTypes.length > 0) count += 1;
    if (s.atarAvailable) count += 1;
    if (s.englishLanguageSupport) count += 1;
    if (s.englishTest != null) count += 1;
    if (s.gender.length > 0) count += 1;
    return count;
  });
  const hasActiveFilters = activeFilterCount > 0;

  if (!alwaysOn && searchParams.get('preview') !== 'spec') return null;

  return (
    <aside
      className={cn(
        'hidden shrink-0 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4.5rem)] lg:w-[22rem] lg:py-6 lg:pl-3',
        className,
      )}
      data-testid="spec-filter-sidebar"
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-primary/40 bg-card shadow-2">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-divider bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-caption font-semibold uppercase text-primary">
              {t(isAdvanced ? 'modeBadge.advanced' : 'modeBadge.basic')}
            </span>
            {hasActiveFilters && (
              <Badge variant="secondary" aria-label={`${activeFilterCount} active filters`}>
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => reset()}
              className={cn(
                'inline-flex items-center gap-1 rounded text-caption text-muted-foreground',
                'transition-colors hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              )}
            >
              <RotateCcw className="size-3" aria-hidden="true" />
              {tFilters('resetAll')}
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 divide-y divide-divider overflow-y-auto px-4">
          <LocationFilterGroup />
          <SchoolProfileFilterGroup />
          <EnrolmentFilterGroup isAdvanced={isAdvanced} />
          <AcademicFilterGroup isAdvanced={isAdvanced} />
          <EnglishTestFilterGroup isAdvanced={isAdvanced} />
          <div className="py-4">
            <SaveSearchButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
