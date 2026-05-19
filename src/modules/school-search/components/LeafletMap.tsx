'use client';

import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SchoolMapClusterLayer } from '@/modules/school-search/components/SchoolMapClusterLayer';
import { getSchoolCoords } from '@/modules/school-search/components/school-map-utils';
import type { Portal } from '@/lib/portal-url';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const AUSTRALIA_BOUNDS = L.latLngBounds([-46, 110], [-8, 160]);

interface LeafletMapProps {
  schools: SchoolHit[];
  onMapReady: (map: L.Map) => void;
  activePortal: Portal;
}

export function LeafletMap({ schools, onMapReady, activePortal }: LeafletMapProps) {
  const geoSchools = useMemo(
    () => schools.filter((s) => getSchoolCoords(s) != null),
    [schools],
  );

  return (
    <div className='relative isolate h-full w-full overflow-hidden rounded-lg'>
      <MapContainer
        ref={(mapInstance) => {
          if (mapInstance) onMapReady(mapInstance);
        }}
        center={[-28, 133]}
        zoom={5}
        minZoom={5}
        maxBounds={AUSTRALIA_BOUNDS}
        maxBoundsViscosity={0.85}
        className='h-full w-full'
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <SchoolMapClusterLayer geoSchools={geoSchools} activePortal={activePortal} />
      </MapContainer>
    </div>
  );
}
