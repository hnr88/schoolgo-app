'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import type { School } from '@/modules/school-search/types/school.types';

export function useMapFitBounds(schools: School[]) {
  const map = useMap();

  useEffect(() => {
    if (schools.length === 0) return;
    const bounds = L.latLngBounds(
      schools.map((s) => [s.lat, s.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, schools]);
}
