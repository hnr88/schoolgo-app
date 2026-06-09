import { describe, expect, it, vi } from 'vitest';

// The estimator barrel also exports its page component, whose next-intl
// navigation import does not resolve under vitest's node ESM rules.
vi.mock('@/i18n/navigation', () => ({ Link: () => null }));

import {
  DEFAULT_RATE_PCT,
  DEFAULT_TUITION_BASIS,
  DEFAULT_YEARS,
  projectCost,
  selectAnnualBase,
} from '@/modules/parent-cost-estimator';
import { projectedCompareTotal } from '@/modules/school-comparison/lib/projected-compare-cost';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

function school(overrides: Partial<SchoolHit>): SchoolHit {
  return {
    documentId: 'doc',
    name: 'School',
    slug: 'school',
    state: 'VIC',
    suburb: 'Melbourne',
    postcode: '3000',
    schoolType: 'independent',
    sector: 'independent',
    gender: 'coed',
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

describe('projectedCompareTotal', () => {
  it('matches the estimator projection under its default semantics', () => {
    const hit = school({ lowestAnnualTuition: 25000, highestAnnualTuition: 40000 });
    const base = selectAnnualBase(hit, DEFAULT_TUITION_BASIS);
    expect(base).not.toBeNull();
    expect(projectedCompareTotal(hit)).toBe(
      projectCost(base as number, DEFAULT_YEARS, DEFAULT_RATE_PCT).total,
    );
  });

  it('returns null (not zero) when the school publishes no tuition', () => {
    expect(projectedCompareTotal(school({ lowestAnnualTuition: null }))).toBeNull();
    expect(projectedCompareTotal(school({ lowestAnnualTuition: 0 }))).toBeNull();
  });
});
