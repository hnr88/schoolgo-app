import { describe, expect, it } from 'vitest';
import {
  getMapResultFocusTarget,
  MULTI_SCHOOL_MAX_FIT_ZOOM,
  SINGLE_SCHOOL_FOCUS_ZOOM,
} from '@/modules/school-search/lib/map-result-focus';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

function school(overrides: Partial<SchoolHit>): SchoolHit {
  return {
    documentId: 'school-1',
    name: 'Test School',
    slug: 'test-school',
    state: 'NSW',
    suburb: 'Sydney',
    postcode: '2000',
    schoolType: 'secondary',
    sector: 'non_gov',
    gender: 'co_ed',
    logoUrl: null,
    lowestAnnualTuition: null,
    highestAnnualTuition: null,
    scholarshipAvailable: false,
    boardingAvailable: false,
    hasActiveApplicationTemplate: false,
    hasOpenCapacity: false,
    totalEnrolment: null,
    internationalStudentPercentage: null,
    religiousAffiliation: null,
    curriculumOffered: null,
    levelsOffered: null,
    yearLevelBands: [],
    capacityBands: [],
    _geo: null,
    ...overrides,
  };
}

describe('getMapResultFocusTarget', () => {
  it('returns null when no schools have coordinates', () => {
    expect(getMapResultFocusTarget([school({ documentId: 'missing-geo' })])).toBeNull();
  });

  it('returns a close school target for one geocoded result', () => {
    expect(
      getMapResultFocusTarget([
        school({
          documentId: 'sydney-grammar',
          _geo: { lat: -33.876, lng: 151.214 },
        }),
      ]),
    ).toEqual({
      type: 'school',
      key: 'sydney-grammar',
      center: [-33.876, 151.214],
      zoom: SINGLE_SCHOOL_FOCUS_ZOOM,
    });
  });

  it('returns bounds for multiple geocoded results', () => {
    expect(
      getMapResultFocusTarget([
        school({
          documentId: 'north',
          _geo: { lat: -27.46, lng: 153.02 },
        }),
        school({
          documentId: 'south',
          _geo: { lat: -37.82, lng: 145.03 },
        }),
      ]),
    ).toEqual({
      type: 'bounds',
      key: 'north|south',
      bounds: [[-37.82, 145.03], [-27.46, 153.02]],
      maxZoom: MULTI_SCHOOL_MAX_FIT_ZOOM,
    });
  });
});
