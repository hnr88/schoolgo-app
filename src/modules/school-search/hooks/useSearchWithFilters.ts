'use client';

import { useMemo, useState, useEffect } from 'react';
import type { SearchCapability } from '@/modules/unified-search';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { useTypedSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
import { mapStoreToTypedRequest } from '@/modules/school-search/lib/store-to-typed-request';

const DEBOUNCE_MS = 300;
const RESULTS_PAGE_SIZE = 100;

export function useSearchWithFilters(capability: SearchCapability) {
  const isAdvancedSession = capability.isAdvanced;

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

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedFeeMin, setDebouncedFeeMin] = useState(feeMin);
  const [debouncedFeeMax, setDebouncedFeeMax] = useState(feeMax);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFeeMin(feeMin);
      setDebouncedFeeMax(feeMax);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [feeMin, feeMax]);

  const typedRequest = useMemo(
    () => ({
      ...mapStoreToTypedRequest({
        query: debouncedQuery,
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
        feeMin: debouncedFeeMin,
        feeMax: debouncedFeeMax,
        sortBy,
      }, isAdvancedSession),
      pageSize: RESULTS_PAGE_SIZE,
    }),
    [
      isAdvancedSession,
      debouncedQuery,
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
      debouncedFeeMin,
      debouncedFeeMax,
      sortBy,
    ],
  );

  return useTypedSchoolSearch(typedRequest);
}
