'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/auth';
import { SortControl } from '@/modules/school-search/components/results/SortControl';
import { SpecResultsList } from '@/modules/school-search/components/SpecResultsList';
import { SpecResultsPanelHeader } from '@/modules/school-search/components/SpecResultsPanelHeader';
import {
  mapStoreToTypedRequest,
  type SchoolSearchStoreSnapshot,
} from '@/modules/school-search/lib/store-to-typed-request';
import { useTypedSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SpecResultsPanelProps } from '@/modules/school-search/types/component.types';

export function SpecResultsPanel({
  activePortal,
  className,
  alwaysOn = false,
  floating = false,
}: SpecResultsPanelProps) {
  const t = useTranslations('SchoolSearch');
  const searchParams = useSearchParams();
  const isActive = alwaysOn || searchParams.get('preview') === 'spec';

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isHydrated && isAuthenticated;

  const query = useSchoolSearchStore((s) => s.query);
  const suburb = useSchoolSearchStore((s) => s.suburb);
  const postcode = useSchoolSearchStore((s) => s.postcode);
  const states = useSchoolSearchStore((s) => s.states);
  const sectors = useSchoolSearchStore((s) => s.sectors);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const religiousAffiliations = useSchoolSearchStore((s) => s.religiousAffiliations);
  const entryYearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const studentAge = useSchoolSearchStore((s) => s.studentAge);
  const entryTerms = useSchoolSearchStore((s) => s.entryTerms);
  const programTypes = useSchoolSearchStore((s) => s.programTypes);
  const atarAvailable = useSchoolSearchStore((s) => s.atarAvailable);
  const englishLanguageSupport = useSchoolSearchStore((s) => s.englishLanguageSupport);
  const scholarshipAvailable = useSchoolSearchStore((s) => s.scholarshipAvailable);
  const englishTest = useSchoolSearchStore((s) => s.englishTest);
  const feeMin = useSchoolSearchStore((s) => s.feeMin);
  const feeMax = useSchoolSearchStore((s) => s.feeMax);
  const sortBy = useSchoolSearchStore((s) => s.sortBy);

  const snapshot: SchoolSearchStoreSnapshot = {
    query,
    suburb,
    postcode,
    states,
    sectors,
    accommodation,
    religiousAffiliations,
    entryYearLevels,
    studentAge,
    entryTerms,
    programTypes,
    atarAvailable,
    englishLanguageSupport,
    scholarshipAvailable,
    englishTest,
    feeMin,
    feeMax,
    sortBy,
  };

  const typedRequest = mapStoreToTypedRequest(snapshot, isAdvanced);
  const { data, error, isLoading, isError, refetch } = useTypedSchoolSearch(typedRequest);

  useEffect(() => {
    if (error) {
      console.error('[SpecResultsPanel] search failed', error);
    }
  }, [error]);

  const hits = data?.data.hits ?? [];
  const count = data?.data.total ?? 0;
  const handleRetry = () => {
    void refetch();
  };

  if (!isActive) return null;

  if (floating) {
    return (
      <aside
        className={cn(
          'absolute right-3 top-3 bottom-3 z-10 flex w-80 flex-col gap-2 overflow-hidden rounded-lg border border-border bg-card shadow-2',
          className,
        )}
        data-testid="spec-results-panel"
      >
        <SpecResultsPanelHeader count={count} />
        <div className="flex shrink-0 items-center justify-end gap-2 px-3">
          <SortControl isAdvanced={isAdvanced} />
        </div>
        <SpecResultsList
          hits={hits}
          isAdvanced={isAdvanced}
          activePortal={activePortal}
          isLoading={isLoading}
          isError={isError}
          onRetry={handleRetry}
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3"
        />
      </aside>
    );
  }

  return (
    <div
      className={cn('flex flex-1 flex-col gap-3 overflow-hidden', className)}
      data-testid="spec-results-panel"
    >
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="text-xs font-semibold text-muted-foreground">
          {t('results.count', { count })}
        </span>
        <SortControl isAdvanced={isAdvanced} />
      </div>
      <SpecResultsList
        hits={hits}
        isAdvanced={isAdvanced}
        activePortal={activePortal}
        isLoading={isLoading}
        isError={isError}
        onRetry={handleRetry}
        className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pb-24 sm:grid-cols-2 xl:grid-cols-3"
        emptyClassName="col-span-full"
      />
    </div>
  );
}
