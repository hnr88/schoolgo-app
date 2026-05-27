import type { StrapiListResponse, StrapiSingleResponse } from '@/modules/students/types/student.types';

export interface ParentStudentPhoto {
  url: string;
}

export interface ParentStudentVoiceIntro {
  url: string;
  mime: string;
}

export interface EnglishTestSummary {
  testType: string;
  overallScore: string | null;
  verificationStatus: string;
}

export interface ParentStudent {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  nationality: string | null;
  currentSchool: string | null;
  currentYearLevel: string | null;
  targetEntryYear: string | null;
  targetEntryTerm: string | null;
  parentGuardianName: string | null;
  parentGuardianEmail: string | null;
  parentGuardianPhone: string | null;
  parentGuardianWechat: string | null;
  preferredContactChannel: string | null;
  status: 'active' | 'archived' | 'enrolled';
  photo: ParentStudentPhoto | null;
  voiceIntro: ParentStudentVoiceIntro | null;
  activeApplicationCount: number;
  englishTestSummary: EnglishTestSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParentStudentDetail extends ParentStudent {
  documentsCount: number;
}

export type ParentStudentsResponse = StrapiListResponse<ParentStudent>;
export type ParentStudentDetailResponse = StrapiSingleResponse<ParentStudentDetail>;

export interface UseParentStudentsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  status?: 'archived';
}
