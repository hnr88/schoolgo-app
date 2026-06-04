import type { StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { Student } from '@/modules/students/types/student.types';

const FORM_GENDERS: ReadonlyArray<NonNullable<StudentFormValues['gender']>> = ['male', 'female', 'other', 'prefer_not_to_say'];

function asFormGender(gender: Student['gender']): StudentFormValues['gender'] {
  if (gender && (FORM_GENDERS as readonly string[]).includes(gender)) {
    return gender as NonNullable<StudentFormValues['gender']>;
  }
  return undefined;
}

export function studentToFormValues(student: Student): Partial<StudentFormValues> {
  return {
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth ?? '',
    gender: asFormGender(student.gender),
    nationality: student.nationality ?? '',
    passportNumber: student.passportNumber ?? '',
    currentSchool: student.currentSchool ?? '',
    currentYearLevel: student.currentYearLevel ?? '',
    targetEntryYear: student.targetEntryYear ?? '',
    targetEntryTerm: student.targetEntryTerm ?? '',
    parentGuardianName: student.parentGuardianName ?? '',
    parentGuardianEmail: student.parentGuardianEmail ?? '',
    parentGuardianPhone: student.parentGuardianPhone ?? '',
    parentGuardianWechat: student.parentGuardianWechat ?? '',
    agentNotes: student.agentNotes ?? '',
  };
}
