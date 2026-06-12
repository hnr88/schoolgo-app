'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { AgentFilterSidebar } from '@/modules/agent-search/components/AgentFilterSidebar';
import { AgentPagination } from '@/modules/agent-search/components/AgentPagination';
import { AgentResultsPanel } from '@/modules/agent-search/components/AgentResultsPanel';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import type { SearchCapability } from '@/modules/unified-search/types/unified-search.types';

interface AgentsSearchPaneProps {
  activePortal: Portal;
  capability: SearchCapability;
  className?: string;
}

export function AgentsSearchPane({ activePortal, capability, className }: AgentsSearchPaneProps) {
  const t = useTranslations('AgentSearch.header');
  const { data, isLoading } = useAgentSearchWithFilters(capability);

  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? 0;

  return (
    <div className={cn('flex w-full', className)}>
      <AgentFilterSidebar capability={capability} />

      <section className="flex min-w-0 flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
        <p className="text-body-sm text-foggy">
          {isLoading ? t('countLoading') : t('count', { count: total })}
        </p>

        <AgentResultsPanel activePortal={activePortal} capability={capability} />

        <AgentPagination total={total} pageSize={pageSize} className="pt-2" />
      </section>
    </div>
  );
}
