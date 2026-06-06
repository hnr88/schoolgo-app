import { projectCost } from '@/modules/parent-cost-estimator/lib/project-cost';
import type {
  CostEstimatorRow,
  CostEstimatorSummary,
  SchoolHit,
  TuitionBasis,
} from '@/modules/parent-cost-estimator/types/cost-estimator.types';

// Pick the annual tuition for the chosen basis, treating 0/negative/missing as
// "no published fee" so it is excluded from the projection rather than counted
// as free.
export function selectAnnualBase(school: SchoolHit, basis: TuitionBasis): number | null {
  const value = basis === 'lowest' ? school.lowestAnnualTuition : school.highestAnnualTuition;
  return typeof value === 'number' && value > 0 ? value : null;
}

function locationOf(school: SchoolHit): string {
  return [school.suburb, school.state].filter(Boolean).join(', ');
}

// Build one row per saved school, projecting its total. Priced schools sort
// cheapest-first; unpriced schools ("fee on request") sort last. The cheapest
// priced total is flagged so the UI can highlight it.
export function buildEstimatorRows(
  schools: SchoolHit[],
  basis: TuitionBasis,
  years: number,
  ratePct: number,
): CostEstimatorRow[] {
  const rows: CostEstimatorRow[] = schools.map((school) => {
    const annualBase = selectAnnualBase(school, basis);
    return {
      documentId: school.documentId,
      name: school.name,
      slug: school.slug,
      location: locationOf(school),
      logoUrl: school.logoUrl,
      scholarshipAvailable: school.scholarshipAvailable,
      boardingAvailable: school.boardingAvailable,
      annualBase,
      projection: annualBase === null ? null : projectCost(annualBase, years, ratePct),
      isCheapest: false,
    };
  });

  rows.sort((a, b) => {
    if (a.projection && b.projection) return a.projection.total - b.projection.total;
    if (a.projection) return -1;
    if (b.projection) return 1;
    return a.name.localeCompare(b.name);
  });

  const cheapest = rows.find((row) => row.projection !== null);
  if (cheapest) cheapest.isCheapest = true;

  return rows;
}

export function summarizeRows(rows: CostEstimatorRow[]): CostEstimatorSummary {
  const totals = rows
    .map((row) => row.projection?.total)
    .filter((total): total is number => typeof total === 'number');

  const pricedCount = totals.length;
  const sum = totals.reduce((acc, value) => acc + value, 0);

  return {
    pricedCount,
    unpricedCount: rows.length - pricedCount,
    cheapestTotal: pricedCount > 0 ? Math.min(...totals) : null,
    dearestTotal: pricedCount > 0 ? Math.max(...totals) : null,
    averageTotal: pricedCount > 0 ? Math.round(sum / pricedCount) : null,
  };
}
