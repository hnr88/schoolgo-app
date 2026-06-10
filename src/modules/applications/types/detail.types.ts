import type { ReactNode } from 'react';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';

export interface ProgressStep {
  key: string;
  label: string;
  statuses: ApplicationStatus[];
}

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

export type MessageSenderRole = 'agent' | 'school_staff' | 'parent';

export interface MessageThreadSender {
  documentId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface MessageThreadItem {
  id: number;
  documentId: string;
  content: string;
  senderRole: MessageSenderRole;
  sender: MessageThreadSender | null;
  createdAt: string;
  readAt: string | null;
}

export interface StrapiMessageThreadResponse {
  data: MessageThreadItem[];
  meta: Record<string, unknown>;
}

export interface SendMessageInput {
  content: string;
}

export interface MessageComposerProps {
  applicationDocumentId: string;
  onSent?: () => void;
  autoFocus?: boolean;
}

export interface ConfirmActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  isPending: boolean;
  onConfirm: () => void;
  destructive?: boolean;
  children?: ReactNode;
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
