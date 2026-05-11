'use client';

import { useTranslations } from 'next-intl';
import { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
import { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
import type { SchoolResultsPanelProps } from '@/modules/school-search/types/component.types';

export function SchoolResultsPanel({ activePortal }: SchoolResultsPanelProps) {
  const t = useTranslations('SchoolSearch.results');
  const { data, isLoading, isError } = useSearchWithFilters();

  const hits = data?.data?.hits ?? [];
  const totalHits = data?.data?.estimatedTotalHits ?? 0;

  return (
    <div className='absolute bottom-4 right-4 top-4 flex w-results-panel flex-col overflow-hidden rounded-lg border border-border bg-card shadow-3'>
      <div className='flex items-center justify-between border-b border-divider bg-card px-4 py-3'>
        <span
          className='text-caption font-semibold uppercase text-foggy'
          style={{ letterSpacing: '0.08em' }}
        >
          {t('title')}
        </span>
        <span className='inline-flex items-center rounded-pill bg-rausch-50 px-2.5 py-1 text-caption font-semibold text-primary'>
          {t('count', { count: totalHits })}
        </span>
      </div>

      <div className='custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-muted p-4'>
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='h-48 animate-pulse rounded-lg bg-muted-foreground/10'
              />
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

        {hits.map((school) => (
          <SearchSchoolCard
            key={school.documentId}
            school={school}
            activePortal={activePortal}
          />
        ))}
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
