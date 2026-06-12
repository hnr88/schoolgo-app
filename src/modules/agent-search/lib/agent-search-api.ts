import { useAuthStore } from '@/modules/auth';
import { resolveSearchClient } from '@/modules/school-search/lib/resolve-search-client';
import type {
  AgentSearchRequest,
  AgentSearchResponse,
} from '@/modules/agent-search/types/agent-search.types';

export async function searchAgents(
  params: AgentSearchRequest,
): Promise<AgentSearchResponse> {
  const client = resolveSearchClient(useAuthStore.getState().jwt);
  const { data } = await client.post<AgentSearchResponse>('/api/search/agents', params);
  return data;
}
