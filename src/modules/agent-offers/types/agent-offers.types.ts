import type { Application } from '@/modules/applications/types/application.types';

export type OfferDeadlineUrgency = 'urgent' | 'soon' | 'normal' | 'expired';

export interface AgentOfferDetail {
  documentId: string;
  status: string;
  offerAnnualFee: number | null;
  offerDeadline: string | null;
  offerMadeAt: string | null;
  offerConditions: string | null;
}

export interface AgentOfferDetailResponse {
  data: AgentOfferDetail;
}

export interface PostOfferApplicationsResponse {
  data: Application[];
}
