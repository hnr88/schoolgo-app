'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { autocompleteSuburbs } from '@/modules/school-search/lib/autocomplete-suburbs-api';
import type { AutocompleteSuburbsResponse } from '@/modules/school-search/types/autocomplete-suburbs.types';

export function useAutocompleteSuburbs(q: string, limit?: number) {
  return useQuery<AutocompleteSuburbsResponse>({
    queryKey: ['autocomplete-suburbs', q, limit],
    queryFn: () => autocompleteSuburbs(q, limit),
    enabled: q.trim().length >= 1,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
