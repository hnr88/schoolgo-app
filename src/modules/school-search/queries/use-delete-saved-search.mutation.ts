'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSavedSearch } from '@/modules/school-search/lib/saved-searches-api';

export function useDeleteSavedSearch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) => deleteSavedSearch(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
    },
  });
}
