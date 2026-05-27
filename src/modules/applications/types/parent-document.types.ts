import type { DocumentType } from '@/modules/students';

export type DocumentRequestStatus = 'pending' | 'partially_fulfilled' | 'fulfilled';

export interface ParentDocumentRequest {
  documentId: string;
  documentTypes: DocumentType[];
  note: string | null;
  status: DocumentRequestStatus;
  fulfilledAt: string | null;
  createdAt: string;
}

export interface ParentDocumentRequestsResponse {
  data: ParentDocumentRequest[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ParentUploadedDocument {
  documentId: string;
  documentType: DocumentType;
  fileName: string | null;
  status: string;
  expiresAt: string | null;
  notes: string | null;
  flowDirection: string;
  uploadedByRole: string;
  file: { url: string; name: string; mime: string; size: number } | null;
  createdAt: string;
}

export interface ParentUploadedDocumentsResponse {
  data: ParentUploadedDocument[];
}

export interface UploadParentDocumentInput {
  documentType: DocumentType;
  file: number;
  fileName?: string;
  notes?: string;
  student: string;
  application?: string;
}
