'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookmark } from '@/modules/school-search/lib/bookmarks-api';
import type {
  BookmarkResponse,
  CreateBookmarkInput,
} from '@/modules/school-search/types/bookmarks.types';

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation<BookmarkResponse, Error, CreateBookmarkInput>({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}
