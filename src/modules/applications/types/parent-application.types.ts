import type { ApplicationStatus } from '@/modules/applications/types/application.types';

export interface ParentApplication {
  id: number;
  documentId: string;
  status: ApplicationStatus;
  targetYearLevel: string | null;
  targetIntake: string | null;
  offerAnnualFee: number | null;
  offerDeadline: string | null;
  submittedAt: string | null;
  statusChangedAt: string | null;
  daysInStatus: number;
  daysInStatusColor: string | null;
  student: {
    documentId: string;
    firstName: string;
    lastName: string;
  };
  school: {
    documentId: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ParentApplicationsResponse {
  data: ParentApplication[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ParentApplicationDetailResponse {
  data: ParentApplication;
}

export interface UseParentApplicationsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  student?: string;
  sort?: string;
}
