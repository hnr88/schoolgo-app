'use client';

import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  VAULT_SORT_LABEL_KEY,
} from '@/modules/document-vault/constants/document-vault.constants';
import { VAULT_SORT_OPTIONS } from '@/modules/document-vault/types/document-vault.types';
import type {
  VaultDocumentsToolbarProps,
  VaultSortOption,
  VaultTypeFilter,
} from '@/modules/document-vault/types/document-vault.types';

export function VaultDocumentsToolbar({
  totalCount,
  resultCount,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  sort,
  onSortChange,
  availableTypes,
}: VaultDocumentsToolbarProps) {
  const t = useTranslations('DocumentVault');
  const showCount = search.trim().length > 0 || typeFilter !== 'all' ? resultCount : totalCount;

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-sm font-medium text-foggy' aria-live='polite'>
        {t('countLabel', { count: showCount })}
      </p>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
        <div className='relative flex-1'>
          <Search
            className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foggy'
            aria-hidden='true'
          />
          <Input
            type='search'
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className={cn('pl-9', search && 'pr-9')}
            aria-label={t('searchPlaceholder')}
          />
          {search ? (
            <button
              type='button'
              aria-label={t('clearSearch')}
              onClick={() => onSearchChange('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-foggy transition-colors hover:text-ink-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
            >
              <X className='h-4 w-4' />
            </button>
          ) : null}
        </div>

        <Select
          value={typeFilter}
          onValueChange={(value) => onTypeFilterChange(value as VaultTypeFilter)}
        >
          <SelectTrigger className='lg:w-52' aria-label={t('filterTypeLabel')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('filterTypeAll')}</SelectItem>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`docType_${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => onSortChange(value as VaultSortOption)}>
          <SelectTrigger className='lg:w-48' aria-label={t('sortLabel')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VAULT_SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {t(VAULT_SORT_LABEL_KEY[option])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
