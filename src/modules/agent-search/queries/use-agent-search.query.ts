'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchAgents } from '@/modules/agent-search/lib/agent-search-api';
import type {
  AgentSearchRequest,
  AgentSearchResponse,
} from '@/modules/agent-search/types/agent-search.types';

export function useAgentSearch(params: AgentSearchRequest) {
  return useQuery<AgentSearchResponse>({
    queryKey: ['agent-search', params],
    queryFn: () => searchAgents(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
