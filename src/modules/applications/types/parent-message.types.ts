import type { ConversationSummary } from '@/modules/applications/types/conversation.types';

export type ParentMessageSenderRole = 'agent' | 'school_staff' | 'parent';

export interface ParentMessageThreadItem {
  id: number;
  documentId: string;
  senderRole: ParentMessageSenderRole;
  content: string;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  attachments: unknown[] | null;
}

export interface StrapiParentThreadResponse {
  data: ParentMessageThreadItem[];
  meta: Record<string, unknown>;
}

export interface StrapiParentConversationsResponse {
  data: ConversationSummary[];
  meta: { pagination: { total: number } };
}

export interface ParentSendMessageInput {
  content: string;
  attachments?: File[];
}

export interface ParentMessageAttachmentsFieldProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

export interface ParentSendMessageResponse {
  data: ParentMessageThreadItem;
  meta: Record<string, unknown>;
}

export interface ParentMessageThreadPanelProps {
  applicationDocumentId: string;
  conversation: ConversationSummary | null;
  onBack: () => void;
}

export interface ParentMessageComposerProps {
  applicationDocumentId: string;
  autoFocus?: boolean;
}
