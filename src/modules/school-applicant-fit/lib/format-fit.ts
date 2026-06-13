import type {
  ApplicantFitRow,
  FitBand,
  FitContribution,
  FitWeights,
  FitThresholds,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';
import type { FitConfigFormValues } from '@/modules/school-applicant-fit/schemas/fit-config-form.schema';

/** Render a 0..1 fit score as a whole-number percentage (e.g. 0.7692 -> "77%"). */
export function formatScore(score: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(score);
}

/** Render a 0..1 fraction as a one-decimal percentage for threshold labels. */
export function formatFraction(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Share of the total weighted score a single criterion contributed, 0..1. */
export function contributionShare(
  contribution: FitContribution,
  contributions: readonly FitContribution[],
): number {
  const max = contributions.reduce((sum, c) => sum + c.weight, 0);
  return max > 0 ? contribution.weightedScore / max : 0;
}

/** Flatten a config's weights + thresholds into flat RHF form defaults. */
export function configToFormValues(
  weights: FitWeights,
  thresholds: FitThresholds,
): FitConfigFormValues {
  return { ...weights, ...thresholds };
}

/** Re-nest flat RHF form values into the weights/thresholds the PUT expects. */
export function formValuesToConfig(values: FitConfigFormValues): {
  weights: FitWeights;
  thresholds: FitThresholds;
} {
  const { reach, match, safety, ...weights } = values;
  return { weights, thresholds: { reach, match, safety } };
}

/** Count rows per band for the page's at-a-glance band summary tiles. */
export function countByBand(rows: readonly ApplicantFitRow[]): Record<FitBand, number> {
  return rows.reduce<Record<FitBand, number>>(
    (acc, row) => {
      acc[row.band] += 1;
      return acc;
    },
    { safety: 0, match: 0, reach: 0 },
  );
}
