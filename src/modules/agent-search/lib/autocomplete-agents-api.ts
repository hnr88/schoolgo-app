import { publicApi } from '@/lib/axios';
import type { AutocompleteAgentsResponse } from '@/modules/agent-search/types/autocomplete-agents.types';

export async function autocompleteAgents(
  q: string,
  limit = 10,
): Promise<AutocompleteAgentsResponse> {
  const { data } = await publicApi.get<AutocompleteAgentsResponse>('/api/autocomplete/agents', {
    params: { q, limit },
  });
  return data;
}
