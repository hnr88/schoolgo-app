import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';

export interface SavedSearch {
  documentId: string;
  name: string;
  filterState: TypedSearchRequest;
  lastResultCount: number;
  createdAt: string;
}

export interface CreateSavedSearchInput {
  name: string;
  filterState: TypedSearchRequest;
}

export interface SavedSearchResponse {
  data: SavedSearch;
  error?: null | { status: number; message: string };
}

export interface SavedSearchesListResponse {
  data: SavedSearch[];
  error?: null | { status: number; message: string };
}
