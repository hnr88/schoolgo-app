export interface Student {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  nationality: string | null;
  passportNumber: string | null;
  currentSchool: string | null;
  currentYearLevel: string | null;
  targetEntryYear: string | null;
  targetEntryTerm: string | null;
  parentGuardianName: string | null;
  parentGuardianEmail: string | null;
  parentGuardianPhone: string | null;
  parentGuardianWechat: string | null;
  agentNotes: string | null;
  status: 'active' | 'archived' | 'enrolled';
  createdAt: string;
  updatedAt: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
