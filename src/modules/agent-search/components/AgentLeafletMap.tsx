'use client';

import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AgentMapClusterLayer } from '@/modules/agent-search/components/AgentMapClusterLayer';
import type { Portal } from '@/lib/portal-url';
import type { AgentPartnerSchool } from '@/modules/agent-search/types/agent-search.types';

const AUSTRALIA_BOUNDS = L.latLngBounds([-46, 110], [-8, 160]);

interface AgentLeafletMapProps {
  schools: AgentPartnerSchool[];
  onMapReady: (map: L.Map) => void;
  activePortal: Portal;
}

export function AgentLeafletMap({ schools, onMapReady, activePortal }: AgentLeafletMapProps) {
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
        <AgentMapClusterLayer schools={schools} activePortal={activePortal} />
      </MapContainer>
    </div>
  );
}
