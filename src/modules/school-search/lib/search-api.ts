import { publicApi } from '@/lib/axios';
import type { SearchRequest, SearchResponse } from '@/modules/school-search/types/search-api.types';

export async function searchSchools(params: SearchRequest): Promise<SearchResponse> {
  const { data } = await publicApi.post<SearchResponse>('/api/search/schools', params);
  return data;
}
