'use client';

import { useEffect, useRef } from 'react';
import type { Map, LatLngBoundsExpression } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { STATE_BOUNDS } from '@/modules/school-search/constants/school.constants';

const AUSTRALIA_BOUNDS: LatLngBoundsExpression = [[-46, 110], [-8, 160]];
const BOUNDS_PADDING_LAT = 4;
const BOUNDS_PADDING_WEST = 4;
const BOUNDS_PADDING_EAST = 8;

export function useStateFilterMapSync(map: Map | null) {
  const states = useSchoolSearchStore((s) => s.states);
  const prevLengthRef = useRef(states.length);

  useEffect(() => {
    if (!map) return;

    if (states.length === 0) {
      map.setMaxBounds(AUSTRALIA_BOUNDS);
      prevLengthRef.current = 0;
      return;
    }

    let south = 90;
    let north = -90;
    let west = 180;
    let east = -180;

    for (const state of states) {
      const [[s, w], [n, e]] = STATE_BOUNDS[state];
      if (s < south) south = s;
      if (n > north) north = n;
      if (w < west) west = w;
      if (e > east) east = e;
    }

    const constrainedBounds: LatLngBoundsExpression = [
      [south - BOUNDS_PADDING_LAT, west - BOUNDS_PADDING_WEST],
      [north + BOUNDS_PADDING_LAT, east + BOUNDS_PADDING_EAST],
    ];
    map.setMaxBounds(constrainedBounds);

    const prev = prevLengthRef.current;
    prevLengthRef.current = states.length;

    const isAdding = states.length > prev;
    const isReducingToOne = states.length === 1 && prev > 1;

    if (!isAdding && !isReducingToOne) return;

    const flyBounds: LatLngBoundsExpression = [[south, west], [north, east]];
    map.flyToBounds(flyBounds, {
      paddingTopLeft: [50, 50],
      paddingBottomRight: [340, 50],
      maxZoom: 10,
    });
  }, [map, states]);
}
