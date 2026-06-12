'use client';

import { useCallback } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PartnerSchoolMapMarker } from '@/modules/agent-search/components/PartnerSchoolMapMarker';
import { createAgentClusterIcon } from '@/modules/agent-search/lib/agent-map-utils';
import type { Portal } from '@/lib/portal-url';
import type { AgentPartnerSchool } from '@/modules/agent-search/types/agent-search.types';

const CLUSTER_FOCUS_PADDING_TOP_LEFT: [number, number] = [50, 50];
const CLUSTER_FOCUS_PADDING_BOTTOM_RIGHT: [number, number] = [340, 50];
const CLUSTER_MAX_FOCUS_ZOOM = 15;

interface AgentMapClusterLayerProps {
  schools: AgentPartnerSchool[];
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

export function AgentMapClusterLayer({ schools, activePortal }: AgentMapClusterLayerProps) {
  const map = useMap();

  const handleClusterClick = useCallback(
    (event: L.LeafletMouseEvent) => {
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
    },
    [map],
  );

  return (
    <MarkerClusterGroup
      iconCreateFunction={createAgentClusterIcon}
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
      {schools.map((school) => (
        <PartnerSchoolMapMarker
          key={school.documentId}
          school={school}
          activePortal={activePortal}
        />
      ))}
    </MarkerClusterGroup>
  );
}
