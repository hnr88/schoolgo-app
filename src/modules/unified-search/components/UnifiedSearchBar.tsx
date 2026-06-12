'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { useSearchModeStore } from '@/modules/unified-search/stores/use-search-mode-store';

interface UnifiedSearchBarProps {
  className?: string;
}

export function UnifiedSearchBar({ className }: UnifiedSearchBarProps) {
  const t = useTranslations('UnifiedSearch.bar');
  const mode = useSearchModeStore((s) => s.mode);

  const schoolQuery = useSchoolSearchStore((s) => s.query);
  const setSchoolQuery = useSchoolSearchStore((s) => s.setQuery);
  const agentQuery = useAgentSearchStore((s) => s.q);
  const setAgentQuery = useAgentSearchStore((s) => s.setQuery);

  const isSchools = mode === 'schools';
  const value = isSchools ? schoolQuery : agentQuery;
  const setQuery = isSchools ? setSchoolQuery : setAgentQuery;
  const placeholder = isSchools ? t('placeholderSchools') : t('placeholderAgents');

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-pill border border-border bg-card py-2 pr-2 pl-5',
        'transition-shadow ease-out-quart hover:shadow-2 focus-within:shadow-2 motion-reduce:transition-none',
        className,
      )}
    >
      <Search
        className="size-5 shrink-0 text-foggy transition-colors group-focus-within:text-primary"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-auto w-full border-0 bg-transparent px-0 py-0 text-body shadow-none placeholder:text-foggy focus-visible:ring-0"
      />
      <button
        type="button"
        aria-label={t('search')}
        className={cn(
          'grid size-12 shrink-0 place-items-center rounded-pill bg-primary text-on-primary',
          'transition ease-out-quart hover:bg-primary-strong active:scale-95 motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <Search className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
