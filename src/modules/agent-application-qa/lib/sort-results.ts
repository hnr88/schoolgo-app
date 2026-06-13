import { VERDICT_RANK } from '@/modules/agent-application-qa/constants/readiness.constants';
import type { SchoolReadinessResult } from '@/modules/agent-application-qa/types/readiness.types';

// Surface the most severe verdicts first so the agent sees blockers up top,
// then fall back to school name for a stable order within a verdict band.
export function sortReadinessResults(
  results: readonly SchoolReadinessResult[],
): SchoolReadinessResult[] {
  return [...results].sort((a, b) => {
    const rankDelta = VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict];
    if (rankDelta !== 0) return rankDelta;
    return (a.schoolName ?? '').localeCompare(b.schoolName ?? '');
  });
}

export function countVerdict(
  results: readonly SchoolReadinessResult[],
  verdict: SchoolReadinessResult['verdict'],
): number {
  return results.reduce((total, result) => (result.verdict === verdict ? total + 1 : total), 0);
}
