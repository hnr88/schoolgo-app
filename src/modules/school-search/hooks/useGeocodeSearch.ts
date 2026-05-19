'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Map } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { geocodeQuery } from '@/modules/school-search/lib/geocode-api';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const GEOCODE_DEBOUNCE_MS = 600;
const GEOCODE_MAX_ZOOM = 10;
const GEOCODE_PADDING_TOP_LEFT: [number, number] = [50, 50];
const GEOCODE_PADDING_BOTTOM_RIGHT: [number, number] = [340, 50];

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isExactSchoolSearch(query: string, schools: SchoolHit[]): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return false;
  return schools.some((school) => normalizeSearchText(school.name) === normalizedQuery);
}

function mapAlreadyShowsBounds(
  map: Map,
  boundsInput: [[number, number], [number, number]],
): boolean {
  const bounds = L.latLngBounds(boundsInput);
  return map.getBounds().contains(bounds) && map.getZoom() <= GEOCODE_MAX_ZOOM;
}

export function useGeocodeSearch(map: Map | null, schools: SchoolHit[] = []) {
  const query = useSchoolSearchStore((s) => s.query);
  const suburb = useSchoolSearchStore((s) => s.suburb);
  const postcode = useSchoolSearchStore((s) => s.postcode);
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

    if (suburb.trim() || postcode.trim() || isExactSchoolSearch(query, schools)) {
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
          const bounds: [[number, number], [number, number]] = [[south, west], [north, east]];
          if (!mapAlreadyShowsBounds(map, bounds)) {
            map.flyToBounds(bounds, {
              paddingTopLeft: GEOCODE_PADDING_TOP_LEFT,
              paddingBottomRight: GEOCODE_PADDING_BOTTOM_RIGHT,
              maxZoom: GEOCODE_MAX_ZOOM,
            });
          }
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
  }, [map, query, suburb, postcode, schools, setGeocodedQuery]);
}
