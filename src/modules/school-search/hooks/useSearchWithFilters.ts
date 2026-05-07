'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { useSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
import { mapFiltersToRequest } from '@/modules/school-search/lib/map-filters-to-request';

const DEBOUNCE_MS = 300;

export function useSearchWithFilters() {
  const query = useSchoolSearchStore((s) => s.query);
  const priceMin = useSchoolSearchStore((s) => s.priceMin);
  const priceMax = useSchoolSearchStore((s) => s.priceMax);
  const curricula = useSchoolSearchStore((s) => s.curricula);
  const states = useSchoolSearchStore((s) => s.states);
  const englishTests = useSchoolSearchStore((s) => s.englishTests);
  const activeChips = useSchoolSearchStore((s) => s.activeChips);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const searchRequest = useMemo(
    () =>
      mapFiltersToRequest({
        query: debouncedQuery,
        priceMin,
        priceMax,
        curricula,
        states,
        englishTests,
        activeChips,
      }),
    [debouncedQuery, priceMin, priceMax, curricula, states, englishTests, activeChips],
  );

  return useSchoolSearch(searchRequest);
}
