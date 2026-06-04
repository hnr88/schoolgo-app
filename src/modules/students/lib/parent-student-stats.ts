import type { ParentStudent } from '@/modules/students/types/parent-student.types';
import type { ParentStudentStats } from '@/modules/students/types/parent-component.types';

const VERIFIED_TEST_STATUSES = new Set(['issuer_verified', 'direct_delivered']);

export function getParentStudentStats(
  students: ParentStudent[],
  totalChildren: number,
): ParentStudentStats {
  let activeApplications = 0;
  let verifiedTests = 0;
  let pendingTests = 0;

  for (const student of students) {
    activeApplications += student.activeApplicationCount ?? 0;

    const summary = student.englishTestSummary;
    if (!summary) continue;

    if (VERIFIED_TEST_STATUSES.has(summary.verificationStatus)) {
      verifiedTests += 1;
    } else {
      pendingTests += 1;
    }
  }

  return {
    children: totalChildren,
    activeApplications,
    verifiedTests,
    pendingTests,
  };
}
