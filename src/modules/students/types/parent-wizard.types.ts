import type { Control } from 'react-hook-form';
import type { ParentStudentFormValues } from '@/modules/students/schemas/parent-student.schema';
import type { UploadedMedia } from '@/modules/forms';

export interface ParentStudentCreatePayload {
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: string;
  gender?: ParentStudentFormValues['gender'];
  nationality: string;
  currentSchool?: string;
  currentYearLevel?: string;
  targetEntryYear: string;
  targetEntryTerm: string;
  parentGuardianName: string;
  parentGuardianEmail?: string;
  parentGuardianPhone: string;
  parentGuardianWechat?: string;
  preferredContactChannel: ParentStudentFormValues['preferredContactChannel'];
  photo?: number | null;
  voiceIntro?: number | null;
}

export interface ParentStepProps {
  control: Control<ParentStudentFormValues>;
}

export interface ParentStepMediaProps {
  control: Control<ParentStudentFormValues>;
  photo: UploadedMedia | null;
  voiceIntro: UploadedMedia | null;
  onPhotoChange: (media: UploadedMedia | null) => void;
  onVoiceIntroChange: (media: UploadedMedia | null) => void;
}

export interface ParentStepReviewProps {
  values: ParentStudentFormValues;
  photo: UploadedMedia | null;
  voiceIntro: UploadedMedia | null;
  onEdit: (stepIndex: number) => void;
}
