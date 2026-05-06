'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { ParentsHeroSearchProps } from '@/modules/parents-landing/types/parents-landing.types';

export function ParentsHeroSearch({
  ariaLabel,
  buttonLabel,
  fields,
}: ParentsHeroSearchProps) {
  const router = useRouter();
  const setStoreQuery = useSchoolSearchStore((s) => s.setQuery);
  const [localQuery, setLocalQuery] = useState('');

  function handleSearch() {
    setStoreQuery(localQuery);
    router.push('/search');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <>
      <div
        role='search'
        aria-label={ariaLabel}
        className='flex w-full max-w-3xl items-center gap-1 rounded-pill border border-border bg-card p-1 shadow-2 transition-shadow focus-within:shadow-3 hover:shadow-3 sm:hidden'
      >
        <div className='flex min-w-0 flex-1 items-center gap-1 px-3'>
          <Search className='h-4 w-4 shrink-0 text-foggy' strokeWidth={2} aria-hidden='true' />
          <input
            type='search'
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={fields.where.value}
            aria-label={fields.where.label}
            className='min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-foreground placeholder:text-foggy outline-none'
          />
        </div>
        <button
          type='button'
          aria-label={buttonLabel}
          onClick={handleSearch}
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          <Search className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
        </button>
      </div>

      <div
        role='search'
        aria-label={ariaLabel}
        className='hidden w-full max-w-3xl items-center gap-1 rounded-pill border border-border bg-card p-1.5 shadow-2 transition-shadow focus-within:shadow-3 hover:shadow-3 sm:flex'
      >
        <div className='flex min-w-0 flex-1 items-center'>
          <div className='flex min-w-0 flex-1 flex-col rounded-l-4xl rounded-r-md px-5 py-3 transition-colors focus-within:bg-muted'>
            <span className='text-sm font-semibold text-ink-900'>{fields.where.label}</span>
            <input
              type='search'
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={fields.where.value}
              aria-label={fields.where.label}
              className='min-w-0 w-full border-0 bg-transparent text-sm text-foreground placeholder:text-foggy outline-none'
            />
          </div>
          <span className='h-8 w-px shrink-0 bg-divider' aria-hidden='true' />
        </div>
        <div className='flex flex-1 items-center'>
          <button
            type='button'
            onClick={handleSearch}
            className='flex flex-1 flex-col items-start justify-center rounded-md px-5 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'
          >
            <span className='text-sm font-semibold text-ink-900'>{fields.yearLevel.label}</span>
            <span className='truncate text-sm text-foggy'>{fields.yearLevel.value}</span>
          </button>
          <span className='h-8 w-px shrink-0 bg-divider' aria-hidden='true' />
        </div>
        <div className='flex flex-1 items-center'>
          <button
            type='button'
            onClick={handleSearch}
            className='flex flex-1 flex-col items-start justify-center rounded-l-md rounded-r-4xl px-5 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'
          >
            <span className='text-sm font-semibold text-ink-900'>{fields.fees.label}</span>
            <span className='truncate text-sm text-foggy'>{fields.fees.value}</span>
          </button>
        </div>
        <button
          type='button'
          aria-label={buttonLabel}
          onClick={handleSearch}
          className='mr-2.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          <Search className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
        </button>
      </div>
    </>
  );
}
