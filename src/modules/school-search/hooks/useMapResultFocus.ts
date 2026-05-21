'use client';

import { useEffect, useRef } from 'react';
import L, { type LatLng, type Map } from 'leaflet';
import {
  getMapResultFocusTarget,
} from '@/modules/school-search/lib/map-result-focus';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const RESULT_FOCUS_PADDING_TOP_LEFT: [number, number] = [50, 50];
const RESULT_FOCUS_PADDING_BOTTOM_RIGHT: [number, number] = [340, 50];
const CAMERA_DISTANCE_TOLERANCE_METERS = 75;
const CAMERA_ZOOM_TOLERANCE = 0.25;

function isAlreadyFocused(map: Map, center: LatLng, zoom: number): boolean {
  const currentCenter = map.getCenter();
  return (
    Math.abs(map.getZoom() - zoom) <= CAMERA_ZOOM_TOLERANCE &&
    currentCenter.distanceTo(center) <= CAMERA_DISTANCE_TOLERANCE_METERS
  );
}

function getBoundsCamera(map: Map, boundsInput: [[number, number], [number, number]], maxZoom: number) {
  const bounds = L.latLngBounds(boundsInput);
  const paddingTopLeft = L.point(RESULT_FOCUS_PADDING_TOP_LEFT);
  const paddingBottomRight = L.point(RESULT_FOCUS_PADDING_BOTTOM_RIGHT);
  const padding = paddingTopLeft.add(paddingBottomRight);
  const zoom = Math.min(map.getBoundsZoom(bounds, false, padding), maxZoom);
  const paddingOffset = paddingBottomRight.subtract(paddingTopLeft).divideBy(2);
  const southWestPoint = map.project(bounds.getSouthWest(), zoom);
  const northEastPoint = map.project(bounds.getNorthEast(), zoom);
  const center = map.unproject(
    southWestPoint.add(northEastPoint).divideBy(2).add(paddingOffset),
    zoom,
  );

  return { bounds, center, zoom };
}

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

    const focusKey = `${target.type}:${target.key}`;
    if (focusedKeyRef.current === focusKey) return;

    focusedKeyRef.current = focusKey;

    const currentBounds = map.getBounds();

    if (target.type === 'school') {
      const center = L.latLng(target.center);
      if (currentBounds.contains(center)) return;
      const zoom = Math.max(map.getZoom(), target.zoom);
      if (isAlreadyFocused(map, center, zoom)) return;
      map.flyTo(center, zoom, { animate: true });
      return;
    }

    const targetBounds = L.latLngBounds(target.bounds);
    if (currentBounds.contains(targetBounds)) return;

    const camera = getBoundsCamera(map, target.bounds, target.maxZoom);
    if (isAlreadyFocused(map, camera.center, camera.zoom)) return;

    map.flyToBounds(camera.bounds, {
      paddingTopLeft: RESULT_FOCUS_PADDING_TOP_LEFT,
      paddingBottomRight: RESULT_FOCUS_PADDING_BOTTOM_RIGHT,
      maxZoom: target.maxZoom,
    });
  }, [map, schools, requestKey, isWaitingForResults]);
}
