'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import { CompareBar } from '@/modules/school-search/components/CompareBar';
import { SpecSchoolCard } from '@/modules/school-search/components/cards/SpecSchoolCard';
import { SortControl } from '@/modules/school-search/components/results/SortControl';
import { SearchTopBar } from '@/modules/school-search/components/topbar/SearchTopBar';
import { filterMockHits } from '@/modules/school-search/lib/filter-mock-hits';
import { MOCK_SCHOOL_HITS } from '@/modules/school-search/lib/mock-search-response';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SortOption } from '@/modules/school-search/types/filter.types';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

function sortHits(hits: readonly SchoolHit[], sortBy: SortOption): SchoolHit[] {
  const arr = [...hits];
  switch (sortBy) {
    case 'name_asc':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case 'tuition_low_high':
      return arr.sort(
        (a, b) => (a.annualTuitionFrom ?? Infinity) - (b.annualTuitionFrom ?? Infinity),
      );
    case 'tuition_high_low':
      return arr.sort(
        (a, b) => (b.annualTuitionFrom ?? -Infinity) - (a.annualTuitionFrom ?? -Infinity),
      );
    case 'state_asc':
      return arr.sort((a, b) => a.state.localeCompare(b.state));
    case 'enrolment_open_first': {
      const rank: Record<string, number> = { open: 0, limited: 1, waitlist: 2, closed: 3 };
      return arr.sort(
        (a, b) => (rank[a.enrolmentStatus ?? ''] ?? 9) - (rank[b.enrolmentStatus ?? ''] ?? 9),
      );
    }
    default:
      return arr;
  }
}

interface SpecResultsPanelProps {
  className?: string;
}

export function SpecResultsPanel({ className }: SpecResultsPanelProps) {
  const t = useTranslations('SchoolSearch');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isHydrated && isAuthenticated;

  const query = useSchoolSearchStore((s) => s.query);
  const states = useSchoolSearchStore((s) => s.states);
  const sectors = useSchoolSearchStore((s) => s.sectors);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const religiousAffiliations = useSchoolSearchStore((s) => s.religiousAffiliations);
  const entryYearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const feeMin = useSchoolSearchStore((s) => s.feeMin);
  const feeMax = useSchoolSearchStore((s) => s.feeMax);
  const atarAvailable = useSchoolSearchStore((s) => s.atarAvailable);
  const englishLanguageSupport = useSchoolSearchStore((s) => s.englishLanguageSupport);
  const sortBy = useSchoolSearchStore((s) => s.sortBy);

  const hits = useMemo(() => {
    const filtered = filterMockHits(MOCK_SCHOOL_HITS, {
      q: query || undefined,
      states: states.length ? states : undefined,
      sectors: sectors.length ? sectors : undefined,
      accommodation: accommodation.length ? accommodation : undefined,
      religiousAffiliations: religiousAffiliations.length
        ? religiousAffiliations
        : undefined,
      entryYearLevels: entryYearLevels.length ? entryYearLevels : undefined,
      feeMin,
      feeMax,
      atarAvailable: atarAvailable || undefined,
      englishLanguageSupport: englishLanguageSupport || undefined,
      sortBy,
    });
    return sortHits(filtered.hits, sortBy);
  }, [
    query,
    states,
    sectors,
    accommodation,
    religiousAffiliations,
    entryYearLevels,
    feeMin,
    feeMax,
    atarAvailable,
    englishLanguageSupport,
    sortBy,
  ]);

  const schoolNamesById = useMemo(
    () => Object.fromEntries(hits.map((h) => [h.documentId, h.name])),
    [hits],
  );

  return (
    <div
      className={cn('flex flex-1 flex-col gap-3 overflow-hidden', className)}
      data-testid="spec-results-panel"
    >
      <SearchTopBar />
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="text-xs font-semibold text-muted-foreground">
          {t('results.count', { count: hits.length })}
        </span>
        <SortControl isAdvanced={isAdvanced} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pb-24 sm:grid-cols-2 xl:grid-cols-3">
        {hits.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            {t('results.empty')}
          </p>
        ) : (
          hits.map((hit) => (
            <SpecSchoolCard key={hit.documentId} hit={hit} isAdvanced={isAdvanced} />
          ))
        )}
      </div>
      <CompareBar isAdvanced={isAdvanced} schoolNamesById={schoolNamesById} />
    </div>
  );
}
