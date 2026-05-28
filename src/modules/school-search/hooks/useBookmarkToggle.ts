'use client';

import { useState } from 'react';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { useCreateBookmark } from '@/modules/school-search/queries/use-create-bookmark.mutation';
import { useDeleteBookmark } from '@/modules/school-search/queries/use-delete-bookmark.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface UseBookmarkToggleResult {
  isBookmarked: boolean;
  isPending: boolean;
  toggle: () => void;
}

export function useBookmarkToggle(school: SchoolHit): UseBookmarkToggleResult {
  const schoolId = school.id ?? school.documentId;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const localBookmarks = useSchoolSearchStore((s) => s.bookmarks);
  const toggleLocalBookmark = useSchoolSearchStore((s) => s.toggleBookmark);

  const { data: bookmarksData } = useBookmarks();
  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  const [optimistic, setOptimistic] = useState<boolean | null>(null);

  const bookmarkedIds = new Set(
    (bookmarksData?.data ?? [])
      .map((h: SchoolHit) => h.id ?? h.documentId)
      .filter((value): value is string => Boolean(value)),
  );
  const serverBookmarked = bookmarkedIds.has(schoolId);
  const isPending = createBookmark.isPending || deleteBookmark.isPending;

  if (!isAuthenticated) {
    return {
      isBookmarked: localBookmarks.includes(schoolId),
      isPending: false,
      toggle: () => toggleLocalBookmark(schoolId),
    };
  }

  const isBookmarked = optimistic ?? serverBookmarked;

  const toggle = () => {
    if (isPending) return;
    const next = !isBookmarked;
    setOptimistic(next);
    const reset = () => setOptimistic(null);
    if (next) {
      createBookmark.mutate({ schoolId }, { onSettled: reset });
    } else {
      deleteBookmark.mutate(schoolId, { onSettled: reset });
    }
  };

  return { isBookmarked, isPending, toggle };
}
