'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import { cn } from '@/lib/utils';
import { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
import { useMapViewportReporter } from '@/modules/school-search/hooks/useMapViewportReporter';
import { useGeocodeSearch } from '@/modules/school-search/hooks/useGeocodeSearch';
import { useStateFilterMapSync } from '@/modules/school-search/hooks/useStateFilterMapSync';
import { MapZoomControls } from '@/modules/school-search/components/MapZoomControls';
import { ScrollWheelZoomHandler } from '@/modules/school-search/components/ScrollWheelZoomHandler';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { MapViewProps } from '@/modules/school-search/types/component.types';

const LeafletMap = dynamic(
  () =>
    import('@/modules/school-search/components/LeafletMap').then(
      (mod) => mod.LeafletMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full w-full items-center justify-center rounded-lg bg-muted'>
        <span
          className='animate-pulse text-caption font-semibold uppercase text-foggy'
          style={{ letterSpacing: '0.08em' }}
        >
          Loading map…
        </span>
      </div>
    ),
  },
);

export function MapView({ className }: MapViewProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const resetCount = useSchoolSearchStore((s) => s.resetCount);
  const { data } = useSearchWithFilters();
  const schools = data?.data?.hits ?? [];
  const prevResetRef = useRef(resetCount);

  const handleMapReady = useCallback((m: L.Map) => setMap(m), []);

  useEffect(() => {
    if (!map || resetCount === prevResetRef.current) return;
    prevResetRef.current = resetCount;
    map.setView([-28, 133], 5, { animate: true });
  }, [map, resetCount]);

  useMapViewportReporter(map);
  useGeocodeSearch(map);
  useStateFilterMapSync(map);

  return (
    <>
      <div className={cn('relative h-full w-full overflow-hidden rounded-lg border border-border shadow-2', className)}>
        <LeafletMap schools={schools} onMapReady={handleMapReady} />
        {map && <ScrollWheelZoomHandler map={map} />}
      </div>
      {map && <MapZoomControls map={map} />}
    </>
  );
}
