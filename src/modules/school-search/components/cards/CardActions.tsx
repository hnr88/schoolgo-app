'use client';

import { useTranslations } from 'next-intl';
import { Check, Heart } from 'lucide-react';
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
  const t = useTranslations('SchoolSearch.spec.tileCard');
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

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={handleBookmark}
        aria-label={isBookmarked ? t('bookmarkRemove') : t('bookmark')}
        aria-pressed={isBookmarked}
        className={cn(
          'flex size-8 items-center justify-center rounded-full border transition-colors',
          isBookmarked
            ? 'border-red-300 bg-red-50 text-red-500'
            : 'border-border bg-background text-muted-foreground hover:bg-muted',
        )}
      >
        <Heart size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>
      {isAdvanced && (
        <button
          type="button"
          onClick={handleCompare}
          role="checkbox"
          aria-checked={isInCompare}
          aria-label={t('compareCheckbox', { name: schoolName })}
          className={cn(
            'flex size-8 items-center justify-center rounded border transition-colors',
            isInCompare
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:bg-muted',
          )}
        >
          {isInCompare && <Check size={16} />}
        </button>
      )}
    </div>
  );
}
