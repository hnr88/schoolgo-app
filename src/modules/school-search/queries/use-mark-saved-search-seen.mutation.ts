'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSavedSearch } from '@/modules/school-search/lib/saved-searches-api';
import type {
  SavedSearchResponse,
  SavedSearchesListResponse,
} from '@/modules/school-search/types/saved-searches.types';

interface MarkSavedSearchSeenVariables {
  documentId: string;
  lastResultCount: number;
}

const SAVED_SEARCHES_QUERY_KEY = ['saved-searches'] as const;

export function useMarkSavedSearchSeen() {
  const queryClient = useQueryClient();

  return useMutation<SavedSearchResponse, Error, MarkSavedSearchSeenVariables>({
    mutationFn: ({ documentId, lastResultCount }) =>
      updateSavedSearch(documentId, { lastResultCount }),
    onSuccess: (response) => {
      queryClient.setQueryData<SavedSearchesListResponse>(
        SAVED_SEARCHES_QUERY_KEY,
        (current) =>
          current
            ? {
                ...current,
                data: current.data.map((search) =>
                  search.documentId === response.data.documentId
                    ? { ...search, lastResultCount: response.data.lastResultCount }
                    : search,
                ),
              }
            : current,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_SEARCHES_QUERY_KEY });
    },
  });
}
