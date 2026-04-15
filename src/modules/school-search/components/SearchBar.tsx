'use client';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const t = useTranslations('SchoolSearch');
  const query = useSchoolSearchStore((s) => s.query);
  const setQuery = useSchoolSearchStore((s) => s.setQuery);

  return (
    <div className={cn('relative group', className)}>
      <Search
        className='absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none'
        aria-hidden='true'
      />
      <Input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        className='w-full h-16 pl-16 pr-6 bg-surface-container-lowest rounded-3xl border-none shadow-lg shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-transparent text-on-surface font-medium placeholder:text-on-surface-variant/50'
      />
    </div>
  );
}
