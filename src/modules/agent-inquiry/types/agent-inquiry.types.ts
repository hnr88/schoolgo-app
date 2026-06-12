export interface SubmitInquiryPayload {
  agentDocumentId: string;
  schoolDocumentId?: string;
  parentName: string;
  parentEmail: string;
  parentPhone?: string;
  childAge?: number;
  message: string;
}

export interface SubmittedInquiry {
  documentId: string;
  status: 'new';
  createdAt: string;
}

export interface SubmitInquiryResponse {
  data: SubmittedInquiry;
  meta: Record<string, never>;
}

export interface ContactAgentDialogProps {
  agentDocumentId: string;
  schoolDocumentId?: string;
  /** Custom trigger element merged into the dialog trigger (Base UI `render`). */
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
