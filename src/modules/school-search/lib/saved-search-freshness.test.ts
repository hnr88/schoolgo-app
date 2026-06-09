import { describe, expect, it } from 'vitest';
import {
  computeSavedSearchFreshness,
  toFreshnessRequest,
} from '@/modules/school-search/lib/saved-search-freshness';

describe('computeSavedSearchFreshness', () => {
  it('returns unknown with mark-seen offered when lastResultCount is null', () => {
    expect(computeSavedSearchFreshness(12, null)).toEqual({
      kind: 'unknown',
      currentTotal: 12,
      newCount: 0,
      canMarkSeen: true,
    });
  });

  it('returns unknown with mark-seen offered when lastResultCount is undefined', () => {
    expect(computeSavedSearchFreshness(0, undefined)).toEqual({
      kind: 'unknown',
      currentTotal: 0,
      newCount: 0,
      canMarkSeen: true,
    });
  });

  it('returns unknown when lastResultCount is not a finite number', () => {
    expect(computeSavedSearchFreshness(5, Number.NaN).kind).toBe('unknown');
  });

  it('returns new with the positive delta when current exceeds last', () => {
    expect(computeSavedSearchFreshness(15, 10)).toEqual({
      kind: 'new',
      currentTotal: 15,
      newCount: 5,
      canMarkSeen: true,
    });
  });

  it('returns unchanged with no mark-seen when totals are equal', () => {
    expect(computeSavedSearchFreshness(10, 10)).toEqual({
      kind: 'unchanged',
      currentTotal: 10,
      newCount: 0,
      canMarkSeen: false,
    });
  });

  it('returns fewer with mark-seen offered when current is below last', () => {
    expect(computeSavedSearchFreshness(3, 10)).toEqual({
      kind: 'fewer',
      currentTotal: 3,
      newCount: 0,
      canMarkSeen: true,
    });
  });

  it('handles zero current total against a positive baseline', () => {
    expect(computeSavedSearchFreshness(0, 4).kind).toBe('fewer');
  });
});

describe('toFreshnessRequest', () => {
  it('preserves the stored filter state and minimises the page size', () => {
    const filterState = { q: 'stem', states: ['VIC' as const], feeMax: 30000, pageSize: 20 };
    expect(toFreshnessRequest(filterState)).toEqual({
      q: 'stem',
      states: ['VIC'],
      feeMax: 30000,
      page: 1,
      pageSize: 1,
    });
  });

  it('does not mutate the input filter state', () => {
    const filterState = { q: 'arts' };
    toFreshnessRequest(filterState);
    expect(filterState).toEqual({ q: 'arts' });
  });
});
