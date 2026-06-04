'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { useCompareSchools } from '@/modules/school-search/queries/use-compare-schools.query';
import { COMPARE_MAX_COLUMNS } from '@/modules/school-comparison/constants/comparison.constants';
import { compareHitToSchoolHit } from '@/modules/school-comparison/lib/compare-hit-to-school-hit';
import { parseCompareIds } from '@/modules/school-comparison/lib/parse-compare-ids';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

function schoolKey(school: SchoolHit): string {
  return school.documentId;
}

export function useSchoolComparison() {
  const searchParams = useSearchParams();
  const urlIds = useMemo(
    () => parseCompareIds(searchParams.get('ids'), COMPARE_MAX_COLUMNS),
    [searchParams],
  );
  const hasUrlIds = urlIds.length > 0;

  const bookmarks = useBookmarks();
  const compare = useCompareSchools(urlIds);

  const savedSchools = useMemo<SchoolHit[]>(
    () => bookmarks.data?.data ?? [],
    [bookmarks.data],
  );

  const compareSchoolsById = useMemo(() => {
    const map = new Map<string, SchoolHit>();
    for (const hit of compare.data?.data ?? []) {
      map.set(hit.id, compareHitToSchoolHit(hit));
    }
    return map;
  }, [compare.data]);

  const bookmarksById = useMemo(() => {
    const map = new Map<string, SchoolHit>();
    for (const hit of savedSchools) map.set(schoolKey(hit), hit);
    return map;
  }, [savedSchools]);

  const defaultIds = useMemo(
    () =>
      hasUrlIds
        ? urlIds
        : savedSchools.slice(0, COMPARE_MAX_COLUMNS).map(schoolKey),
    [hasUrlIds, urlIds, savedSchools],
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

  const resolveSchool = useCallback(
    (id: string): SchoolHit | undefined =>
      bookmarksById.get(id) ?? compareSchoolsById.get(id),
    [bookmarksById, compareSchoolsById],
  );

  const selectedSchools = useMemo(
    () =>
      selectedIds
        .map(resolveSchool)
        .filter((school): school is SchoolHit => school != null),
    [selectedIds, resolveSchool],
  );

  const isLoading = hasUrlIds
    ? compare.isLoading || (bookmarks.isLoading && savedSchools.length === 0)
    : bookmarks.isLoading;
  const isError = hasUrlIds ? compare.isError : bookmarks.isError;

  const isEmpty = hasUrlIds
    ? !isLoading && !isError && selectedSchools.length === 0
    : !bookmarks.isLoading && !bookmarks.isError && savedSchools.length === 0;

  return {
    savedSchools,
    selectedSchools,
    selectedIds,
    isSelected,
    isAtCapacity,
    toggleSchool,
    isLoading,
    isError,
    refetch: hasUrlIds ? compare.refetch : bookmarks.refetch,
    isEmpty,
    hasUrlIds,
    schoolKey,
  };
}
