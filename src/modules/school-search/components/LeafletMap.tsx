'use client';

import { useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { School } from '@/modules/school-search/types/school.types';

const schoolIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:32px;height:32px;background:#bb1b21;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.2);border:3px solid white;">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

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
        className='w-10 h-10 bg-surface-container-lowest rounded-xl shadow-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer'
      >
        <PlusIcon className='w-4 h-4' aria-hidden='true' />
      </button>
      <button
        type='button'
        aria-label='Zoom out'
        onClick={() => map.zoomOut()}
        className='w-10 h-10 bg-surface-container-lowest rounded-xl shadow-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer'
      >
        <MinusIcon className='w-4 h-4' aria-hidden='true' />
      </button>
    </div>
  );
}

interface LeafletMapProps {
  schools: School[];
}

export function LeafletMap({ schools }: LeafletMapProps) {
  const currencyFormatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  });

  return (
    <div className='relative w-full h-full rounded-3xl overflow-hidden'>
      <style>{`
        .leaflet-tile-pane {
          filter: grayscale(0.9) contrast(0.85) brightness(1.05);
        }
      `}</style>
      <div className='absolute inset-0 bg-primary/5 z-[400] pointer-events-none rounded-3xl' />
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
          icon={schoolIcon}
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
