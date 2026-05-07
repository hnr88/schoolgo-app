'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export function useMapFitBounds(schools: SchoolHit[]) {
  const map = useMap();

  useEffect(() => {
    const withGeo = schools.filter((s) => s._geo != null);
    if (withGeo.length === 0) return;
    const bounds = L.latLngBounds(
      withGeo.map((s) => [s._geo!.lat, s._geo!.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, schools]);
}
