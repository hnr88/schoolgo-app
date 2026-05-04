import type { ApplicationStatus } from '@/modules/applications/types/application.types';
import type { ApplicationSortField } from '@/modules/applications/types/component.types';

export const APPLICATION_STATUS_STYLES: Record<
  ApplicationStatus,
  { dot: string; bg: string; text: string }
> = {
  draft: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  submitted: { dot: 'bg-babu-500', bg: 'bg-babu-50', text: 'text-babu-700' },
  received: { dot: 'bg-babu-500', bg: 'bg-babu-50', text: 'text-babu-700' },
  under_review: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  documents_requested: {
    dot: 'bg-vivid-amber',
    bg: 'bg-vivid-amber-soft',
    text: 'text-arches-700',
  },
  assessment_required: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  interview_scheduled: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  offer_made: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  offer_accepted: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  pre_enrolment: { dot: 'bg-babu-600', bg: 'bg-babu-50', text: 'text-babu-700' },
  coe_issued: { dot: 'bg-babu-600', bg: 'bg-babu-100', text: 'text-babu-700' },
  enrolled: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint', text: 'text-white' },
  withdrawn: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  declined: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
  waitlisted: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: 'statusDraft',
  submitted: 'statusSubmitted',
  received: 'statusReceived',
  under_review: 'statusUnderReview',
  documents_requested: 'statusDocumentsRequested',
  assessment_required: 'statusAssessmentRequired',
  interview_scheduled: 'statusInterviewScheduled',
  offer_made: 'statusOfferMade',
  offer_accepted: 'statusOfferAccepted',
  pre_enrolment: 'statusPreEnrolment',
  coe_issued: 'statusCoeIssued',
  enrolled: 'statusEnrolled',
  withdrawn: 'statusWithdrawn',
  declined: 'statusDeclined',
  waitlisted: 'statusWaitlisted',
};

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', labelKey: 'allStatuses' as const },
  { value: 'active', labelKey: 'filterActive' as const },
  { value: 'needs_action', labelKey: 'filterNeedsAction' as const },
  { value: 'draft', labelKey: 'statusDraft' as const },
  { value: 'submitted', labelKey: 'statusSubmitted' as const },
  { value: 'under_review', labelKey: 'statusUnderReview' as const },
  { value: 'documents_requested', labelKey: 'statusDocumentsRequested' as const },
  { value: 'offer_made', labelKey: 'statusOfferMade' as const },
  { value: 'enrolled', labelKey: 'statusEnrolled' as const },
  { value: 'withdrawn', labelKey: 'statusWithdrawn' as const },
  { value: 'declined', labelKey: 'statusDeclined' as const },
];

export const SORT_FIELD_TO_API: Record<ApplicationSortField, string> = {
  student: 'student.firstName',
  school: 'school.name',
  state: 'school.state',
  targetYearLevel: 'targetYearLevel',
  status: 'status',
  submittedAt: 'submittedAt',
  daysInStatus: 'daysInStatus',
};

export const DAYS_THRESHOLDS = {
  WARNING: 14,
  DANGER: 28,
} as const;
