import type { SchoolHit } from '@/modules/school-search';
import type {
  FitCheckResult,
  FitCheckTone,
  FitReportCheckItem,
  FitReportQueryState,
  FitReportRow,
} from '@/modules/parent-fit-report/types/fit-report.types';

export function getAgeTone(result: FitCheckResult): FitCheckTone {
  if (!result.ageCap.ok) return 'fail';
  return result.ageCap.reason === 'age_year_mismatch' ? 'warn' : 'pass';
}

export function getCricosTone(result: FitCheckResult): FitCheckTone {
  return result.cricos.ok ? 'pass' : 'fail';
}

function buildChecks(result: FitCheckResult): FitReportCheckItem[] {
  return [
    { key: 'age', tone: getAgeTone(result) },
    { key: 'cricos', tone: getCricosTone(result) },
  ];
}

export function buildFitReportRows(
  schools: SchoolHit[],
  states: FitReportQueryState[],
): FitReportRow[] {
  return schools.map((school, index) => {
    const state = states[index];
    if (state?.isError) {
      return { school, status: 'error', result: null, checks: [] };
    }
    if (!state?.data) {
      return { school, status: 'pending', result: null, checks: [] };
    }
    return {
      school,
      status: 'success',
      result: state.data,
      checks: buildChecks(state.data),
    };
  });
}
