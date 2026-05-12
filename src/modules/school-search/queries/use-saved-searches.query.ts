'use client';

import { useQuery } from '@tanstack/react-query';
import { listSavedSearches } from '@/modules/school-search/lib/saved-searches-api';
import type { SavedSearchesListResponse } from '@/modules/school-search/types/saved-searches.types';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export function useSavedSearches() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery<SavedSearchesListResponse>({
    queryKey: ['saved-searches'],
    queryFn: listSavedSearches,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
