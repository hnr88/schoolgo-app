'use client';
import { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core';
import { Input } from '@/components/ui/input';
import { SearchAutocompleteDropdown } from '@/modules/school-search/components/SearchAutocompleteDropdown';
import { useSearchShortcut } from '@/modules/school-search/hooks/use-search-shortcut';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SearchBarProps } from '@/modules/school-search/types/component.types';

export function SearchBar({ className }: SearchBarProps) {
  const t = useTranslations('SchoolSearch');
  const query = useSchoolSearchStore((s) => s.query);
  const setQuery = useSchoolSearchStore((s) => s.setQuery);
  const clearSearch = useSchoolSearchStore((s) => s.clearSearch);
  const setLocationSearch = useSchoolSearchStore((s) => s.setLocationSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  useSearchShortcut(inputRef);

  const shortcutLabel =
    typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) ? '⌘K' : '/';

  const handleFocus = () => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    blurTimerRef.current = setTimeout(() => setIsFocused(false), 150);
  };

  const handleClearSearch = () => {
    clearSearch();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className={cn('relative', className)}>
      <div className='group relative flex h-12 items-center gap-3 rounded-pill border border-border bg-card px-5 shadow-2 transition-shadow ease-out-quart focus-within:border-primary focus-within:shadow-3 motion-reduce:transition-none'>
        <Search
          className='size-5 shrink-0 text-foggy transition-colors group-focus-within:text-primary'
          strokeWidth={1.75}
          aria-hidden='true'
        />
        <Input
          ref={inputRef}
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className='h-auto w-full border-0 bg-transparent px-0 py-0 text-body shadow-none placeholder:text-quill focus-visible:ring-0'
        />
        {query.length === 0 && (
          <kbd
            aria-hidden='true'
            className='pointer-events-none rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground group-focus-within:hidden'
          >
            {shortcutLabel}
          </kbd>
        )}
        {query && (
          <button
            type='button'
            onClick={handleClearSearch}
            aria-label={t('clearSearch')}
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-pill bg-muted text-foggy transition-colors hover:bg-ink-200 hover:text-foreground',
              FOCUS_RING,
            )}
          >
            <X className='h-3 w-3' strokeWidth={2.5} aria-hidden='true' />
          </button>
        )}
      </div>
      <SearchAutocompleteDropdown
        query={query}
        isOpen={isFocused && query.trim().length > 0}
        onSelectSchool={(hit) => {
          setQuery(hit.name);
          setIsFocused(false);
        }}
        onSelectSuburb={(hit) => {
          setLocationSearch({ suburb: hit.suburb, postcode: hit.postcode });
          setIsFocused(false);
        }}
        onClose={() => setIsFocused(false)}
      />
    </div>
  );
}
