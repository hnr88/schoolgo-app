import type {
  SchoolActionKey,
  SchoolApplicationStatus,
  DaysInStatusColor,
} from '@/modules/school-applications/types/school-applications.types';

export const SCHOOL_STATUS_LABEL_KEY: Record<SchoolApplicationStatus, string> = {
  draft: 'statusDraft',
  submitted: 'statusSubmitted',
  received: 'statusReceived',
  under_review: 'statusUnderReview',
  documents_requested: 'statusDocumentsRequested',
  assessment_required: 'statusAssessmentRequired',
  interview_scheduled: 'statusInterviewScheduled',
  interview_completed: 'statusInterviewCompleted',
  offer_made: 'statusOfferMade',
  offer_accepted: 'statusOfferAccepted',
  pre_enrolment: 'statusPreEnrolment',
  coe_issued: 'statusCoeIssued',
  enrolled: 'statusEnrolled',
  waitlisted: 'statusWaitlisted',
  declined: 'statusDeclined',
};

export function daysColorClass(color: DaysInStatusColor): string {
  if (color === 'red') return 'text-rausch-600';
  if (color === 'amber') return 'text-arches-700';
  return 'text-foggy';
}

export function computeDaysColor(days: number): DaysInStatusColor {
  if (days >= 28) return 'red';
  if (days >= 14) return 'amber';
  return 'grey';
}

const TERMINAL: SchoolApplicationStatus[] = ['declined', 'enrolled', 'offer_accepted'];

export function isTerminalStatus(status: SchoolApplicationStatus): boolean {
  return TERMINAL.includes(status);
}

// Which workflow actions are available from a given status for the school role.
// This MUST stay in sync with the backend, which enforces transitions in TWO
// places: the per-action `assertTransition` in the application controller AND
// the document-service middleware `VALID_TRANSITIONS` map in `src/index.ts`.
// The lists below are the intersection of both guards (offering an action the
// backend rejects renders a dead button that 403/400s on click).
export function availableActions(status: SchoolApplicationStatus): SchoolActionKey[] {
  switch (status) {
    case 'submitted':
      return ['receive'];
    case 'received':
      return ['review', 'decline', 'waitlist'];
    case 'under_review':
      return [
        'request-documents',
        'require-assessment',
        'schedule-interview',
        'make-offer',
        'decline',
        'waitlist',
      ];
    case 'documents_requested':
      return ['review'];
    case 'assessment_required':
      return ['review', 'exam-outcome'];
    case 'interview_scheduled':
      return ['complete-interview'];
    case 'interview_completed':
      return ['make-offer', 'decline', 'waitlist'];
    case 'offer_made':
      return ['extend-offer', 'withdraw-offer'];
    case 'offer_accepted':
    case 'pre_enrolment':
      return ['issue-coe'];
    case 'coe_issued':
      return ['enroll'];
    case 'waitlisted':
      return ['make-offer', 'decline'];
    default:
      return [];
  }
}

export const ACTION_LABEL_KEY: Record<SchoolActionKey, string> = {
  receive: 'actionReceive',
  review: 'actionReview',
  'request-documents': 'actionRequestDocuments',
  'require-assessment': 'actionRequireAssessment',
  'schedule-interview': 'actionScheduleInterview',
  'complete-interview': 'actionCompleteInterview',
  'make-offer': 'actionMakeOffer',
  'extend-offer': 'actionExtendOffer',
  'withdraw-offer': 'actionWithdrawOffer',
  waitlist: 'actionWaitlist',
  decline: 'actionDecline',
  'exam-outcome': 'actionRecordExamOutcome',
  'issue-coe': 'actionIssueCoe',
  enroll: 'actionEnroll',
};

// Actions that open a dialog requiring extra input (RHF + Zod).
export const DIALOG_ACTIONS: SchoolActionKey[] = [
  'make-offer',
  'extend-offer',
  'decline',
  'schedule-interview',
  'complete-interview',
  'request-documents',
  'exam-outcome',
  'issue-coe',
];

export function studentDisplayName(
  student: { firstName: string; lastName: string } | null,
): string {
  if (!student) return '—';
  return `${student.firstName} ${student.lastName}`.trim();
}

export function agentUserName(
  user: { firstName: string; lastName: string } | null | undefined,
): string | null {
  if (!user) return null;
  return `${user.firstName} ${user.lastName}`.trim();
}
