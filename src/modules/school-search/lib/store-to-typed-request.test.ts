import { describe, expect, it } from 'vitest';
import {
  mapStoreToTypedRequest,
  type SchoolSearchStoreSnapshot,
} from '@/modules/school-search/lib/store-to-typed-request';
import { FEE_MAX, FEE_MIN } from '@/modules/school-search/constants/filter-options.constants';

function snapshot(overrides: Partial<SchoolSearchStoreSnapshot>): SchoolSearchStoreSnapshot {
  return {
    query: '',
    suburb: '',
    postcode: '',
    states: [],
    sectors: [],
    accommodation: [],
    religiousAffiliations: [],
    entryYearLevels: [],
    studentAge: null,
    entryTerms: [],
    programTypes: [],
    atarAvailable: false,
    englishLanguageSupport: false,
    scholarshipAvailable: false,
    englishTest: null,
    feeMin: FEE_MIN,
    feeMax: FEE_MAX,
    sortBy: 'name-asc',
    ...overrides,
  };
}

describe('mapStoreToTypedRequest', () => {
  it('keeps a free-text school query when no structured location is selected', () => {
    expect(
      mapStoreToTypedRequest(snapshot({ query: 'Sydney Grammar School' })),
    ).toMatchObject({
      q: 'Sydney Grammar School',
      page: 1,
      pageSize: 24,
    });
  });

  it('suppresses the display query when it only mirrors the selected suburb', () => {
    const request = mapStoreToTypedRequest(
      snapshot({
        query: 'Darlinghurst',
        suburb: 'Darlinghurst',
        postcode: '2010',
      }),
    );

    expect(request.q).toBeUndefined();
    expect(request).toMatchObject({
      suburb: 'Darlinghurst',
      postcode: '2010',
      page: 1,
      pageSize: 24,
    });
  });

  it('sends scholarshipAvailable only when the toggle is on', () => {
    expect(
      mapStoreToTypedRequest(snapshot({ scholarshipAvailable: true })).scholarshipAvailable,
    ).toBe(true);
    expect(
      mapStoreToTypedRequest(snapshot({ scholarshipAvailable: false })).scholarshipAvailable,
    ).toBeUndefined();
  });
});
