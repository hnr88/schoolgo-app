import type { StatusBadgeProps } from '@/modules/core';
import type { ForecastRisk } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

export const PIPELINE_FORECAST_ENDPOINT = '/api/agents/me/pipeline-forecast';

export function stageStatsEndpoint(schoolDocumentId: string): string {
  return `/api/schools/${schoolDocumentId}/stage-stats`;
}

export const PIPELINE_FORECAST_QUERY_KEY = ['agent', 'pipeline-forecast'] as const;

export const STAGE_STATS_QUERY_KEY = ['agent', 'stage-stats'] as const;

export const RISK_BADGE_STYLES: StatusBadgeProps['styles'] = {
  onTrack: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  watch: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
  overdue: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
};

export const RISK_LABEL_KEY: Record<ForecastRisk, string> = {
  onTrack: 'riskOnTrack',
  watch: 'riskWatch',
  overdue: 'riskOverdue',
};

/** Canonical application statuses → translation keys (subset relevant to forecasting). */
const STATUS_LABEL_KEY: Record<string, string> = {
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
  withdrawn: 'statusWithdrawn',
  declined: 'statusDeclined',
  waitlisted: 'statusWaitlisted',
};

/** Resolve a translation key for any (possibly unknown) backend status. */
export function resolveStatusLabelKey(status: string): string {
  return STATUS_LABEL_KEY[status] ?? 'statusUnknown';
}
