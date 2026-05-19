'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
import { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
import type { SchoolResultsPanelProps } from '@/modules/school-search/types/component.types';

export function SchoolResultsPanel({ activePortal }: SchoolResultsPanelProps) {
  const t = useTranslations('SchoolSearch.results');
  const { data, isLoading, isFetching, isError } = useSearchWithFilters();

  const hits = data?.data?.hits ?? [];
  const totalHits = data?.data?.total ?? 0;
  const isRefetching = isFetching && !isLoading;

  return (
    <div className='absolute bottom-4 right-4 top-4 flex w-results-panel flex-col overflow-hidden rounded-lg border border-border bg-card shadow-3'>
      <div className='flex items-center justify-between border-b border-divider bg-card px-4 py-3'>
        <span
          className='text-caption font-semibold uppercase tracking-eyebrow text-foggy'

        >
          {t('title')}
        </span>
        {isRefetching ? (
          <span
            className='inline-flex min-w-24 items-center justify-center gap-1.5 rounded-pill bg-muted px-2.5 py-1 text-caption font-semibold text-foggy'
            role='status'
            aria-live='polite'
          >
            <Loader2 className='h-3 w-3 animate-spin' aria-hidden='true' />
            {t('searching')}
          </span>
        ) : (
          <span className='inline-flex min-w-24 items-center justify-center rounded-pill bg-rausch-50 px-2.5 py-1 text-caption font-semibold text-primary'>
            {t('count', { count: totalHits })}
          </span>
        )}
      </div>

      <div className='custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-muted p-4'>
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2'
              >
                <Skeleton className='aspect-[16/10] w-full rounded-none' />
                <div className='flex flex-col gap-2 p-4'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-3 w-1/2' />
                  <div className='flex flex-wrap gap-1.5'>
                    <Skeleton className='h-4 w-12 rounded-pill' />
                    <Skeleton className='h-4 w-14 rounded-pill' />
                    <Skeleton className='h-4 w-10 rounded-pill' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {isError && (
          <p className='py-8 text-center text-sm text-foggy'>
            {t('error')}
          </p>
        )}

        {!isLoading && !isError && hits.length === 0 && (
          <p className='py-8 text-center text-sm text-foggy'>
            {t('empty')}
          </p>
        )}

        {!isLoading && hits.length > 0 && (
          <div
            className={cn(
              'flex flex-col gap-4 transition-opacity duration-200',
              isRefetching && 'pointer-events-none opacity-60',
            )}
            aria-busy={isRefetching}
          >
            {hits.map((school) => (
              <SearchSchoolCard
                key={school.documentId}
                school={school}
                activePortal={activePortal}
              />
            ))}
          </div>
        )}
      </div>

      {totalHits > hits.length && (
        <div className='border-t border-divider bg-card p-4 text-center'>
          <button
            type='button'
            className='text-body-sm font-semibold text-primary hover:underline'
          >
            {t('viewAll')}
          </button>
        </div>
      )}
    </div>
  );
}
