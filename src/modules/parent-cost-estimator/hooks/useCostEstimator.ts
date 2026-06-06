'use client';

import { useMemo, useState } from 'react';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import {
  buildEstimatorRows,
  summarizeRows,
} from '@/modules/parent-cost-estimator/lib/build-estimator-rows';
import {
  DEFAULT_RATE_PCT,
  DEFAULT_TUITION_BASIS,
  DEFAULT_YEARS,
} from '@/modules/parent-cost-estimator/constants/cost-estimator.constants';
import type { TuitionBasis } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

export function useCostEstimator() {
  const bookmarks = useBookmarks();
  const [years, setYears] = useState<number>(DEFAULT_YEARS);
  const [ratePct, setRatePct] = useState<number>(DEFAULT_RATE_PCT);
  const [basis, setBasis] = useState<TuitionBasis>(DEFAULT_TUITION_BASIS);

  const schools = useMemo(() => bookmarks.data?.data ?? [], [bookmarks.data]);
  const rows = useMemo(
    () => buildEstimatorRows(schools, basis, years, ratePct),
    [schools, basis, years, ratePct],
  );
  const summary = useMemo(() => summarizeRows(rows), [rows]);

  return {
    rows,
    summary,
    years,
    ratePct,
    basis,
    setYears,
    setRatePct,
    setBasis,
    schoolCount: schools.length,
    isLoading: bookmarks.isLoading,
    isError: bookmarks.isError,
    isEmpty: !bookmarks.isLoading && !bookmarks.isError && schools.length === 0,
    refetch: bookmarks.refetch,
  };
}
