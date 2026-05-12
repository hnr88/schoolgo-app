'use client';

import { useTranslations } from 'next-intl';
import { Check, Heart, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  COMPARE_MAX_ADVANCED,
  COMPARE_MAX_BASIC,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface CardActionsProps {
  schoolId: string;
  schoolName: string;
  isAdvanced: boolean;
  onUnauthenticatedBookmark?: () => void;
  className?: string;
}

export function CardActions({
  schoolId,
  schoolName,
  isAdvanced,
  onUnauthenticatedBookmark,
  className,
}: CardActionsProps) {
  const tActions = useTranslations('SchoolSearch.spec.tile.actions');
  const bookmarks = useSchoolSearchStore((s) => s.bookmarks);
  const toggleBookmark = useSchoolSearchStore((s) => s.toggleBookmark);
  const compareList = useSchoolSearchStore((s) => s.compareList);
  const toggleCompare = useSchoolSearchStore((s) => s.toggleCompare);

  const isBookmarked = bookmarks.includes(schoolId);
  const isInCompare = compareList.includes(schoolId);
  const max = isAdvanced ? COMPARE_MAX_ADVANCED : COMPARE_MAX_BASIC;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAdvanced) {
      onUnauthenticatedBookmark?.();
      return;
    }
    toggleBookmark(schoolId);
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
      <button
        type="button"
        onClick={handleBookmark}
        aria-label={bookmarkLabel}
        aria-pressed={isBookmarked}
        className={cn(
          'flex size-8 items-center justify-center rounded-full border bg-background/90 backdrop-blur transition-colors',
          isBookmarked
            ? 'border-rose-300 bg-rose-50 text-rose-500'
            : 'border-border text-muted-foreground hover:bg-muted',
        )}
      >
        <Heart size={16} fill={isBookmarked ? 'currentColor' : 'none'} aria-hidden />
      </button>
      {isAdvanced && (
        <button
          type="button"
          onClick={handleCompare}
          role="checkbox"
          aria-checked={isInCompare}
          aria-label={tActions('compare', { name: schoolName })}
          className={cn(
            'flex size-8 items-center justify-center rounded-md border bg-background/90 backdrop-blur transition-colors',
            isInCompare
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:bg-muted',
          )}
        >
          {isInCompare ? (
            <Check size={16} aria-hidden />
          ) : (
            <Square size={16} aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
