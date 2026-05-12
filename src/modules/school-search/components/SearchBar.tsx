'use client';
import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useSearchShortcut } from '@/modules/school-search/hooks/use-search-shortcut';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SearchBarProps } from '@/modules/school-search/types/component.types';

export function SearchBar({ className }: SearchBarProps) {
  const t = useTranslations('SchoolSearch');
  const query = useSchoolSearchStore((s) => s.query);
  const setQuery = useSchoolSearchStore((s) => s.setQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  useSearchShortcut(inputRef);

  const shortcutLabel =
    typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) ? '⌘K' : '/';

  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 rounded-pill border border-border bg-card px-5 py-3 shadow-2 transition-shadow focus-within:border-primary focus-within:shadow-3',
        className,
      )}
    >
      <Search
        className='h-4 w-4 shrink-0 text-foggy transition-colors group-focus-within:text-primary'
        strokeWidth={1.75}
        aria-hidden='true'
      />
      <input
        ref={inputRef}
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        className='w-full border-0 bg-transparent text-body text-foreground placeholder:text-quill outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
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
          onClick={() => setQuery('')}
          aria-label={t('clearSearch')}
          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foggy transition-colors hover:bg-ink-200 hover:text-foreground'
        >
          <X className='h-3 w-3' strokeWidth={2.5} aria-hidden='true' />
        </button>
      )}
    </div>
  );
}
