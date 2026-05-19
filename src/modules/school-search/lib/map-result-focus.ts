import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export const SINGLE_SCHOOL_FOCUS_ZOOM = 14;
export const MULTI_SCHOOL_MAX_FIT_ZOOM = 12;

function schoolKey(school: SchoolHit): string {
  return school.id ?? school.documentId ?? `${school.slug ?? ''}-${school.name}`;
}

function schoolCoordinates(school: SchoolHit): { lat: number; lng: number } | null {
  if (school._geo && typeof school._geo.lat === 'number' && typeof school._geo.lng === 'number') {
    return { lat: school._geo.lat, lng: school._geo.lng };
  }
  if (typeof school.lat === 'number' && typeof school.lng === 'number') {
    return { lat: school.lat, lng: school.lng };
  }
  return null;
}

export function getMapResultFocusTarget(schools: SchoolHit[]) {
  const points = schools.flatMap((school) => {
    const coords = schoolCoordinates(school);
    return coords ? [{ ...coords, key: schoolKey(school) }] : [];
  });

  if (points.length === 0) return null;

  if (points.length === 1) {
    const [point] = points;
    return {
      type: 'school' as const,
      key: point.key,
      center: [point.lat, point.lng] as [number, number],
      zoom: SINGLE_SCHOOL_FOCUS_ZOOM,
    };
  }

  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);

  return {
    type: 'bounds' as const,
    key: points.map((point) => point.key).join('|'),
    bounds: [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ] as [[number, number], [number, number]],
    maxZoom: MULTI_SCHOOL_MAX_FIT_ZOOM,
  };
}
