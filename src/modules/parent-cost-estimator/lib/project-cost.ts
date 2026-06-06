import type { CostProjection } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

// Project tuition across `years` of enrolment, growing each year by `ratePct`
// (compounded). Year 1 is charged at the current `annualBase`; every later year
// is indexed by (1 + rate)^(yearIndex). Amounts are rounded to whole dollars.
export function projectCost(annualBase: number, years: number, ratePct: number): CostProjection {
  const safeYears = Math.max(0, Math.floor(years));
  const rate = ratePct / 100;
  const perYear: number[] = [];
  let total = 0;

  for (let index = 0; index < safeYears; index += 1) {
    const yearCost = Math.round(annualBase * (1 + rate) ** index);
    perYear.push(yearCost);
    total += yearCost;
  }

  return { perYear, total };
}
