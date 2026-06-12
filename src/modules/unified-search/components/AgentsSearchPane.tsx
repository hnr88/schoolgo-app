'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { AgentFilterSidebar } from '@/modules/agent-search/components/AgentFilterSidebar';
import { AgentPagination } from '@/modules/agent-search/components/AgentPagination';
import { AgentResultsPanel } from '@/modules/agent-search/components/AgentResultsPanel';
import { AgentSearchTopBar } from '@/modules/agent-search/components/AgentSearchTopBar';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import type { SearchCapability } from '@/modules/unified-search/types/unified-search.types';

// AgentMapView statically imports leaflet (references `window`), so it must NOT
// be in the SSR bundle. Load it client-only and NEVER re-export from a barrel.
const AgentMapView = dynamic(
  () =>
    import('@/modules/agent-search/components/AgentMapView').then((m) => m.AgentMapView),
  { ssr: false },
);

interface AgentsSearchPaneProps {
  activePortal: Portal;
  capability: SearchCapability;
  className?: string;
}

export function AgentsSearchPane({ activePortal, capability, className }: AgentsSearchPaneProps) {
  const { data } = useAgentSearchWithFilters(capability);

  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? 0;
  const showMap = capability.canMap;

  return (
    <div className={cn('flex w-full', className)}>
      <AgentFilterSidebar capability={capability} />

      <section className="flex min-w-0 flex-1 flex-col gap-3 p-3 md:p-4">
        <AgentSearchTopBar />

        <div
          className={cn(
            'min-h-0 flex-1',
            showMap && 'lg:grid lg:grid-cols-[1fr_minmax(0,40%)] lg:gap-4',
          )}
        >
          <div className="flex flex-col gap-6">
            <AgentResultsPanel
              activePortal={activePortal}
              capability={capability}
              mapOpen={showMap}
            />
            <AgentPagination total={total} pageSize={pageSize} className="pt-2" />
          </div>

          {showMap && (
            <div className="hidden lg:sticky lg:top-[var(--header-height)] lg:block lg:h-content-viewport">
              <AgentMapView activePortal={activePortal} capability={capability} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
