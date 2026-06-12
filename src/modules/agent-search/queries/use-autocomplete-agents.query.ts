'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { autocompleteAgents } from '@/modules/agent-search/lib/autocomplete-agents-api';

export function useAutocompleteAgents(q: string, limit?: number) {
  return useQuery({
    queryKey: ['autocomplete-agents', q, limit],
    queryFn: () => autocompleteAgents(q, limit),
    enabled: q.trim().length >= 1,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
