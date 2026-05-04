import type { ApplicationStatus } from '@/modules/applications/types/application.types';

export const PROGRESS_STEPS: { key: string; label: string; statuses: ApplicationStatus[] }[] = [
  { key: 'submitted', label: 'progressSubmitted', statuses: ['submitted', 'received'] },
  { key: 'review', label: 'progressReview', statuses: ['under_review', 'assessment_required', 'interview_scheduled'] },
  { key: 'documents', label: 'progressDocuments', statuses: ['documents_requested'] },
  { key: 'offer', label: 'progressOffer', statuses: ['offer_made', 'offer_accepted'] },
  { key: 'enrolment', label: 'progressEnrolment', statuses: ['pre_enrolment', 'coe_issued'] },
  { key: 'enrolled', label: 'progressEnrolled', statuses: ['enrolled'] },
];

export const TERMINAL_STATUSES: ApplicationStatus[] = ['withdrawn', 'declined'];
