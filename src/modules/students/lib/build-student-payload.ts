import type { StudentFormValues } from '@/modules/students/schemas/student.schema';

const OPTIONAL_STRING_FIELDS = [
  'dateOfBirth',
  'nationality',
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

export function buildStudentPayload(values: StudentFormValues): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
  };

  if (values.gender) payload.gender = values.gender;

  for (const key of OPTIONAL_STRING_FIELDS) {
    const next = values[key]?.trim();
    if (next) payload[key] = next;
  }

  return payload;
}
