'use client';

import { useCallback } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { SchoolMapMarker } from '@/modules/school-search/components/SchoolMapMarker';
import { createClusterIcon, getSchoolKey } from '@/modules/school-search/components/school-map-utils';
import type { Portal } from '@/lib/portal-url';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const CLUSTER_FOCUS_PADDING_TOP_LEFT: [number, number] = [50, 50];
const CLUSTER_FOCUS_PADDING_BOTTOM_RIGHT: [number, number] = [340, 50];
const CLUSTER_MAX_FOCUS_ZOOM = 15;

interface SchoolMapClusterLayerProps {
  geoSchools: SchoolHit[];
  activePortal: Portal;
}

function isMarkerCluster(layer: unknown): layer is {
  getBounds: () => L.LatLngBounds;
  spiderfy: () => void;
} {
  return (
    typeof layer === 'object' &&
    layer !== null &&
    'getBounds' in layer &&
    'spiderfy' in layer &&
    typeof (layer as { getBounds?: unknown }).getBounds === 'function' &&
    typeof (layer as { spiderfy?: unknown }).spiderfy === 'function'
  );
}

export function SchoolMapClusterLayer({
  geoSchools,
  activePortal,
}: SchoolMapClusterLayerProps) {
  const map = useMap();

  const handleClusterClick = useCallback((event: L.LeafletMouseEvent) => {
    const { layer } = event;
    if (!isMarkerCluster(layer)) return;

    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();

    if (map.getZoom() >= CLUSTER_MAX_FOCUS_ZOOM) {
      layer.spiderfy();
      return;
    }

    const bounds = layer.getBounds();
    if (!bounds.isValid()) return;

    map.flyToBounds(bounds, {
      paddingTopLeft: CLUSTER_FOCUS_PADDING_TOP_LEFT,
      paddingBottomRight: CLUSTER_FOCUS_PADDING_BOTTOM_RIGHT,
      maxZoom: CLUSTER_MAX_FOCUS_ZOOM,
    });
  }, [map]);

  return (
    <MarkerClusterGroup
      iconCreateFunction={createClusterIcon}
      maxClusterRadius={60}
      spiderfyOnMaxZoom
      showCoverageOnHover={false}
      zoomToBoundsOnClick={false}
      animate={false}
      animateAddingMarkers={false}
      disableClusteringAtZoom={CLUSTER_MAX_FOCUS_ZOOM}
      removeOutsideVisibleBounds={false}
      onClick={handleClusterClick}
    >
      {geoSchools.map((school) => (
        <SchoolMapMarker
          key={getSchoolKey(school)}
          school={school}
          activePortal={activePortal}
        />
      ))}
    </MarkerClusterGroup>
  );
}
