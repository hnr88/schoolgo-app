export type ParentTimelineEventType =
  | 'status_change'
  | 'document_uploaded'
  | 'document_requested'
  | 'message_sent'
  | 'message_received'
  | 'test_results'
  | 'offer_made'
  | 'offer_extended'
  | 'offer_withdrawn'
  | 'offer_accepted'
  | 'coe_issued'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'application_submitted'
  | 'application_withdrawn'
  | 'checklist_item_updated'
  | 'capacity_impact';

export type ParentTimelineActorRole = 'agent' | 'school_staff' | 'system' | null;

export interface ParentTimelineEvent {
  documentId: string;
  eventType: ParentTimelineEventType;
  description: string;
  actorRole: ParentTimelineActorRole;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface ParentTimelineResponse {
  data: ParentTimelineEvent[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
