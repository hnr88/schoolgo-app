'use client';

import { useCallback } from 'react';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { TypedSearchRequest } from '@/modules/school-search';

export function useApplySavedSearch() {
  const setQuery = useSchoolSearchStore((s) => s.setQuery);
  const setSuburb = useSchoolSearchStore((s) => s.setSuburb);
  const setPostcode = useSchoolSearchStore((s) => s.setPostcode);
  const setStates = useSchoolSearchStore((s) => s.setStates);
  const setFeeRange = useSchoolSearchStore((s) => s.setFeeRange);
  const setEntryYearLevels = useSchoolSearchStore((s) => s.setEntryYearLevels);
  const setStudentAge = useSchoolSearchStore((s) => s.setStudentAge);
  const setAtarAvailable = useSchoolSearchStore((s) => s.setAtarAvailable);
  const setEnglishLanguageSupport = useSchoolSearchStore(
    (s) => s.setEnglishLanguageSupport,
  );
  const setEnglishTest = useSchoolSearchStore((s) => s.setEnglishTest);
  const setSortBy = useSchoolSearchStore((s) => s.setSortBy);

  const applySavedSearch = useCallback(
    (filterState: TypedSearchRequest) => {
      if (filterState.q !== undefined) setQuery(filterState.q);
      if (filterState.suburb !== undefined) setSuburb(filterState.suburb);
      if (filterState.postcode !== undefined) setPostcode(filterState.postcode);
      if (filterState.states !== undefined) setStates(filterState.states);
      if (filterState.feeMin !== undefined || filterState.feeMax !== undefined) {
        setFeeRange(filterState.feeMin ?? 0, filterState.feeMax ?? Number.MAX_SAFE_INTEGER);
      }
      if (filterState.entryYearLevels !== undefined) {
        setEntryYearLevels(filterState.entryYearLevels);
      }
      if (filterState.studentAge !== undefined) setStudentAge(filterState.studentAge);
      if (filterState.atarAvailable !== undefined) {
        setAtarAvailable(filterState.atarAvailable);
      }
      if (filterState.englishLanguageSupport !== undefined) {
        setEnglishLanguageSupport(filterState.englishLanguageSupport);
      }
      if (filterState.englishTest !== undefined) setEnglishTest(filterState.englishTest);
      if (filterState.sortBy !== undefined) setSortBy(filterState.sortBy);
    },
    [
      setQuery,
      setSuburb,
      setPostcode,
      setStates,
      setFeeRange,
      setEntryYearLevels,
      setStudentAge,
      setAtarAvailable,
      setEnglishLanguageSupport,
      setEnglishTest,
      setSortBy,
    ],
  );

  return applySavedSearch;
}
