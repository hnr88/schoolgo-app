import { privateApi } from '@/lib/axios';
import type {
  CreateSavedSearchInput,
  SavedSearchResponse,
  SavedSearchesListResponse,
  UpdateSavedSearchInput,
} from '@/modules/school-search/types/saved-searches.types';

export async function createSavedSearch(
  input: CreateSavedSearchInput,
): Promise<SavedSearchResponse> {
  const { data } = await privateApi.post<SavedSearchResponse>('/api/saved-searches', input);
  return data;
}

export async function updateSavedSearch(
  documentId: string,
  input: UpdateSavedSearchInput,
): Promise<SavedSearchResponse> {
  const { data } = await privateApi.put<SavedSearchResponse>(
    `/api/saved-searches/${documentId}`,
    input,
  );
  return data;
}

export async function listSavedSearches(): Promise<SavedSearchesListResponse> {
  const { data } = await privateApi.get<SavedSearchesListResponse>('/api/saved-searches');
  return data;
}

export async function deleteSavedSearch(documentId: string): Promise<void> {
  await privateApi.delete(`/api/saved-searches/${documentId}`);
}
