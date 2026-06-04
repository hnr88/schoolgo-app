'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAutocompleteSchools } from '@/modules/school-search/queries/use-autocomplete-schools.query';
import { useAutocompleteSuburbs } from '@/modules/school-search/queries/use-autocomplete-suburbs.query';
import type { SearchAutocompleteDropdownProps } from '@/modules/school-search/types/component.types';

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SearchAutocompleteDropdown({
  query,
  isOpen,
  onSelectSchool,
  onSelectSuburb,
  onClose,
}: SearchAutocompleteDropdownProps) {
  const t = useTranslations('SchoolSearch');
  const containerRef = useRef<HTMLDivElement>(null);

  const schoolsQuery = useAutocompleteSchools(query, 6);
  const suburbsQuery = useAutocompleteSuburbs(query, 5);

  const schools = schoolsQuery.isPlaceholderData ? [] : schoolsQuery.data?.data ?? [];
  const suburbs = suburbsQuery.isPlaceholderData ? [] : suburbsQuery.data?.data ?? [];
  const isLoading = schoolsQuery.isFetching || suburbsQuery.isFetching;
  const isEmpty = !isLoading && schools.length === 0 && suburbs.length === 0;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || query.trim().length === 0) return null;

  return (
    <div
      ref={containerRef}
      role='listbox'
      aria-label={t('searchPlaceholder')}
      className='absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-lg border border-border bg-card p-2 shadow-3'
    >
      {isLoading && (
        <div
          role='status'
          className='flex min-h-10 items-center gap-2 px-3 py-2 text-sm text-muted-foreground'
          aria-live='polite'
        >
          <Loader2 className='h-3.5 w-3.5 animate-spin' aria-hidden='true' />
          {t('autocomplete.loading')}
        </div>
      )}

      {isEmpty && (
        <div role='status' className='px-3 py-2 text-sm text-muted-foreground'>
          {t('autocomplete.empty')}
        </div>
      )}

      {schools.length > 0 && (
        <div className='flex flex-col gap-1'>
          <div className='px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t('autocomplete.schoolsHeading')}
          </div>
          {schools.map((hit) => (
            <button
              key={hit.id}
              type='button'
              onClick={() => {
                onSelectSchool(hit);
                onClose();
              }}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
            >
              {hit.logoUrl ? (
                <Image
                  src={hit.logoUrl}
                  alt=''
                  width={24}
                  height={24}
                  className='h-6 w-6 shrink-0 rounded-sm object-cover'
                />
              ) : (
                <div
                  aria-hidden='true'
                  className='flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-muted text-xs font-medium text-muted-foreground'
                >
                  {getInitials(hit.name)}
                </div>
              )}
              <span className='flex flex-col'>
                <span className='font-medium text-foreground'>{hit.name}</span>
                <span className='text-xs text-muted-foreground'>
                  {hit.suburb}, {hit.state}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {suburbs.length > 0 && (
        <div className='mt-2 flex flex-col gap-1'>
          <div className='px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t('autocomplete.suburbsHeading')}
          </div>
          {suburbs.map((hit) => (
            <button
              key={`${hit.suburb}-${hit.postcode}-${hit.state}`}
              type='button'
              onClick={() => {
                onSelectSuburb(hit);
                onClose();
              }}
              className='flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
            >
              <span className='font-medium text-foreground'>{hit.suburb}</span>
              <span className='text-xs text-muted-foreground'>
                {hit.postcode} {hit.state}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
