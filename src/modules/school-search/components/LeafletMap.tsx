'use client';

import { memo, useMemo } from 'react';
import L from 'leaflet';
import { ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { formatAudCompact } from '@/modules/school-search/lib/format-currency';
import type { Portal } from '@/lib/portal-url';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const SCHOOL_MAP_ICON = new L.DivIcon({
  className: 'school-map-marker',
  html: `<div class="school-map-marker__pin" aria-hidden="true">
    <div class="school-map-marker__inner">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="17" height="17">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    </div>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

function createClusterIcon(cluster: { getChildCount: () => number }) {
  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 50 ? 42 : 48;

  return new L.DivIcon({
    className: 'school-map-cluster',
    html: `<div class="school-map-cluster__circle" style="width:${size}px;height:${size}px">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const AUSTRALIA_BOUNDS = L.latLngBounds([-46, 110], [-8, 160]);

const SchoolMarker = memo(function SchoolMarker({
  school,
  activePortal,
}: {
  school: SchoolHit;
  activePortal: Portal;
}) {
  const position = useMemo<[number, number]>(
    () => [school._geo!.lat, school._geo!.lng],
    [school._geo!.lat, school._geo!.lng],
  );

  return (
    <Marker position={position} icon={SCHOOL_MAP_ICON}>
      <Popup
        className='schoolgo-map-popup schoolgo-map-popup--compact'
        closeButton={false}
        autoPan={false}
      >
        <a
          href={school.slug ? `/${activePortal}/schools/${school.slug}` : undefined}
          className='group flex min-w-44 max-w-52 flex-col no-underline transition-colors'
        >
          <div className='flex flex-col gap-1 p-3 pb-2'>
            <h3 className='line-clamp-2 text-body-sm font-semibold leading-snug text-ink-900'>
              {school.name}
            </h3>
            <p className='text-caption leading-none text-foggy'>
              {school.suburb}, {school.state}
            </p>
            {school.lowestAnnualTuition != null && (
              <span className='mt-0.5 inline-flex self-start rounded-pill bg-rausch-50 px-2 py-0.5 text-caption font-semibold leading-normal text-primary'>
                {formatAudCompact(school.lowestAnnualTuition)} /yr
              </span>
            )}
          </div>
          <div className='mx-3 border-t border-divider' />
          <div className='flex items-center justify-between px-3 py-2 transition-colors group-hover:bg-muted/60'>
            <span className='text-caption font-semibold text-primary transition-colors group-hover:text-rausch-600'>
              View school
            </span>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-rausch-50 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary'>
              <ArrowRight className='h-3 w-3' aria-hidden />
            </span>
          </div>
        </a>
      </Popup>
    </Marker>
  );
}, (prev, next) => prev.school.documentId === next.school.documentId && prev.activePortal === next.activePortal);

interface LeafletMapProps {
  schools: SchoolHit[];
  onMapReady: (map: L.Map) => void;
  activePortal: Portal;
}

export function LeafletMap({ schools, onMapReady, activePortal }: LeafletMapProps) {
  const geoSchools = useMemo(
    () => schools.filter((s) => s._geo != null),
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
        attributionControl={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={60}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          zoomToBoundsOnClick
          animate={false}
          animateAddingMarkers={false}
          disableClusteringAtZoom={15}
          removeOutsideVisibleBounds={false}
        >
          {geoSchools.map((school) => (
            <SchoolMarker
              key={school.documentId}
              school={school}
              activePortal={activePortal}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
