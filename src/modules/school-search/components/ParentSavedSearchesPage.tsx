'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import { EmptyState, ErrorState } from '@/modules/core';
import { useSavedSearches } from '@/modules/school-search/queries/use-saved-searches.query';
import { useApplySavedSearch } from '@/modules/school-search/hooks/useApplySavedSearch';
import { SavedSearchRow } from '@/modules/school-search/components/SavedSearchRow';
import { portalSearchPath } from '@/modules/school-search/lib/portal-paths';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';

export function ParentSavedSearchesPage({ portal = 'parent' }: { portal?: Portal }) {
  const t = useTranslations('ParentSavedSearches');
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useSavedSearches();
  const applySavedSearch = useApplySavedSearch();

  const items: SavedSearch[] = data?.data ?? [];

  const handleRun = (search: SavedSearch) => {
    applySavedSearch(search.filterState);
    router.push(portalSearchPath(portal));
  };

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='font-display text-2xl font-bold tracking-tight text-ink-900'>{t('title')}</h2>

      {isLoading ? (
        <ul className='flex flex-col gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className='h-12 animate-pulse rounded-md border border-border bg-muted'
            />
          ))}
        </ul>
      ) : isError ? (
        <ErrorState
          framed
          message={t('freshnessError')}
          onRetry={() => refetch()}
          retryLabel={t('retryCheck')}
        />
      ) : items.length === 0 ? (
        <EmptyState
          framed
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
            <SavedSearchRow key={s.documentId} search={s} onRun={handleRun} />
          ))}
        </ul>
      )}
    </div>
  );
}
