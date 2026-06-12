'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { useMapInvalidateSize } from '@/modules/school-search/hooks/useMapInvalidateSize';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import type { AgentHit, AgentPartnerSchool } from '@/modules/agent-search/types/agent-search.types';
import type { SearchCapability } from '@/modules/unified-search';

const EMPTY_AGENTS: AgentHit[] = [];

interface AgentMapViewProps {
  activePortal: Portal;
  capability: SearchCapability;
  className?: string;
}

function AgentMapLoadingFallback() {
  const t = useTranslations('AgentSearch.map');
  return (
    <Skeleton className="flex h-full w-full items-center justify-center rounded-lg">
      <span className="text-caption font-semibold uppercase tracking-eyebrow text-foggy">
        {t('loading')}
      </span>
    </Skeleton>
  );
}

// AgentLeafletMap statically imports leaflet (references `window`), so it must
// be kept out of the SSR bundle. Load it client-only.
const AgentLeafletMap = dynamic(
  () =>
    import('@/modules/agent-search/components/AgentLeafletMap').then(
      (mod) => mod.AgentLeafletMap,
    ),
  { ssr: false, loading: () => <AgentMapLoadingFallback /> },
);

export function AgentMapView({ activePortal, capability, className }: AgentMapViewProps) {
  const t = useTranslations('AgentSearch.map');
  const [map, setMap] = useState<L.Map | null>(null);

  const reset = useAgentSearchStore((s) => s.reset);
  const resetCount = useAgentSearchStore((s) => s.resetCount);

  const { data } = useAgentSearchWithFilters(capability);
  const agents = data?.data?.hits ?? EMPTY_AGENTS;
  // The agent map plots the agents' Australian partner schools (deduped), not
  // the agents' own overseas offices.
  const partnerSchools = useMemo(() => {
    const byId = new Map<string, AgentPartnerSchool>();
    for (const agent of agents) {
      for (const school of agent.partnerSchools ?? []) {
        if (!byId.has(school.documentId)) byId.set(school.documentId, school);
      }
    }
    return Array.from(byId.values());
  }, [agents]);
  const geoCount = partnerSchools.length;

  const handleMapReady = useCallback((m: L.Map) => setMap(m), []);

  const prevResetRef = useRef(resetCount);
  useEffect(() => {
    if (!map || resetCount === prevResetRef.current) return;
    prevResetRef.current = resetCount;
    map.setView([-28, 133], 5, { animate: true });
  }, [map, resetCount]);

  useMapInvalidateSize(map, geoCount);

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-lg border border-border shadow-2',
        className,
      )}
    >
      <AgentLeafletMap schools={partnerSchools} onMapReady={handleMapReady} activePortal={activePortal} />

      {map && (
        <div className="absolute bottom-6 left-6 z-map-controls flex flex-col gap-2">
          <button
            type="button"
            aria-label={t('reset')}
            onClick={reset}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t('zoomIn')}
            onClick={() => map.zoomIn()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t('zoomOut')}
            onClick={() => map.zoomOut()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
          >
            <Minus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
