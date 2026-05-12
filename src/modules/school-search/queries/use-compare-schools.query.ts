'use client';

import { useQuery } from '@tanstack/react-query';
import { compareSchools } from '@/modules/school-search/lib/compare-schools-api';

export function useCompareSchools(ids: string[]) {
  const sortedIds = [...ids].sort();
  return useQuery({
    queryKey: ['compare-schools', sortedIds],
    queryFn: () => compareSchools(sortedIds),
    enabled: ids.length > 0 && ids.length <= 4,
    staleTime: 60_000,
  });
}
