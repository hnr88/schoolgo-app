import type { z } from 'zod';
import type { REQUESTABLE_DOCUMENT_TYPES } from '@/modules/school-document-requests/constants/school-document-requests.constants';
import type { requestDocumentsSchema } from '@/modules/school-document-requests/schemas/request-documents.schema';

export type RequestableDocumentType = (typeof REQUESTABLE_DOCUMENT_TYPES)[number];

export type DocumentRequestStatus = 'pending' | 'partially_fulfilled' | 'fulfilled';

export interface SchoolDocumentRequestRow {
  documentId: string;
  documentTypes: string[];
  note: string | null;
  status: DocumentRequestStatus;
  deadline: string | null;
  fulfilledAt: string | null;
  createdAt: string;
  application: {
    documentId: string;
    student: { firstName: string | null; lastName: string | null } | null;
  } | null;
}

export interface SchoolDocumentRequestsResponse {
  data: SchoolDocumentRequestRow[];
}

export interface CreateDocumentRequestPayload {
  applicationDocumentId: string;
  requiredDocuments: string[];
  deadline?: string;
}

export type RequestDocumentsFormValues = z.infer<typeof requestDocumentsSchema>;
