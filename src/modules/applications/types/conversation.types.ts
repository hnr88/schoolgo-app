import type { MessageSenderRole } from '@/modules/applications/types/detail.types';

export interface ConversationLastMessage {
  preview: string;
  sentAt: string;
  senderRole: MessageSenderRole;
}

export interface ConversationSummary {
  applicationDocumentId: string;
  schoolName: string | null;
  studentName: string | null;
  lastMessage: ConversationLastMessage;
  unread: boolean;
}

export interface StrapiConversationsResponse {
  data: ConversationSummary[];
  meta: { pagination: { total: number } };
}

export interface ConversationListProps {
  conversations: ConversationSummary[];
  isLoading: boolean;
  isError: boolean;
  selectedId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (applicationDocumentId: string) => void;
}

export interface ConversationListItemProps {
  conversation: ConversationSummary;
  isSelected: boolean;
  onSelect: (applicationDocumentId: string) => void;
}

export interface MessageThreadPanelProps {
  applicationDocumentId: string;
  conversation: ConversationSummary | null;
  onBack: () => void;
}
