import { AGENT_PAGE_SIZE } from '@/modules/agent-search/constants/agent-search.constants';
import type {
  AgentSearchRequest,
  AgentSortBy,
} from '@/modules/agent-search/types/agent-search.types';

export interface AgentSearchStoreSnapshot {
  q: string;
  countriesServed: string[];
  languages: string[];
  services: string[];
  verifiedOnly: boolean;
  sortBy: AgentSortBy;
  page: number;
  pageSize: number;
}

export function mapAgentStoreToTypedRequest(
  store: AgentSearchStoreSnapshot,
): AgentSearchRequest {
  const trimmedQuery = store.q.trim();

  return {
    q: trimmedQuery || undefined,
    countriesServed: store.countriesServed.length ? store.countriesServed : undefined,
    languages: store.languages.length ? store.languages : undefined,
    services: store.services.length ? store.services : undefined,
    verifiedOnly: store.verifiedOnly,
    sortBy: store.sortBy,
    page: store.page > 1 ? store.page : 1,
    pageSize: store.pageSize > 0 ? store.pageSize : AGENT_PAGE_SIZE,
  };
}
