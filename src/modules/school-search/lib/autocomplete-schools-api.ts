import { publicApi } from '@/lib/axios';
import type { AutocompleteSchoolsResponse } from '@/modules/school-search/types/autocomplete-schools.types';

export async function autocompleteSchools(
  q: string,
  limit = 10,
): Promise<AutocompleteSchoolsResponse> {
  const { data } = await publicApi.get<AutocompleteSchoolsResponse>('/api/autocomplete/schools', {
    params: { q, limit },
  });
  return data;
}
