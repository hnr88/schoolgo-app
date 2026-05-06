'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchSchools } from '@/modules/school-search/lib/search-api';
import type { SearchRequest, SearchResponse } from '@/modules/school-search/types/search-api.types';

export function useSchoolSearch(params: SearchRequest) {
  return useQuery<SearchResponse>({
    queryKey: ['school-search', params],
    queryFn: () => searchSchools(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
