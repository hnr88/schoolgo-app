'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark } from '@/modules/school-search/lib/bookmarks-api';

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schoolDocumentId: string) => deleteBookmark(schoolDocumentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}
