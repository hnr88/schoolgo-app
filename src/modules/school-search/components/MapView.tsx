'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
import { useMapViewportReporter } from '@/modules/school-search/hooks/useMapViewportReporter';
import { useGeocodeSearch } from '@/modules/school-search/hooks/useGeocodeSearch';
import { useStateFilterMapSync } from '@/modules/school-search/hooks/useStateFilterMapSync';
import { MapZoomControls } from '@/modules/school-search/components/MapZoomControls';
import { ScrollWheelZoomHandler } from '@/modules/school-search/components/ScrollWheelZoomHandler';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';
import type { MapViewProps } from '@/modules/school-search/types/component.types';

const EMPTY_SCHOOLS: SchoolHit[] = [];

function MapLoadingFallback() {
  const t = useTranslations('SchoolSearch.map');
  return (
    <Skeleton className='flex h-full w-full items-center justify-center rounded-lg'>
      <span
        className='text-caption font-semibold uppercase tracking-eyebrow text-foggy'

      >
        {t('loading')}
      </span>
    </Skeleton>
  );
}

const LeafletMap = dynamic(
  () =>
    import('@/modules/school-search/components/LeafletMap').then(
      (mod) => mod.LeafletMap,
    ),
  {
    ssr: false,
    loading: () => <MapLoadingFallback />,
  },
);

export function MapView({ className, activePortal }: MapViewProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const resetCount = useSchoolSearchStore((s) => s.resetCount);
  const { data } = useSearchWithFilters();
  const freshSchools = data?.data?.hits ?? EMPTY_SCHOOLS;
  const prevSchoolsRef = useRef<SchoolHit[]>(EMPTY_SCHOOLS);

  const schools = useMemo(() => {
    const prev = prevSchoolsRef.current;

    if (freshSchools.length === 0) {
      prevSchoolsRef.current = EMPTY_SCHOOLS;
      return EMPTY_SCHOOLS;
    }

    if (prev.length === 0) {
      prevSchoolsRef.current = freshSchools;
      return freshSchools;
    }

    const freshIds = new Set(freshSchools.map((s) => s.documentId));
    const prevIds = new Set(prev.map((s) => s.documentId));
    const overlapCount = freshSchools.filter((s) => prevIds.has(s.documentId)).length;
    const overlapRatio = overlapCount / freshSchools.length;

    if (overlapRatio > 0.5 && prev.length < 1500) {
      const retained = prev.filter((s) => !freshIds.has(s.documentId));
      if (retained.length === 0) {
        prevSchoolsRef.current = freshSchools;
        return freshSchools;
      }
      const merged = [...freshSchools, ...retained];
      prevSchoolsRef.current = merged;
      return merged;
    }

    prevSchoolsRef.current = freshSchools;
    return freshSchools;
  }, [freshSchools]);

  const prevResetRef = useRef(resetCount);

  const handleMapReady = useCallback((m: L.Map) => setMap(m), []);

  useEffect(() => {
    if (!map || resetCount === prevResetRef.current) return;
    prevResetRef.current = resetCount;
    prevSchoolsRef.current = EMPTY_SCHOOLS;
    map.setView([-28, 133], 5, { animate: true });
  }, [map, resetCount]);

  useEffect(() => {
    if (!map) return;
    const timer = setTimeout(() => {
      map.eachLayer((layer: unknown) => {
        const cl = layer as Record<string, unknown>;
        if (typeof cl._moveChild === 'function' && !cl._moveChildPatched) {
          const orig = cl._moveChild as (child: unknown, from: L.LatLng, to: L.LatLng) => void;
          cl._moveChild = function (child: unknown, from: L.LatLng, to: L.LatLng) {
            if (Math.abs(from.lat - to.lat) < 1e-10 && Math.abs(from.lng - to.lng) < 1e-10) return;
            orig.call(this, child, from, to);
          };
          cl._moveChildPatched = true;
        }
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [map]);

  useMapViewportReporter(map);
  useGeocodeSearch(map);
  useStateFilterMapSync(map);

  return (
    <>
      <div className={cn('relative h-full w-full overflow-hidden rounded-lg border border-border shadow-2', className)}>
        <LeafletMap schools={schools} onMapReady={handleMapReady} activePortal={activePortal} />
        {map && <ScrollWheelZoomHandler map={map} />}
      </div>
      {map && <MapZoomControls map={map} />}
    </>
  );
}
