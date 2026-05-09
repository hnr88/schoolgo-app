'use client';

import { useEffect, useRef } from 'react';
import type { Map } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { geocodeQuery } from '@/modules/school-search/lib/geocode-api';

const GEOCODE_DEBOUNCE_MS = 600;

export function useGeocodeSearch(map: Map | null) {
  const query = useSchoolSearchStore((s) => s.query);
  const setGeocodedQuery = useSchoolSearchStore((s) => s.setGeocodedQuery);
  const lastGeocodedRef = useRef('');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!query.trim()) {
      lastGeocodedRef.current = '';
      setGeocodedQuery('');
      return;
    }

    if (query === lastGeocodedRef.current) return;

    setGeocodedQuery('');

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await geocodeQuery(query);
        if (controller.signal.aborted) return;

        if (result) {
          const [south, north, west, east] = result.boundingbox;
          map.flyToBounds([[south, west], [north, east]], {
            paddingTopLeft: [50, 50],
            paddingBottomRight: [340, 50],
            maxZoom: 10,
          });
          lastGeocodedRef.current = query;
          setGeocodedQuery(query);
        }
      } catch {
        // geocoding failed silently
      }
    }, GEOCODE_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [map, query, setGeocodedQuery]);
}
