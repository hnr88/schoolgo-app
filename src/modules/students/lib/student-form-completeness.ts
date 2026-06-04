import type { StudentFormValues } from '@/modules/students/schemas/student.schema';

const COMPLETENESS_FIELDS = [
  'firstName',
  'lastName',
  'dateOfBirth',
  'gender',
  'nationality',
  'passportNumber',
  'currentSchool',
  'currentYearLevel',
  'targetEntryYear',
  'targetEntryTerm',
  'parentGuardianName',
  'parentGuardianEmail',
  'parentGuardianPhone',
  'parentGuardianWechat',
  'agentNotes',
] as const satisfies ReadonlyArray<keyof StudentFormValues>;

export const STUDENT_COMPLETENESS_TOTAL = COMPLETENESS_FIELDS.length;

export function getStudentCompletedCount(values: StudentFormValues): number {
  return COMPLETENESS_FIELDS.filter((key) => Boolean(values[key]?.trim())).length;
}

export function computeStudentCompleteness(values: StudentFormValues): number {
  return Math.round((getStudentCompletedCount(values) / STUDENT_COMPLETENESS_TOTAL) * 100);
}
