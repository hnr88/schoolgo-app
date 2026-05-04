'use client';

import { useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { School } from '@/modules/school-search/types/school.types';
import type { LeafletMapProps } from '@/modules/school-search/types/component.types';
import { SCHOOL_MAP_ICON } from '@/modules/school-search/constants/map.constants';

function FitBounds({ schools }: { schools: School[] }) {
  const map = useMap();

  useEffect(() => {
    if (schools.length === 0) return;
    const bounds = L.latLngBounds(
      schools.map((s) => [s.lat, s.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, schools]);

  return null;
}

function CustomZoom() {
  const map = useMap();

  return (
    <div className='absolute bottom-6 left-6 flex flex-col gap-2 z-[1000]'>
      <button
        type='button'
        aria-label='Zoom in'
        onClick={() => map.zoomIn()}
        className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary'
      >
        <Plus className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
      </button>
      <button
        type='button'
        aria-label='Zoom out'
        onClick={() => map.zoomOut()}
        className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary'
      >
        <Minus className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
      </button>
    </div>
  );
}

export function LeafletMap({ schools }: LeafletMapProps) {
  const currencyFormatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  });

  return (
    <div className='relative isolate w-full h-full rounded-lg overflow-hidden'>
      <style>{`
        .leaflet-tile-pane {
          filter: grayscale(0.9) contrast(0.85) brightness(1.05);
        }
      `}</style>
      <div className='absolute inset-0 bg-primary/5 z-10 pointer-events-none rounded-lg' />
      <MapContainer
        center={[-30, 148]}
        zoom={4}
        className='w-full h-full z-0'
        zoomControl={false}
        attributionControl={false}
      >
        <CustomZoom />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
      <FitBounds schools={schools} />
      {schools.map((school) => (
        <Marker
          key={school.id}
          position={[school.lat, school.lng]}
          icon={SCHOOL_MAP_ICON}
        >
          <Popup>
            <div className='text-on-surface'>
              <p className='text-sm font-bold'>{school.name}</p>
              <p className='text-xs text-on-surface-variant'>
                {school.suburb}, {school.state}
              </p>
              <p className='text-sm font-black text-primary mt-1'>
                {currencyFormatter.format(school.tuitionAud)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}
