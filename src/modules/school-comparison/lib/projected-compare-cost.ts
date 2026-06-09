import {
  DEFAULT_RATE_PCT,
  DEFAULT_TUITION_BASIS,
  DEFAULT_YEARS,
  projectCost,
  selectAnnualBase,
} from '@/modules/parent-cost-estimator';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

// Projects the multi-year total tuition for a compared school using the exact
// estimator defaults (lowest published tuition, DEFAULT_YEARS span, indexed by
// DEFAULT_RATE_PCT per year). Schools without a published fee return null so
// the table shows an explicit "no data" state instead of zero.
export function projectedCompareTotal(school: SchoolHit): number | null {
  const annualBase = selectAnnualBase(school, DEFAULT_TUITION_BASIS);
  if (annualBase === null) return null;
  return projectCost(annualBase, DEFAULT_YEARS, DEFAULT_RATE_PCT).total;
}
