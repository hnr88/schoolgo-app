'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSavedSearch } from '@/modules/school-search/lib/saved-searches-api';
import type {
  CreateSavedSearchInput,
  SavedSearchResponse,
} from '@/modules/school-search/types/saved-searches.types';

export function useCreateSavedSearch() {
  const queryClient = useQueryClient();

  return useMutation<SavedSearchResponse, Error, CreateSavedSearchInput>({
    mutationFn: createSavedSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
    },
  });
}
