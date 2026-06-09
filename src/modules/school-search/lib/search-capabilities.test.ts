import { describe, expect, it } from 'vitest';
import {
  ADVANCED_FILTER_FIELDS,
  ADVANCED_SORT_VALUES,
  BASIC_FALLBACK_SORT,
  canUseAdvancedSearch,
  isAdvancedCapability,
  isAdvancedSort,
  stripAdvancedFields,
} from '@/modules/school-search/lib/search-capabilities';
import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';

const gatedRequest: TypedSearchRequest = {
  q: 'grammar',
  states: ['NSW'],
  entryTerms: ['term1', 'term3'],
  programTypes: ['ib'],
  englishTest: { type: 'ielts', score: 6.5 },
  sortBy: 'international-pct-desc',
  page: 1,
  pageSize: 24,
};

describe('canUseAdvancedSearch', () => {
  it('mirrors the authentication state', () => {
    expect(canUseAdvancedSearch(true)).toBe(true);
    expect(canUseAdvancedSearch(false)).toBe(false);
  });
});

describe('isAdvancedCapability', () => {
  it('flags every gated filter field', () => {
    for (const field of ADVANCED_FILTER_FIELDS) {
      expect(isAdvancedCapability(field)).toBe(true);
    }
  });

  it('flags every advanced sort and accepts basic sorts', () => {
    for (const sort of ADVANCED_SORT_VALUES) {
      expect(isAdvancedCapability(sort)).toBe(true);
    }
    expect(isAdvancedCapability('name-asc')).toBe(false);
    expect(isAdvancedCapability('tuition-asc')).toBe(false);
    expect(isAdvancedCapability('tuition-desc')).toBe(false);
    expect(isAdvancedCapability('state')).toBe(false);
  });
});

describe('isAdvancedSort', () => {
  it('detects advanced sorts only', () => {
    expect(isAdvancedSort('enrolment-status')).toBe(true);
    expect(isAdvancedSort('name-asc')).toBe(false);
    expect(isAdvancedSort(undefined)).toBe(false);
  });
});

describe('stripAdvancedFields', () => {
  it('removes every gated field and downgrades an advanced sort for guests', () => {
    const result = stripAdvancedFields(gatedRequest, false);

    expect(result.entryTerms).toBeUndefined();
    expect(result.programTypes).toBeUndefined();
    expect(result.englishTest).toBeUndefined();
    expect(Object.keys(result)).not.toContain('entryTerms');
    expect(Object.keys(result)).not.toContain('programTypes');
    expect(Object.keys(result)).not.toContain('englishTest');
    expect(result.sortBy).toBe(BASIC_FALLBACK_SORT);
    expect(result).toMatchObject({ q: 'grammar', states: ['NSW'], page: 1, pageSize: 24 });
  });

  it('keeps a basic sort untouched for guests', () => {
    const result = stripAdvancedFields({ ...gatedRequest, sortBy: 'tuition-asc' }, false);
    expect(result.sortBy).toBe('tuition-asc');
  });

  it('passes the request through unchanged when authenticated', () => {
    const result = stripAdvancedFields(gatedRequest, true);
    expect(result).toBe(gatedRequest);
    expect(result.entryTerms).toEqual(['term1', 'term3']);
    expect(result.programTypes).toEqual(['ib']);
    expect(result.englishTest).toEqual({ type: 'ielts', score: 6.5 });
    expect(result.sortBy).toBe('international-pct-desc');
  });
});
