'use client';

import { useEffect, useRef } from 'react';
import type { Map } from 'leaflet';
import {
  getMapResultFocusTarget,
} from '@/modules/school-search/lib/map-result-focus';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const RESULT_FOCUS_PADDING_TOP_LEFT: [number, number] = [50, 50];
const RESULT_FOCUS_PADDING_BOTTOM_RIGHT: [number, number] = [340, 50];

export function useMapResultFocus(
  map: Map | null,
  schools: SchoolHit[],
  requestKey: string,
  isWaitingForResults: boolean,
) {
  const previousRequestKeyRef = useRef(requestKey);
  const shouldFocusRef = useRef(false);
  const focusedKeyRef = useRef('');

  useEffect(() => {
    if (previousRequestKeyRef.current === requestKey) return;
    previousRequestKeyRef.current = requestKey;
    shouldFocusRef.current = true;
  }, [requestKey]);

  useEffect(() => {
    if (!map || isWaitingForResults || !shouldFocusRef.current) return;

    const target = getMapResultFocusTarget(schools);
    shouldFocusRef.current = false;

    if (!target) return;

    const focusKey = `${requestKey}:${target.type}:${target.key}`;
    if (focusedKeyRef.current === focusKey) return;

    focusedKeyRef.current = focusKey;

    if (target.type === 'school') {
      map.flyTo(target.center, Math.max(map.getZoom(), target.zoom), { animate: true });
      return;
    }

    map.flyToBounds(target.bounds, {
      paddingTopLeft: RESULT_FOCUS_PADDING_TOP_LEFT,
      paddingBottomRight: RESULT_FOCUS_PADDING_BOTTOM_RIGHT,
      maxZoom: target.maxZoom,
    });
  }, [map, schools, requestKey, isWaitingForResults]);
}
