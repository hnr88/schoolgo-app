'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { useSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
import { mapFiltersToRequest } from '@/modules/school-search/lib/map-filters-to-request';

const DEBOUNCE_MS = 300;
const MAP_DEBOUNCE_MS = 500;

export function useSearchWithFilters() {
  const query = useSchoolSearchStore((s) => s.query);
  const priceMin = useSchoolSearchStore((s) => s.priceMin);
  const priceMax = useSchoolSearchStore((s) => s.priceMax);
  const curricula = useSchoolSearchStore((s) => s.curricula);
  const states = useSchoolSearchStore((s) => s.states);
  const englishTests = useSchoolSearchStore((s) => s.englishTests);
  const activeChips = useSchoolSearchStore((s) => s.activeChips);
  const mapBounds = useSchoolSearchStore((s) => s.mapBounds);
  const geocodedQuery = useSchoolSearchStore((s) => s.geocodedQuery);

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedPriceMin, setDebouncedPriceMin] = useState(priceMin);
  const [debouncedPriceMax, setDebouncedPriceMax] = useState(priceMax);
  const [debouncedMapBounds, setDebouncedMapBounds] = useState(mapBounds);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceMin(priceMin);
      setDebouncedPriceMax(priceMax);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [priceMin, priceMax]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMapBounds(mapBounds), MAP_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [mapBounds]);

  const searchRequest = useMemo(
    () =>
      mapFiltersToRequest({
        query: debouncedQuery,
        priceMin: debouncedPriceMin,
        priceMax: debouncedPriceMax,
        curricula,
        states,
        englishTests,
        activeChips,
        mapBounds: debouncedMapBounds,
        geocodedQuery,
      }),
    [debouncedQuery, debouncedPriceMin, debouncedPriceMax, curricula, states, englishTests, activeChips, debouncedMapBounds, geocodedQuery],
  );

  return useSchoolSearch(searchRequest);
}
