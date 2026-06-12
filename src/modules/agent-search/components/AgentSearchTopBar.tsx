'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { AGENT_COUNTRY_OPTIONS } from '@/modules/agent-search/constants/agent-search.constants';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';

interface AgentSearchTopBarProps {
  className?: string;
}

export function AgentSearchTopBar({ className }: AgentSearchTopBarProps) {
  const t = useTranslations('AgentSearch.filters');

  const countriesServed = useAgentSearchStore((s) => s.countriesServed);
  const toggleCountry = useAgentSearchStore((s) => s.toggleCountry);

  const handleChange = (next: string[] | string | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const removed = countriesServed.filter((v) => !nextArr.includes(v));
    const added = nextArr.filter((v) => !countriesServed.includes(v));
    removed.forEach(toggleCountry);
    added.forEach(toggleCountry);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-card px-4 py-3 shadow-1',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <FilterChipGroup<string>
          options={AGENT_COUNTRY_OPTIONS}
          value={countriesServed}
          onChange={handleChange}
          multi
          ariaLabel={t('countries')}
          size="sm"
          className="items-center"
          getLabel={(option) => t(option.labelKey as never)}
        />
      </div>
    </div>
  );
}
