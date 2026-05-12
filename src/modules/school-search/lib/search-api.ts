import { publicApi } from '@/lib/axios';
import type {
  SearchRequest,
  SearchResponse,
  TypedSearchRequest,
} from '@/modules/school-search/types/search-api.types';
import type { TypedSearchRequestInput } from '@/modules/school-search/schemas/search-request.schema';

export async function searchSchools(params: SearchRequest): Promise<SearchResponse> {
  const { data } = await publicApi.post<SearchResponse>('/api/search/schools', params);
  return data;
}

export async function searchSchoolsTyped(
  params: TypedSearchRequestInput,
): Promise<SearchResponse> {
  const { data } = await publicApi.post<SearchResponse>('/api/search/schools', params);
  return data;
}

export async function typedSearchSchools(
  request: TypedSearchRequest,
): Promise<SearchResponse> {
  const { data } = await publicApi.post<SearchResponse>('/api/search/schools', request);
  return data;
}
