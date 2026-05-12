'use client';

import { useQuery } from '@tanstack/react-query';
import { listBookmarks } from '@/modules/school-search/lib/bookmarks-api';
import type { BookmarksListResponse } from '@/modules/school-search/types/bookmarks.types';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export function useBookmarks() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery<BookmarksListResponse>({
    queryKey: ['bookmarks'],
    queryFn: listBookmarks,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
