import type { ParentStudent } from '@/modules/students';
import type { ParentCompletenessItem } from '@/modules/dashboard/parent/types/parent-dashboard.types';

/**
 * Per-child profile completeness derived from fields present on the students
 * list response. Mirrors the students-module completeness checks (photo, voice
 * intro, target term, date of birth) without depending on the detail endpoint.
 */
export function deriveCompleteness(students: ParentStudent[]): ParentCompletenessItem[] {
  return students.map((student) => {
    const checks = [
      Boolean(student.photo?.url),
      Boolean(student.voiceIntro?.url),
      Boolean(student.targetEntryTerm),
      Boolean(student.dateOfBirth),
    ];
    const total = checks.length;
    const completed = checks.filter(Boolean).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      documentId: student.documentId,
      name: `${student.firstName} ${student.lastName}`,
      photoUrl: student.photo?.url,
      percent,
      completed,
      total,
      isComplete: completed === total,
    };
  });
}
