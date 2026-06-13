'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCheck, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { computeSavedSearchFreshness } from '@/modules/school-search/lib/saved-search-freshness';
import { useSavedSearchFreshness } from '@/modules/school-search/queries/use-saved-search-freshness.query';
import { useMarkSavedSearchSeen } from '@/modules/school-search/queries/use-mark-saved-search-seen.mutation';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';

export function SavedSearchFreshness({ search }: { search: SavedSearch }) {
  const t = useTranslations('ParentSavedSearches');
  const [isChecked, setIsChecked] = useState(false);
  const { data, isFetching, isError, refetch } = useSavedSearchFreshness(search, isChecked);
  const markSeen = useMarkSavedSearchSeen();

  if (!isChecked) {
    return (
      <div className='flex items-center justify-between gap-3 border-t border-border pt-3'>
        <span className='text-xs text-muted-foreground'>{t('freshnessHint')}</span>
        <Button type='button' size='sm' variant='outline' onClick={() => setIsChecked(true)}>
          <RefreshCw size={14} aria-hidden />
          {t('checkUpdates')}
        </Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className='flex items-center gap-2 border-t border-border pt-3'>
        <RefreshCw size={14} aria-hidden className='animate-spin text-muted-foreground' />
        <span className='text-xs text-muted-foreground'>{t('checking')}</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-between gap-3 border-t border-border pt-3'>
        <span className='text-xs text-destructive'>{t('freshnessError')}</span>
        <Button type='button' size='sm' variant='outline' onClick={() => refetch()}>
          {t('retryCheck')}
        </Button>
      </div>
    );
  }

  const freshness = computeSavedSearchFreshness(data.data.total, search.lastResultCount);

  return (
    <div className='flex items-center justify-between gap-3 border-t border-border pt-3'>
      {freshness.kind === 'new' ? (
        <span className='inline-flex items-center gap-1 rounded-pill bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary-strong'>
          <Sparkles size={12} aria-hidden />
          {t('newResults', { count: freshness.newCount })}
        </span>
      ) : freshness.kind === 'fewer' ? (
        <span className='text-xs text-muted-foreground'>
          {t('fewerResults', { count: freshness.currentTotal })}
        </span>
      ) : freshness.kind === 'unknown' ? (
        <span className='text-xs text-muted-foreground'>
          {t('noBaseline', { count: freshness.currentTotal })}
        </span>
      ) : (
        <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
          <CheckCheck size={14} aria-hidden />
          {t('upToDate')}
        </span>
      )}
      {freshness.canMarkSeen ? (
        <Button
          type='button'
          size='sm'
          variant='ghost'
          onClick={() =>
            markSeen.mutate({
              documentId: search.documentId,
              lastResultCount: freshness.currentTotal,
            })
          }
          disabled={markSeen.isPending}
        >
          {t('markSeen')}
        </Button>
      ) : null}
    </div>
  );
}
