export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'received'
  | 'under_review'
  | 'documents_requested'
  | 'assessment_required'
  | 'interview_scheduled'
  | 'offer_made'
  | 'offer_accepted'
  | 'pre_enrolment'
  | 'coe_issued'
  | 'enrolled'
  | 'withdrawn'
  | 'declined'
  | 'waitlisted';

export interface Application {
  id: number;
  documentId: string;
  student: {
    documentId: string;
    firstName: string;
    lastName: string;
    nationality?: string;
  };
  school: {
    documentId: string;
    name: string;
    state?: string;
    cricosCode?: string;
  };
  targetYearLevel?: string;
  targetIntake?: string;
  status: ApplicationStatus;
  statusChangedAt?: string;
  submittedAt?: string;
  daysInStatus: number;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiApplicationListResponse {
  data: Application[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
