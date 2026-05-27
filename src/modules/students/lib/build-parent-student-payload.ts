import type { ParentStudentFormValues } from '@/modules/students/schemas/parent-student.schema';
import type { ParentStudentCreatePayload } from '@/modules/students/types/parent-wizard.types';

function trimmed(value: string | undefined): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

export function buildParentStudentPayload(
  values: ParentStudentFormValues,
): ParentStudentCreatePayload {
  const payload: ParentStudentCreatePayload = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    nationality: values.nationality.trim(),
    targetEntryYear: values.targetEntryYear.trim(),
    targetEntryTerm: values.targetEntryTerm.trim(),
    parentGuardianName: values.parentGuardianName.trim(),
    parentGuardianPhone: values.parentGuardianPhone.trim(),
    preferredContactChannel: values.preferredContactChannel,
  };

  const email = trimmed(values.email);
  if (email) payload.email = email;

  const dateOfBirth = trimmed(values.dateOfBirth);
  if (dateOfBirth) payload.dateOfBirth = dateOfBirth;

  if (values.gender) payload.gender = values.gender;

  const currentSchool = trimmed(values.currentSchool);
  if (currentSchool) payload.currentSchool = currentSchool;

  const currentYearLevel = trimmed(values.currentYearLevel);
  if (currentYearLevel) payload.currentYearLevel = currentYearLevel;

  const parentGuardianEmail = trimmed(values.parentGuardianEmail);
  if (parentGuardianEmail) payload.parentGuardianEmail = parentGuardianEmail;

  const parentGuardianWechat = trimmed(values.parentGuardianWechat);
  if (parentGuardianWechat) payload.parentGuardianWechat = parentGuardianWechat;

  if (typeof values.photo === 'number') payload.photo = values.photo;
  if (typeof values.voiceIntro === 'number') payload.voiceIntro = values.voiceIntro;

  return payload;
}
