'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
import { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
import { useDeleteBookmark } from '@/modules/school-search/queries/use-delete-bookmark.mutation';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const GRID_CLASS = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';

function SavedSchoolItem({
  school,
  onRemove,
  removeLabel,
  isRemoving,
}: {
  school: SchoolHit;
  onRemove: () => void;
  removeLabel: string;
  isRemoving: boolean;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <SearchSchoolCard school={school} activePortal='parent' />
      <button
        type='button'
        onClick={onRemove}
        disabled={isRemoving}
        className='inline-flex items-center justify-center gap-1.5 self-start rounded-pill px-3 py-1.5 text-body-sm font-semibold text-foggy transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60'
      >
        <Heart className='h-4 w-4 fill-primary text-primary' aria-hidden='true' />
        {removeLabel}
      </button>
    </div>
  );
}

export function SavedSchoolsPage() {
  const t = useTranslations('ParentSavedSchools');
  const { data, isLoading } = useBookmarks();
  const deleteBookmark = useDeleteBookmark();

  const schools = data?.data ?? [];

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h2>

      {isLoading ? (
        <div className={GRID_CLASS}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-72 w-full rounded-xl' />
          ))}
        </div>
      ) : schools.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={t('empty')}
          description={t('emptyDescription')}
          action={
            <Link
              href='/parent/search'
              className='inline-flex items-center justify-center rounded-pill bg-primary px-4 py-2 text-body-sm font-semibold text-on-primary transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            >
              {t('browseSchools')}
            </Link>
          }
        />
      ) : (
        <div className={GRID_CLASS}>
          {schools.map((school) => (
            <SavedSchoolItem
              key={school.documentId}
              school={school}
              removeLabel={t('remove')}
              isRemoving={deleteBookmark.isPending}
              onRemove={() => {
                if (school.id) deleteBookmark.mutate(school.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
