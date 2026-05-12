'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { autocompleteSchools } from '@/modules/school-search/lib/autocomplete-schools-api';

export function useAutocompleteSchools(q: string, limit?: number) {
  return useQuery({
    queryKey: ['autocomplete-schools', q, limit],
    queryFn: () => autocompleteSchools(q, limit),
    enabled: q.trim().length >= 1,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
