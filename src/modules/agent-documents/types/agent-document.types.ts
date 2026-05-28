import type {
  DocumentType,
  DocumentStatus,
  StrapiMedia,
} from '@/modules/students/types/document.types';

export interface AgentDocumentStudent {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string | null;
}

export interface AgentDocument {
  id: number;
  documentId: string;
  documentType: DocumentType;
  file: StrapiMedia | null;
  fileName: string | null;
  status: DocumentStatus;
  expiresAt: string | null;
  notes: string | null;
  student: AgentDocumentStudent | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgentDocumentFilters {
  studentDocumentId?: string;
  documentType?: string;
  status?: string;
}

export interface UploadAgentDocumentInput {
  studentDocumentId: string;
  file: File;
  documentType: DocumentType;
  fileName?: string;
  notes?: string;
}
