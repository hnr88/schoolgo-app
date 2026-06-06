import {
  CONTACT_CHANNEL_VALUES,
  type ParentStudentFormValues,
} from '@/modules/students/schemas/parent-student.schema';
import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

type ContactChannel = (typeof CONTACT_CHANNEL_VALUES)[number];

function toContactChannel(value: string | null): ContactChannel {
  return CONTACT_CHANNEL_VALUES.includes(value as ContactChannel)
    ? (value as ContactChannel)
    : 'whatsapp';
}

export function parentStudentToFormValues(
  student: ParentStudentDetail,
): ParentStudentFormValues {
  return {
    firstName: student.firstName ?? '',
    lastName: student.lastName ?? '',
    email: student.email ?? '',
    dateOfBirth: student.dateOfBirth ?? '',
    gender: student.gender ?? undefined,
    nationality: student.nationality ?? '',
    passportNumber: '',
    currentSchool: student.currentSchool ?? '',
    currentYearLevel: student.currentYearLevel ?? '',
    targetEntryYear: student.targetEntryYear ?? '',
    targetEntryTerm: student.targetEntryTerm ?? '',
    parentGuardianName: student.parentGuardianName ?? '',
    parentGuardianEmail: student.parentGuardianEmail ?? '',
    parentGuardianPhone: student.parentGuardianPhone ?? '',
    parentGuardianWechat: student.parentGuardianWechat ?? '',
    preferredContactChannel: toContactChannel(student.preferredContactChannel),
    photo: undefined,
    voiceIntro: undefined,
  };
}
