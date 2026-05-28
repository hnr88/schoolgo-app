'use client';

import { useTranslations } from 'next-intl';
import { Search, Trash2 } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/modules/core';
import { useSavedSearches } from '@/modules/school-search/queries/use-saved-searches.query';
import { useDeleteSavedSearch } from '@/modules/school-search/queries/use-delete-saved-search.mutation';
import { useApplySavedSearch } from '@/modules/school-search/hooks/useApplySavedSearch';
import { portalSearchPath } from '@/modules/school-search/lib/portal-paths';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';

export function ParentSavedSearchesPage({ portal = 'parent' }: { portal?: Portal }) {
  const t = useTranslations('ParentSavedSearches');
  const router = useRouter();
  const { data, isLoading } = useSavedSearches();
  const deleteSavedSearch = useDeleteSavedSearch();
  const applySavedSearch = useApplySavedSearch();

  const items: SavedSearch[] = data?.data ?? [];

  const handleRun = (search: SavedSearch) => {
    applySavedSearch(search.filterState);
    router.push(portalSearchPath(portal));
  };

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h2>

      {isLoading ? (
        <ul className='flex flex-col gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className='h-12 animate-pulse rounded-md border border-border bg-muted'
            />
          ))}
        </ul>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Search}
          title={t('empty')}
          description={t('emptyDescription')}
          action={
            <Link
              href={portalSearchPath(portal)}
              className='inline-flex items-center justify-center rounded-pill bg-primary px-4 py-2 text-body-sm font-semibold text-on-primary transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            >
              {t('browseSchools')}
            </Link>
          }
        />
      ) : (
        <ul className='flex flex-col gap-2'>
          {items.map((s) => (
            <li
              key={s.documentId}
              className='flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2'
            >
              <div className='flex min-w-0 flex-1 flex-col'>
                <span className='truncate text-sm font-medium text-foreground'>
                  {s.name}
                </span>
                <span className='text-xs text-muted-foreground'>
                  {t('resultCount', { count: s.lastResultCount })}
                </span>
              </div>
              <div className='flex shrink-0 items-center gap-1'>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  onClick={() => handleRun(s)}
                  aria-label={t('runSearch')}
                >
                  <Search size={14} aria-hidden />
                  {t('runSearch')}
                </Button>
                <Button
                  type='button'
                  size='sm'
                  variant='ghost'
                  onClick={() => deleteSavedSearch.mutate(s.documentId)}
                  aria-label={t('delete')}
                  disabled={deleteSavedSearch.isPending}
                >
                  <Trash2 size={14} aria-hidden />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
