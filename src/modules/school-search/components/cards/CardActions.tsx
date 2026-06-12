'use client';

import { useTranslations } from 'next-intl';
import { Check, GitCompare, Heart } from 'lucide-react';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SearchCapability } from '@/modules/unified-search';
import { cn } from '@/lib/utils';
import {
  COMPARE_MAX_ADVANCED,
  COMPARE_MAX_BASIC,
} from '@/modules/school-search/constants/filter-options.constants';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { useCreateBookmark } from '@/modules/school-search/queries/use-create-bookmark.mutation';
import { useDeleteBookmark } from '@/modules/school-search/queries/use-delete-bookmark.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface CardActionsProps {
  schoolId: string;
  schoolName: string;
  isAdvanced: boolean;
  capability?: SearchCapability;
  onUnauthenticatedBookmark?: () => void;
  className?: string;
}

export function CardActions({
  schoolId,
  schoolName,
  isAdvanced,
  capability,
  onUnauthenticatedBookmark,
  className,
}: CardActionsProps) {
  const tActions = useTranslations('SchoolSearch.spec.tile.actions');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const localBookmarks = useSchoolSearchStore((s) => s.bookmarks);
  const toggleLocalBookmark = useSchoolSearchStore((s) => s.toggleBookmark);
  const compareList = useSchoolSearchStore((s) => s.compareList);
  const toggleCompare = useSchoolSearchStore((s) => s.toggleCompare);

  const { data: bookmarksData } = useBookmarks();
  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  const bookmarkedIds = new Set(
    (bookmarksData?.data ?? [])
      .map((h: SchoolHit) => h.id ?? h.documentId)
      .filter((value): value is string => Boolean(value)),
  );
  const isBookmarked = isAuthenticated
    ? bookmarkedIds.has(schoolId)
    : localBookmarks.includes(schoolId);
  const isInCompare = compareList.includes(schoolId);
  const max = isAdvanced ? COMPARE_MAX_ADVANCED : COMPARE_MAX_BASIC;
  const isBookmarkPending = createBookmark.isPending || deleteBookmark.isPending;

  const showSave = capability ? capability.canPersonalize : true;
  const showCompare = capability ? capability.isAdvanced : isAdvanced;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      onUnauthenticatedBookmark?.();
      toggleLocalBookmark(schoolId);
      return;
    }
    if (isBookmarked) {
      deleteBookmark.mutate(schoolId);
    } else {
      createBookmark.mutate({ schoolId });
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleCompare(schoolId, max);
  };

  const bookmarkLabel = isBookmarked
    ? tActions('bookmarkRemove', { name: schoolName })
    : tActions('bookmarkAdd', { name: schoolName });

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {showSave && (
        <button
          type="button"
          onClick={handleBookmark}
          disabled={isBookmarkPending}
          aria-label={bookmarkLabel}
          aria-pressed={isBookmarked}
          className={cn(
            'flex size-9 items-center justify-center rounded-full border bg-card shadow-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
            isBookmarked
              ? 'border-rausch-200 bg-rausch-50 text-primary'
              : 'border-border text-muted-foreground hover:bg-muted',
          )}
        >
          <Heart size={16} fill={isBookmarked ? 'currentColor' : 'none'} aria-hidden />
        </button>
      )}
      {showCompare && (
        <button
          type="button"
          onClick={handleCompare}
          role="checkbox"
          aria-checked={isInCompare}
          aria-label={tActions('compare', { name: schoolName })}
          className={cn(
            'flex size-9 items-center justify-center rounded-md border bg-card shadow-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isInCompare
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:bg-muted',
          )}
        >
          {isInCompare ? (
            <Check size={16} aria-hidden />
          ) : (
            <GitCompare size={16} aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
