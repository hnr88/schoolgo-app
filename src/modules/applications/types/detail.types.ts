export interface ApplicationDocument {
  id: number;
  documentId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ApplicationMessage {
  id: number;
  documentId: string;
  sender: {
    name: string;
    role: 'agent' | 'school';
  };
  content: string;
  attachments: ApplicationMessageAttachment[];
  createdAt: string;
}

export interface ApplicationMessageAttachment {
  name: string;
  url: string;
  size: number;
}

export interface ApplicationTimelineEvent {
  id: number;
  type: 'status_change' | 'document_uploaded' | 'message_sent' | 'note_added' | 'application_created';
  description: string;
  actor: string;
  createdAt: string;
  metadata?: Record<string, string>;
}

export interface ApplicationProgressStep {
  key: string;
  label: string;
  completed: boolean;
  current: boolean;
}

export interface StrapiApplicationDocumentsResponse {
  data: ApplicationDocument[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiApplicationMessagesResponse {
  data: ApplicationMessage[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiApplicationTimelineResponse {
  data: ApplicationTimelineEvent[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}
