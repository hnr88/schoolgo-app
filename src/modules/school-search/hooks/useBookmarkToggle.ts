'use client';

import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { useCreateBookmark } from '@/modules/school-search/queries/use-create-bookmark.mutation';
import { useDeleteBookmark } from '@/modules/school-search/queries/use-delete-bookmark.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type {
  BookmarksListResponse,
  SchoolHit,
} from '@/modules/school-search/types/bookmarks.types';

interface UseBookmarkToggleResult {
  isBookmarked: boolean;
  isPending: boolean;
  toggle: () => void;
}

const BOOKMARKS_KEY = ['bookmarks'] as const;

function bookmarkId(hit: SchoolHit): string {
  return hit.id ?? hit.documentId;
}

export function useBookmarkToggle(school: SchoolHit): UseBookmarkToggleResult {
  const schoolId = bookmarkId(school);
  const t = useTranslations('SchoolSearch.card');
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const localBookmarks = useSchoolSearchStore((s) => s.bookmarks);
  const toggleLocalBookmark = useSchoolSearchStore((s) => s.toggleBookmark);

  const { data: bookmarksData } = useBookmarks();
  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  const bookmarkedIds = new Set(
    (bookmarksData?.data ?? [])
      .map(bookmarkId)
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

  const applyOptimistic = (shouldAdd: boolean): BookmarksListResponse | undefined => {
    const previous = queryClient.getQueryData<BookmarksListResponse>(BOOKMARKS_KEY);
    const current = previous?.data ?? [];
    const nextData = shouldAdd
      ? current.some((hit) => bookmarkId(hit) === schoolId)
        ? current
        : [...current, school]
      : current.filter((hit) => bookmarkId(hit) !== schoolId);

    queryClient.setQueryData<BookmarksListResponse>(BOOKMARKS_KEY, {
      data: nextData,
      error: previous?.error ?? null,
    });

    return previous;
  };

  const rollback = (previous: BookmarksListResponse | undefined) => {
    if (previous) {
      queryClient.setQueryData<BookmarksListResponse>(BOOKMARKS_KEY, previous);
    } else {
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_KEY });
    }
    toast.error(t('bookmarkError'));
  };

  const toggle = () => {
    if (isPending) return;
    const shouldAdd = !serverBookmarked;
    const previous = applyOptimistic(shouldAdd);

    if (shouldAdd) {
      createBookmark.mutate(
        { schoolId },
        {
          onError: () => rollback(previous),
          onSettled: () => queryClient.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
        },
      );
    } else {
      deleteBookmark.mutate(schoolId, {
        onError: () => rollback(previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
      });
    }
  };

  return { isBookmarked: serverBookmarked, isPending, toggle };
}
