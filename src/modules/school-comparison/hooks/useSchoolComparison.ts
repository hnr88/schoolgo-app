'use client';

import { useCallback, useMemo, useState } from 'react';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { COMPARE_MAX_COLUMNS } from '@/modules/school-comparison/constants/comparison.constants';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

function schoolKey(school: SchoolHit): string {
  return school.documentId;
}

export function useSchoolComparison() {
  const { data, isLoading, isError, refetch } = useBookmarks();

  const savedSchools = useMemo<SchoolHit[]>(() => data?.data ?? [], [data]);

  const defaultIds = useMemo(
    () => savedSchools.slice(0, COMPARE_MAX_COLUMNS).map(schoolKey),
    [savedSchools],
  );

  const [overrideIds, setOverrideIds] = useState<string[] | null>(null);
  const selectedIds = overrideIds ?? defaultIds;

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds],
  );

  const isAtCapacity = selectedIds.length >= COMPARE_MAX_COLUMNS;

  const toggleSchool = useCallback(
    (id: string) => {
      setOverrideIds((current) => {
        const base = current ?? defaultIds;
        if (base.includes(id)) {
          return base.filter((existing) => existing !== id);
        }
        if (base.length >= COMPARE_MAX_COLUMNS) {
          return base;
        }
        return [...base, id];
      });
    },
    [defaultIds],
  );

  const selectedSchools = useMemo(
    () =>
      selectedIds
        .map((id) => savedSchools.find((school) => schoolKey(school) === id))
        .filter((school): school is SchoolHit => school != null),
    [selectedIds, savedSchools],
  );

  return {
    savedSchools,
    selectedSchools,
    selectedIds,
    isSelected,
    isAtCapacity,
    toggleSchool,
    isLoading,
    isError,
    refetch,
    isEmpty: !isLoading && !isError && savedSchools.length === 0,
    schoolKey,
  };
}
