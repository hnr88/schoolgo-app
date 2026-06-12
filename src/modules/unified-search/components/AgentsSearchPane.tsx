'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { AgentFilterSidebar } from '@/modules/agent-search/components/AgentFilterSidebar';
import { AgentPagination } from '@/modules/agent-search/components/AgentPagination';
import { AgentResultsPanel } from '@/modules/agent-search/components/AgentResultsPanel';
import { AgentSearchTopBar } from '@/modules/agent-search/components/AgentSearchTopBar';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import { useSearchFiltersStore } from '@/modules/unified-search/stores/use-search-filters-store';
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
  const filtersOpen = useSearchFiltersStore((s) => s.open);

  return (
    <div className={cn('flex min-h-0 w-full flex-1', className)}>
      <AgentFilterSidebar capability={capability} open={filtersOpen} />

      <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-2 md:p-3">
        <AgentSearchTopBar />

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col',
            showMap &&
              'lg:grid lg:grid-rows-1 lg:gap-3 lg:grid-cols-[minmax(0,1fr)_17rem] 3xl:grid-cols-[minmax(0,1fr)_40%]',
          )}
        >
          {showMap && (
            <div className="hidden min-h-0 lg:block lg:h-full">
              <AgentMapView activePortal={activePortal} capability={capability} />
            </div>
          )}

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-4">
            <AgentResultsPanel
              activePortal={activePortal}
              capability={capability}
              mapOpen={showMap}
            />
            <AgentPagination total={total} pageSize={pageSize} className="pt-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
