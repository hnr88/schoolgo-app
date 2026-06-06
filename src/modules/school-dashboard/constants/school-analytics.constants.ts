import type { FunnelStatus } from '@/modules/school-dashboard/types/school-analytics.types';

export const FUNNEL_STATUS_LABEL_KEY: Record<FunnelStatus, string> = {
  submitted: 'statusSubmitted',
  received: 'statusReceived',
  under_review: 'statusUnderReview',
  documents_requested: 'statusDocumentsRequested',
  assessment_required: 'statusAssessmentRequired',
  interview_scheduled: 'statusInterviewScheduled',
  interview_completed: 'statusInterviewCompleted',
  offer_made: 'statusOfferMade',
  offer_accepted: 'statusOfferAccepted',
  waitlisted: 'statusWaitlisted',
  pre_enrolment: 'statusPreEnrolment',
  coe_issued: 'statusCoeIssued',
  enrolled: 'statusEnrolled',
  declined: 'statusDeclined',
  withdrawn: 'statusWithdrawn',
};

export const FORECAST_PIPELINE_LABEL_KEY = {
  submitted: 'pipelineSubmitted',
  inReview: 'pipelineInReview',
  offered: 'pipelineOffered',
  accepted: 'pipelineAccepted',
  enrolled: 'pipelineEnrolled',
} as const;

export const INTAKE_YEAR_SPAN = 4;
