export type SchoolApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'received'
  | 'under_review'
  | 'documents_requested'
  | 'assessment_required'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'offer_made'
  | 'offer_accepted'
  | 'pre_enrolment'
  | 'coe_issued'
  | 'enrolled'
  | 'waitlisted'
  | 'declined';

export interface SchoolApplicationListItem {
  documentId: string;
  reference: string;
  studentName: string;
  agentName: string | null;
  programme: string | null;
  status: SchoolApplicationStatus;
  submittedAt: string | null;
  updatedAt: string;
}

export interface SchoolApplicationListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: SchoolApplicationStatus;
}

export interface SchoolBulkStatusPayload {
  documentIds: string[];
  status: SchoolApplicationStatus;
}
