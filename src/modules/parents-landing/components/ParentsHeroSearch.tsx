'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { ParentsHeroSearchProps } from '@/modules/parents-landing/types/parents-landing.types';

export function ParentsHeroSearch({
  ariaLabel,
  buttonLabel,
  fields,
}: ParentsHeroSearchProps) {
  const t = useTranslations('ParentsHero');
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

  function handleClear() {
    setLocalQuery('');
  }

  const isMac =
    typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
  const kbdHint = isMac ? '⌘K' : '/';

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
            enterKeyHint='search'
            inputMode='search'
            autoComplete='off'
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={fields.where.value}
            aria-label={fields.where.label}
            className='min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-foreground placeholder:text-foggy outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          />
          {localQuery.length > 0 && (
            <button
              type='button'
              onClick={handleClear}
              aria-label={t('searchClearLabel')}
              className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foggy hover:bg-muted hover:text-ink-900'
            >
              <X className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
            </button>
          )}
        </div>
        <button
          type='button'
          aria-label={buttonLabel}
          onClick={handleSearch}
          className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          <Search className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
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
            <div className='flex min-w-0 items-center gap-2'>
              <input
                type='search'
                enterKeyHint='search'
                inputMode='search'
                autoComplete='off'
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={fields.where.value}
                aria-label={fields.where.label}
                className='min-w-0 w-full border-0 bg-transparent text-sm text-foreground placeholder:text-foggy outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              />
              {localQuery.length > 0 ? (
                <button
                  type='button'
                  onClick={handleClear}
                  aria-label={t('searchClearLabel')}
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foggy hover:bg-muted hover:text-ink-900'
                >
                  <X className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
                </button>
              ) : (
                <kbd
                  aria-hidden='true'
                  className='shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground'
                >
                  {kbdHint}
                </kbd>
              )}
            </div>
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
          className='mr-2.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-rausch-600 hover:shadow-brand active:bg-rausch-700'
        >
          <Search className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
        </button>
      </div>
    </>
  );
}
