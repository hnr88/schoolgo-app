import { publicApi } from '@/lib/axios';
import type { AutocompleteSuburbsResponse } from '@/modules/school-search/types/autocomplete-suburbs.types';

export async function autocompleteSuburbs(
  q: string,
  limit = 10,
): Promise<AutocompleteSuburbsResponse> {
  const { data } = await publicApi.get<AutocompleteSuburbsResponse>(
    '/api/autocomplete/suburbs',
    { params: { q, limit } },
  );
  return data;
}
