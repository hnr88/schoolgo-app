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

const gatedSnapshot = (): SchoolSearchStoreSnapshot =>
  snapshot({
    entryTerms: ['term1', 'term2'],
    programTypes: ['ib', 'elicos'],
    englishTest: { type: 'aeas', score: 60 },
    sortBy: 'application-deadline-asc',
  });

describe('mapStoreToTypedRequest', () => {
  it('keeps a free-text school query when no structured location is selected', () => {
    expect(
      mapStoreToTypedRequest(snapshot({ query: 'Sydney Grammar School' }), true),
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
      true,
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
      mapStoreToTypedRequest(snapshot({ scholarshipAvailable: true }), true)
        .scholarshipAvailable,
    ).toBe(true);
    expect(
      mapStoreToTypedRequest(snapshot({ scholarshipAvailable: false }), true)
        .scholarshipAvailable,
    ).toBeUndefined();
  });

  it('never includes a gated field or advanced sort in a guest-built request', () => {
    const request = mapStoreToTypedRequest(gatedSnapshot(), false);

    expect(Object.keys(request)).not.toContain('entryTerms');
    expect(Object.keys(request)).not.toContain('programTypes');
    expect(Object.keys(request)).not.toContain('englishTest');
    expect(request.sortBy).toBe('name-asc');
  });

  it('passes gated fields and advanced sorts through when authenticated', () => {
    const request = mapStoreToTypedRequest(gatedSnapshot(), true);

    expect(request.entryTerms).toEqual(['term1', 'term2']);
    expect(request.programTypes).toEqual(['ib', 'elicos']);
    expect(request.englishTest).toEqual({ type: 'aeas', score: 60 });
    expect(request.sortBy).toBe('application-deadline-asc');
  });

  it('keeps ungated filters intact for guests', () => {
    const request = mapStoreToTypedRequest(
      { ...gatedSnapshot(), states: ['VIC'], scholarshipAvailable: true },
      false,
    );

    expect(request.states).toEqual(['VIC']);
    expect(request.scholarshipAvailable).toBe(true);
    expect(request.page).toBe(1);
  });
});
