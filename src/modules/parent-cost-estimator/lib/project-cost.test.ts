import { describe, expect, it } from 'vitest';
import { projectCost } from '@/modules/parent-cost-estimator/lib/project-cost';
import {
  buildEstimatorRows,
  selectAnnualBase,
  summarizeRows,
} from '@/modules/parent-cost-estimator/lib/build-estimator-rows';
import type { SchoolHit } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

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

describe('projectCost', () => {
  it('charges year one at the base and compounds later years', () => {
    expect(projectCost(10000, 3, 10)).toEqual({
      perYear: [10000, 11000, 12100],
      total: 33100,
    });
  });

  it('returns zero for zero years', () => {
    expect(projectCost(10000, 0, 5)).toEqual({ perYear: [], total: 0 });
  });

  it('does not grow when the rate is zero', () => {
    expect(projectCost(20000, 4, 0)).toEqual({
      perYear: [20000, 20000, 20000, 20000],
      total: 80000,
    });
  });
});

describe('selectAnnualBase', () => {
  it('reads the basis-specific field', () => {
    const s = school({ lowestAnnualTuition: 15000, highestAnnualTuition: 42000 });
    expect(selectAnnualBase(s, 'lowest')).toBe(15000);
    expect(selectAnnualBase(s, 'highest')).toBe(42000);
  });

  it('treats missing or non-positive fees as unpriced', () => {
    expect(selectAnnualBase(school({ lowestAnnualTuition: null }), 'lowest')).toBeNull();
    expect(selectAnnualBase(school({ lowestAnnualTuition: 0 }), 'lowest')).toBeNull();
  });
});

describe('buildEstimatorRows', () => {
  const schools = [
    school({ documentId: 'a', name: 'Alpha', lowestAnnualTuition: 30000 }),
    school({ documentId: 'b', name: 'Bravo', lowestAnnualTuition: 10000 }),
    school({ documentId: 'c', name: 'Charlie', lowestAnnualTuition: null }),
  ];

  it('sorts priced schools cheapest-first and unpriced last', () => {
    const rows = buildEstimatorRows(schools, 'lowest', 2, 0);
    expect(rows.map((r) => r.documentId)).toEqual(['b', 'a', 'c']);
  });

  it('flags only the cheapest priced school', () => {
    const rows = buildEstimatorRows(schools, 'lowest', 2, 0);
    expect(rows.filter((r) => r.isCheapest).map((r) => r.documentId)).toEqual(['b']);
  });

  it('leaves unpriced schools without a projection', () => {
    const rows = buildEstimatorRows(schools, 'lowest', 2, 0);
    expect(rows.find((r) => r.documentId === 'c')?.projection).toBeNull();
  });
});

describe('summarizeRows', () => {
  it('aggregates only the priced rows', () => {
    const rows = buildEstimatorRows(
      [
        school({ documentId: 'a', name: 'Alpha', lowestAnnualTuition: 30000 }),
        school({ documentId: 'b', name: 'Bravo', lowestAnnualTuition: 10000 }),
        school({ documentId: 'c', name: 'Charlie', lowestAnnualTuition: null }),
      ],
      'lowest',
      2,
      0,
    );
    expect(summarizeRows(rows)).toEqual({
      pricedCount: 2,
      unpricedCount: 1,
      cheapestTotal: 20000,
      dearestTotal: 60000,
      averageTotal: 40000,
    });
  });

  it('returns null aggregates when nothing is priced', () => {
    const rows = buildEstimatorRows([school({ lowestAnnualTuition: null })], 'lowest', 3, 5);
    expect(summarizeRows(rows)).toEqual({
      pricedCount: 0,
      unpricedCount: 1,
      cheapestTotal: null,
      dearestTotal: null,
      averageTotal: null,
    });
  });
});
