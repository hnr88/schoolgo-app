'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/modules/auth';
import { filterMockHits } from '@/modules/school-search/lib/filter-mock-hits';
import { MOCK_SCHOOL_HITS } from '@/modules/school-search/lib/mock-search-response';
import { sortHits } from '@/modules/school-search/lib/sort-hits';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface UseFilteredSpecHitsResult {
  hits: readonly SchoolHit[];
  isAdvanced: boolean;
}

export function useFilteredSpecHits(enabled: boolean): UseFilteredSpecHitsResult {
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
    if (!enabled) return [];
    const filtered = filterMockHits(MOCK_SCHOOL_HITS, {
      q: query || undefined,
      states: states.length ? states : undefined,
      sectors: sectors.length ? sectors : undefined,
      accommodation: accommodation.length ? accommodation : undefined,
      religiousAffiliations: religiousAffiliations.length ? religiousAffiliations : undefined,
      entryYearLevels: entryYearLevels.length ? entryYearLevels : undefined,
      feeMin,
      feeMax,
      atarAvailable: atarAvailable || undefined,
      englishLanguageSupport: englishLanguageSupport || undefined,
      sortBy,
    });
    return sortHits(filtered.hits, sortBy);
  }, [
    enabled,
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

  return { hits, isAdvanced };
}
