'use client';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapZoomControls } from '@/modules/school-search/components/MapZoomControls';
import { useMapFitBounds } from '@/modules/school-search/hooks/useMapFitBounds';
import { formatAudCompact } from '@/modules/school-search/lib/format-currency';
import type { LeafletMapProps } from '@/modules/school-search/types/component.types';
import type { School } from '@/modules/school-search/types/school.types';

const SCHOOL_MAP_ICON = new L.DivIcon({
  className: '',
  html: `<div style="width:32px;height:32px;background:#FF5A5F;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.2);border:3px solid white;">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

function FitBoundsController({ schools }: { schools: School[] }) {
  useMapFitBounds(schools);
  return null;
}

export function LeafletMap({ schools }: LeafletMapProps) {
  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-lg">
      <div className="pointer-events-none absolute inset-0 z-10 rounded-lg bg-primary/5" />
      <MapContainer
        center={[-30, 148]}
        zoom={4}
        className="z-0 h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <MapZoomControls />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitBoundsController schools={schools} />
        {schools.map((school) => (
          <Marker
            key={school.id}
            position={[school.lat, school.lng]}
            icon={SCHOOL_MAP_ICON}
          >
            <Popup>
              <div className="text-on-surface">
                <p className="text-sm font-bold">{school.name}</p>
                <p className="text-xs text-on-surface-variant">
                  {school.suburb}, {school.state}
                </p>
                <p className="mt-1 text-sm font-black text-primary">
                  {formatAudCompact(school.tuitionAud)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
