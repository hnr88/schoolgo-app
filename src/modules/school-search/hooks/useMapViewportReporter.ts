'use client';

import { useEffect, useRef } from 'react';
import type { Map } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

const RADIUS_BUFFER = 3;
const CENTER_MOVE_RATIO = 0.3;

interface Snapshot {
  lat: number;
  lng: number;
  radiusKm: number;
  zoom: number;
}

export function useMapViewportReporter(map: Map | null) {
  const setMapBounds = useSchoolSearchStore((s) => s.setMapBounds);
  const prevRef = useRef<Snapshot>({ lat: -28, lng: 133, radiusKm: 5000, zoom: 5 });

  useEffect(() => {
    if (!map) return;
    const m = map;

    function reportBounds() {
      const center = m.getCenter();
      const zoom = m.getZoom();
      const prev = prevRef.current;

      let radiusKm: number;
      if (zoom === prev.zoom) {
        radiusKm = prev.radiusKm;
      } else {
        const bounds = m.getBounds();
        const radiusM = center.distanceTo(bounds.getNorthEast());
        radiusKm = Math.min(5000, Math.max(1, Math.ceil((radiusM * RADIUS_BUFFER) / 1000)));
      }

      if (zoom > prev.zoom) {
        prevRef.current = { lat: center.lat, lng: center.lng, radiusKm: prev.radiusKm, zoom };
        return;
      }

      const movedKm = center.distanceTo([prev.lat, prev.lng]) / 1000;
      if (zoom === prev.zoom && movedKm < radiusKm * CENTER_MOVE_RATIO) {
        return;
      }

      const lat = Number(center.lat.toFixed(4));
      const lng = Number(center.lng.toFixed(4));
      prevRef.current = { lat: center.lat, lng: center.lng, radiusKm, zoom };
      setMapBounds({ lat, lng, radiusKm });
    }

    reportBounds();
    map.on('moveend', reportBounds);

    return () => {
      map.off('moveend', reportBounds);
    };
  }, [map, setMapBounds]);
}
