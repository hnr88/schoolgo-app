'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AGENT_SORT_OPTIONS } from '@/modules/agent-search/constants/agent-search.constants';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import type { AgentSortBy } from '@/modules/agent-search/types/agent-search.types';

interface AgentSortControlProps {
  className?: string;
}

export function AgentSortControl({ className }: AgentSortControlProps) {
  const t = useTranslations('AgentSearch.filters');
  const sortBy = useAgentSearchStore((s) => s.sortBy);
  const setSortBy = useAgentSearchStore((s) => s.setSortBy);

  return (
    <Select value={sortBy} onValueChange={(v) => setSortBy(v as AgentSortBy)}>
      <SelectTrigger
        size="sm"
        aria-label={t('sortLabel')}
        className={cn('gap-1.5 rounded-pill text-xs font-medium', className)}
      >
        <span className="text-muted-foreground">{t('sortLabel')}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AGENT_SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {t(opt.labelKey as never)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
