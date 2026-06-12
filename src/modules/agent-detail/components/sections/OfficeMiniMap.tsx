'use client';

import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { OfficeLocation } from '@/modules/agent-detail/types/agent-detail.types';

const OFFICE_MAP_ICON = new L.DivIcon({
  className: 'agent-office-marker',
  html: `<div class="agent-office-marker__pin" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface GeoOffice {
  key: string;
  label: string;
  lat: number;
  lng: number;
}

interface OfficeMiniMapProps {
  offices: OfficeLocation[];
}

export function OfficeMiniMap({ offices }: OfficeMiniMapProps) {
  const geoOffices = useMemo<GeoOffice[]>(
    () =>
      offices
        .filter((o) => typeof o.latitude === 'number' && typeof o.longitude === 'number')
        .map((o, i) => ({
          key: `${o.label ?? o.city ?? 'office'}-${i}`,
          label: o.label || o.city || o.country || '',
          lat: o.latitude as number,
          lng: o.longitude as number,
        })),
    [offices],
  );

  const bounds = useMemo(
    () =>
      geoOffices.length > 0
        ? L.latLngBounds(geoOffices.map((o) => [o.lat, o.lng] as [number, number]))
        : null,
    [geoOffices],
  );

  if (geoOffices.length === 0 || !bounds) return null;

  return (
    <div className="relative isolate mt-6 h-64 w-full overflow-hidden rounded-lg border border-divider">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [40, 40], maxZoom: 13 }}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {geoOffices.map((office) => (
          <Marker key={office.key} position={[office.lat, office.lng]} icon={OFFICE_MAP_ICON}>
            {office.label ? (
              <Tooltip direction="top" offset={[0, -12]}>
                {office.label}
              </Tooltip>
            ) : null}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
