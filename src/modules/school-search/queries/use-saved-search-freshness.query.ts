'use client';

import { useQuery } from '@tanstack/react-query';
import { typedSearchSchools } from '@/modules/school-search/lib/search-api';
import { toFreshnessRequest } from '@/modules/school-search/lib/saved-search-freshness';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';
import type { SearchResponse } from '@/modules/school-search/types/search-api.types';

export function useSavedSearchFreshness(search: SavedSearch, enabled: boolean) {
  return useQuery<SearchResponse>({
    queryKey: ['saved-search-freshness', search.documentId],
    queryFn: () => typedSearchSchools(toFreshnessRequest(search.filterState)),
    enabled,
    staleTime: 60_000,
    retry: 1,
  });
}
