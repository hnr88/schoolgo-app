'use client';

import { useEffect } from 'react';
import type { Map } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

export function useMapViewportReporter(map: Map | null) {
  const setMapBounds = useSchoolSearchStore((s) => s.setMapBounds);

  useEffect(() => {
    if (!map) return;
    const m = map;

    function reportBounds() {
      const center = m.getCenter();
      const bounds = m.getBounds();
      const radiusM = center.distanceTo(bounds.getNorthEast());
      const radiusKm = Math.max(1, Math.ceil(radiusM / 1000));

      setMapBounds({
        lat: Number(center.lat.toFixed(4)),
        lng: Number(center.lng.toFixed(4)),
        radiusKm: Math.min(radiusKm, 5000),
      });
    }

    reportBounds();
    map.on('moveend', reportBounds);

    return () => {
      map.off('moveend', reportBounds);
    };
  }, [map, setMapBounds]);
}
