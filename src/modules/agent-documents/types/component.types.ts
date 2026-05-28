import type { AgentDocument } from '@/modules/agent-documents/types/agent-document.types';

export interface AgentDocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AgentDocumentsTableProps {
  documents: AgentDocument[];
  onDelete: (document: AgentDocument) => void;
}

export interface DeleteAgentDocumentDialogProps {
  document: AgentDocument | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}
