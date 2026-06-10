'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { BellRing, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { SavedSearchFreshness } from '@/modules/school-search/components/SavedSearchFreshness';
import { useDeleteSavedSearch } from '@/modules/school-search/queries/use-delete-saved-search.mutation';
import { useUpdateSavedSearch } from '@/modules/school-search/queries/use-update-saved-search.mutation';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';

interface SavedSearchRowProps {
  search: SavedSearch;
  onRun: (search: SavedSearch) => void;
}

export function SavedSearchRow({ search, onRun }: SavedSearchRowProps) {
  const t = useTranslations('ParentSavedSearches');
  const format = useFormatter();
  const deleteSavedSearch = useDeleteSavedSearch();
  const updateSavedSearch = useUpdateSavedSearch();

  const toggleId = `saved-search-alerts-${search.documentId}`;

  return (
    <li className='flex flex-col gap-3 rounded-md border border-border bg-card px-3 py-3'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex min-w-0 flex-1 flex-col'>
          <span className='truncate text-sm font-medium text-foreground'>{search.name}</span>
          {search.lastResultCount != null && (
            <span className='text-xs text-muted-foreground'>
              {t('resultCount', { count: search.lastResultCount })}
            </span>
          )}
        </div>
        <div className='flex shrink-0 items-center gap-1'>
          <Button
            type='button'
            size='sm'
            variant='outline'
            onClick={() => onRun(search)}
            aria-label={t('runSearch')}
          >
            <Search size={14} aria-hidden />
            {t('runSearch')}
          </Button>
          <Button
            type='button'
            size='sm'
            variant='ghost'
            onClick={() => deleteSavedSearch.mutate(search.documentId)}
            aria-label={t('delete')}
            disabled={deleteSavedSearch.isPending}
          >
            <Trash2 size={14} aria-hidden />
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 border-t border-border pt-3'>
        <label htmlFor={toggleId} className='flex min-w-0 flex-col gap-0.5'>
          <span className='inline-flex items-center gap-1.5 text-sm font-medium text-foreground'>
            <BellRing size={14} aria-hidden />
            {t('alertsLabel')}
          </span>
          {search.lastNotifiedAt ? (
            <span className='text-xs text-muted-foreground'>
              {t('lastNotified', {
                date: format.dateTime(new Date(search.lastNotifiedAt), {
                  dateStyle: 'medium',
                }),
              })}
            </span>
          ) : (
            <span className='text-xs text-muted-foreground'>{t('alertsHint')}</span>
          )}
        </label>
        <Switch
          id={toggleId}
          checked={search.alertsEnabled}
          onCheckedChange={(checked) =>
            updateSavedSearch.mutate({
              documentId: search.documentId,
              alertsEnabled: checked,
            })
          }
          disabled={updateSavedSearch.isPending}
          aria-label={t('alertsLabel')}
        />
      </div>
      <SavedSearchFreshness search={search} />
    </li>
  );
}
