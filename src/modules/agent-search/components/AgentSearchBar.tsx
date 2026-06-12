'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';

interface AgentSearchBarProps {
  className?: string;
}

export function AgentSearchBar({ className }: AgentSearchBarProps) {
  const t = useTranslations('AgentSearch.header');
  const q = useAgentSearchStore((s) => s.q);
  const setQuery = useAgentSearchStore((s) => s.setQuery);

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-pill border border-border bg-card px-5 py-3 shadow-2 transition-shadow focus-within:border-primary focus-within:shadow-3',
        className,
      )}
    >
      <Search
        className='h-4 w-4 shrink-0 text-foggy transition-colors group-focus-within:text-primary'
        strokeWidth={1.75}
        aria-hidden='true'
      />
      <Input
        type='search'
        value={q}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        className='h-auto w-full border-0 bg-transparent px-0 py-0 text-body shadow-none placeholder:text-quill focus-visible:ring-0'
      />
      {q.length > 0 && (
        <button
          type='button'
          onClick={() => setQuery('')}
          aria-label={t('clearSearch')}
          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foggy transition-colors hover:bg-ink-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
        >
          <X className='h-3 w-3' strokeWidth={2.5} aria-hidden='true' />
        </button>
      )}
    </div>
  );
}
