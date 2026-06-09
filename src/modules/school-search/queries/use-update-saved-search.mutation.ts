'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSavedSearch } from '@/modules/school-search/lib/saved-searches-api';
import type {
  SavedSearchResponse,
  SavedSearchesListResponse,
} from '@/modules/school-search/types/saved-searches.types';

interface UpdateSavedSearchVariables {
  documentId: string;
  alertsEnabled: boolean;
}

interface UpdateSavedSearchContext {
  previous?: SavedSearchesListResponse;
}

const SAVED_SEARCHES_QUERY_KEY = ['saved-searches'] as const;

export function useUpdateSavedSearch() {
  const queryClient = useQueryClient();

  return useMutation<
    SavedSearchResponse,
    Error,
    UpdateSavedSearchVariables,
    UpdateSavedSearchContext
  >({
    mutationFn: ({ documentId, alertsEnabled }) =>
      updateSavedSearch(documentId, { alertsEnabled }),
    onMutate: async ({ documentId, alertsEnabled }) => {
      await queryClient.cancelQueries({ queryKey: SAVED_SEARCHES_QUERY_KEY });
      const previous = queryClient.getQueryData<SavedSearchesListResponse>(
        SAVED_SEARCHES_QUERY_KEY,
      );
      queryClient.setQueryData<SavedSearchesListResponse>(
        SAVED_SEARCHES_QUERY_KEY,
        (current) =>
          current
            ? {
                ...current,
                data: current.data.map((search) =>
                  search.documentId === documentId
                    ? { ...search, alertsEnabled }
                    : search,
                ),
              }
            : current,
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SAVED_SEARCHES_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_SEARCHES_QUERY_KEY });
    },
  });
}
