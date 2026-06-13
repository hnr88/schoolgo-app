import type { ScholarshipMatch } from '@/modules/parent-scholarships/types/scholarship.types';

/** Eligible matches first, then by scholarship name for a stable order. */
export function sortMatches(matches: ScholarshipMatch[]): ScholarshipMatch[] {
  return [...matches].sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    const nameA = a.scholarship?.name ?? '';
    const nameB = b.scholarship?.name ?? '';
    return nameA.localeCompare(nameB);
  });
}
