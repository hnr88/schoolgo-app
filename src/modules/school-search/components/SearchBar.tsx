'use client';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SearchBarProps } from '@/modules/school-search/types/component.types';

export function SearchBar({ className }: SearchBarProps) {
  const t = useTranslations('SchoolSearch');
  const query = useSchoolSearchStore((s) => s.query);
  const setQuery = useSchoolSearchStore((s) => s.setQuery);

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
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        className='w-full border-0 bg-transparent text-body text-foreground placeholder:text-quill outline-none'
      />
    </div>
  );
}
