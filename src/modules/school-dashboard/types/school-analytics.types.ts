import type { StrapiEnvelope } from '@/modules/school-dashboard/types/school-dashboard.types';

export const FUNNEL_STATUSES = [
  'submitted',
  'received',
  'under_review',
  'documents_requested',
  'assessment_required',
  'interview_scheduled',
  'interview_completed',
  'offer_made',
  'offer_accepted',
  'waitlisted',
  'pre_enrolment',
  'coe_issued',
  'enrolled',
  'declined',
  'withdrawn',
] as const;

export type FunnelStatus = (typeof FUNNEL_STATUSES)[number];

export interface FunnelStage {
  status: FunnelStatus;
  count: number;
}

export interface FunnelConversionStep {
  from: FunnelStatus;
  to: FunnelStatus;
  fromCount: number;
  toCount: number;
  rate: number;
}

export interface FunnelTotals {
  received: number;
  offered: number;
  accepted: number;
  enrolled: number;
}

export interface FunnelAgentSource {
  agentDocumentId: string | null;
  agentCompanyName: string | null;
  applications: number;
  offers: number;
  enrolments: number;
  conversionRate: number;
}

export interface FunnelAnalytics {
  stages: FunnelStage[];
  conversion: FunnelConversionStep[];
  totals: FunnelTotals;
  agentSource: FunnelAgentSource[];
}

export interface FunnelAnalyticsParams {
  intakeYear?: number;
  from?: string;
  to?: string;
}

export interface ForecastPipeline {
  submitted: number;
  inReview: number;
  offered: number;
  accepted: number;
  enrolled: number;
}

export interface ForecastIntake {
  targetIntake: string;
  targetYearLevel: string | null;
  capacityTotal: number | null;
  capacityRemaining: number | null;
  pipeline: ForecastPipeline;
  projectedEnrolment: number;
}

export interface IntakeForecast {
  intakes: ForecastIntake[];
}

export interface IntakeForecastParams {
  intakeYear?: number;
}

export type FunnelAnalyticsEnvelope = StrapiEnvelope<FunnelAnalytics>;
export type IntakeForecastEnvelope = StrapiEnvelope<IntakeForecast>;
