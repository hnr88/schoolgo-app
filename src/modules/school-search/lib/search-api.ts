import { useAuthStore } from '@/modules/auth';
import { resolveSearchClient } from '@/modules/school-search/lib/resolve-search-client';
import type {
  SearchRequest,
  SearchResponse,
  TypedSearchRequest,
} from '@/modules/school-search/types/search-api.types';
import type { TypedSearchRequestInput } from '@/modules/school-search/schemas/search-request.schema';

export async function searchSchools(params: SearchRequest): Promise<SearchResponse> {
  const client = resolveSearchClient(useAuthStore.getState().jwt);
  const { data } = await client.post<SearchResponse>('/api/search/schools', params);
  return data;
}

export async function searchSchoolsTyped(
  params: TypedSearchRequestInput,
): Promise<SearchResponse> {
  const client = resolveSearchClient(useAuthStore.getState().jwt);
  const { data } = await client.post<SearchResponse>('/api/search/schools', params);
  return data;
}

export async function typedSearchSchools(
  request: TypedSearchRequest,
): Promise<SearchResponse> {
  const client = resolveSearchClient(useAuthStore.getState().jwt);
  const { data } = await client.post<SearchResponse>('/api/search/schools', request);
  return data;
}
