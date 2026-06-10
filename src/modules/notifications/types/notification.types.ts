export type NotificationEventType =
  | 'application_submitted'
  | 'application_received'
  | 'status_changed'
  | 'documents_requested'
  | 'documents_uploaded'
  | 'message_received'
  | 'offer_made'
  | 'offer_accepted'
  | 'offer_deadline_approaching'
  | 'offer_deadline_expired'
  | 'application_declined'
  | 'application_withdrawn'
  | 'interview_scheduled'
  | 'coe_issued'
  | 'enrolled'
  | 'intake_closed'
  | 'template_updated'
  | 'capacity_low'
  | 'checklist_item_updated'
  | 'test_results_ready'
  | 'application_viewed'
  | 'weekly_pipeline_summary'
  | 'score_revoked'
  | 'saved_search_match';

export type NotificationPriority = 'high' | 'medium' | 'low';

export type NotificationTimeGroup = 'today' | 'yesterday' | 'this_week' | 'older';

export type NotificationEntityType = 'application' | 'student' | 'message' | null;

export interface ParentNotification {
  documentId: string;
  eventType: NotificationEventType;
  title: string;
  body: string | null;
  priority: NotificationPriority;
  readAt: string | null;
  createdAt: string;
  application: { documentId: string } | null;
  student: { documentId: string } | null;
  timeGroup: NotificationTimeGroup;
  entityType: NotificationEntityType;
  entityDocumentId: string | null;
}

export interface ParentNotificationsResponse {
  data: ParentNotification[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface UnreadCountResponse {
  data: {
    count: number;
  };
}

export interface UseParentNotificationsParams {
  page?: number;
  pageSize?: number;
  eventType?: NotificationEventType;
  read?: boolean;
}
