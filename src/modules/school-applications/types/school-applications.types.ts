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

export type DaysInStatusColor = 'grey' | 'amber' | 'red';

export interface SchoolApplicationListItemAgent {
  documentId: string;
  companyName: string | null;
  name: string | null;
  qeacNumber: string | null;
}

export interface SchoolApplicationListItemStudent {
  documentId: string;
  name: string;
  nationality: string | null;
}

export interface SchoolApplicationListItem {
  documentId: string;
  status: SchoolApplicationStatus;
  targetYearLevel: string | null;
  targetIntake: string | null;
  boardingRequired: boolean;
  submittedAt: string | null;
  daysInStatus: number;
  offerDeadline: string | null;
  student: SchoolApplicationListItemStudent | null;
  agent: SchoolApplicationListItemAgent | null;
}

export interface SchoolApplicationListResponse {
  data: SchoolApplicationListItem[];
}

export interface SchoolApplicationListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  intake?: string;
  sort?: string;
}

export interface StatusProgressMilestone {
  milestone: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface SchoolApplicationDocumentRequest {
  documentId: string;
  documentTypes: string[];
  note: string | null;
  status: string;
}

export interface SchoolStudentDocument {
  documentId: string;
  documentType: string;
  fileName: string | null;
  status: string;
  expiresAt: string | null;
}

export interface SchoolApplicationDetail {
  documentId: string;
  status: SchoolApplicationStatus;
  statusChangedAt: string | null;
  targetYearLevel: string | null;
  targetIntake: string | null;
  boardingRequired: boolean;
  courseType: string | null;
  submissionData: Record<string, unknown> | null;
  submittedAt: string | null;
  receivedAt: string | null;
  offerMadeAt: string | null;
  offerDeadline: string | null;
  offerConditions: string | null;
  offerAnnualFee: number | null;
  declineReason: string | null;
  declineNote: string | null;
  interviewScheduledAt: string | null;
  interviewMethod: string | null;
  interviewOutcome: string | null;
  examOutcome: string | null;
  examScore: string | null;
  examNotes: string | null;
  coeNumber: string | null;
  enrolledAt: string | null;
  createdAt: string;
  updatedAt: string;
  daysInStatus: number;
  daysInStatusColor: DaysInStatusColor;
  statusProgress: StatusProgressMilestone[];
  documentRequests: SchoolApplicationDocumentRequest[];
  studentDocuments: SchoolStudentDocument[];
  student: {
    documentId: string;
    firstName: string;
    lastName: string;
    nationality: string | null;
    dateOfBirth: string | null;
  } | null;
  school: {
    documentId: string;
    name: string;
    state: string | null;
    cricosCode: string | null;
  } | null;
  agent: {
    documentId: string;
    companyName: string | null;
    qeacNumber: string | null;
    user: { documentId: string; firstName: string; lastName: string } | null;
  } | null;
}

export interface SchoolApplicationDetailResponse {
  data: SchoolApplicationDetail;
}

export type SchoolActionKey =
  | 'receive'
  | 'review'
  | 'request-documents'
  | 'require-assessment'
  | 'schedule-interview'
  | 'complete-interview'
  | 'make-offer'
  | 'extend-offer'
  | 'withdraw-offer'
  | 'waitlist'
  | 'decline'
  | 'exam-outcome'
  | 'issue-coe'
  | 'enroll';

export interface MakeOfferInput {
  offerDeadline: string;
  offerConditions?: string;
  offerAnnualFee?: number;
}

export interface DeclineInput {
  declineReason: string;
  declineNote?: string;
}

export interface ScheduleInterviewInput {
  interviewScheduledAt: string;
  interviewMethod: string;
  interviewWith?: string;
  interviewMeetingLink?: string;
}

export interface CompleteInterviewInput {
  interviewOutcome: string;
  interviewNotes?: string;
}

export interface RequestDocumentsInput {
  documentTypes: string[];
  note?: string;
}

export interface RecordExamOutcomeInput {
  examOutcome: string;
  examScore?: string;
  examNotes?: string;
}

export interface IssueCoeInput {
  coeNumber: string;
  coeStartDate?: string;
  coeEndDate?: string;
}

export interface SchoolPrivateNote {
  documentId: string;
  content: string;
  createdAt: string;
  author: { documentId: string } | null;
}

export interface SchoolPrivateNotesResponse {
  data: SchoolPrivateNote[];
}

export interface SchoolTimelineEvent {
  id: number;
  documentId: string;
  eventType: string;
  description: string;
  actorRole: 'agent' | 'school_staff' | 'system' | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface SchoolTimelineResponse {
  data: SchoolTimelineEvent[];
}

export interface SchoolPreEnrolmentItem {
  documentId: string;
  itemType: string;
  customLabel: string | null;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  note: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
}

export interface SchoolPreEnrolmentResponse {
  data: SchoolPreEnrolmentItem[];
}

export interface SchoolStaffMe {
  documentId: string;
  permissionLevel: 'admin' | 'staff' | string;
  school: { documentId: string; name: string };
}

export interface SchoolMessageThreadItem {
  id: number;
  documentId: string;
  content: string;
  senderRole: 'agent' | 'school_staff';
  sender: {
    documentId: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  } | null;
  createdAt: string;
  readAt: string | null;
}

export interface SchoolMessageThreadResponse {
  data: SchoolMessageThreadItem[];
}
