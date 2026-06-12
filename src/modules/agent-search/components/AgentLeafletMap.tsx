'use client';

import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AgentMapClusterLayer } from '@/modules/agent-search/components/AgentMapClusterLayer';
import { getAgentCoords } from '@/modules/agent-search/lib/agent-map-utils';
import type { Portal } from '@/lib/portal-url';
import type { AgentHit } from '@/modules/agent-search/types/agent-search.types';

const AUSTRALIA_BOUNDS = L.latLngBounds([-46, 110], [-8, 160]);

interface AgentLeafletMapProps {
  agents: AgentHit[];
  onMapReady: (map: L.Map) => void;
  activePortal: Portal;
}

export function AgentLeafletMap({ agents, onMapReady, activePortal }: AgentLeafletMapProps) {
  const geoAgents = useMemo(() => agents.filter((a) => getAgentCoords(a) != null), [agents]);

  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-lg">
      <MapContainer
        ref={(mapInstance) => {
          if (mapInstance) onMapReady(mapInstance);
        }}
        center={[-28, 133]}
        zoom={5}
        minZoom={5}
        maxBounds={AUSTRALIA_BOUNDS}
        maxBoundsViscosity={0.85}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <AgentMapClusterLayer geoAgents={geoAgents} activePortal={activePortal} />
      </MapContainer>
    </div>
  );
}
