import type { z } from 'zod';
import type { REQUESTABLE_DOCUMENT_TYPES } from '@/modules/school-document-requests/constants/school-document-requests.constants';
import type {
  documentRequestStatusSchema,
  requestDocumentsSchema,
  schoolDocumentRequestRowSchema,
  schoolDocumentRequestsResponseSchema,
} from '@/modules/school-document-requests/schemas/request-documents.schema';

export type RequestableDocumentType = (typeof REQUESTABLE_DOCUMENT_TYPES)[number];

export type DocumentRequestStatus = z.infer<typeof documentRequestStatusSchema>;

export type SchoolDocumentRequestRow = z.infer<typeof schoolDocumentRequestRowSchema>;

export type SchoolDocumentRequestsResponse = z.infer<
  typeof schoolDocumentRequestsResponseSchema
>;

export interface CreateDocumentRequestPayload {
  applicationDocumentId: string;
  requiredDocuments: string[];
  deadline?: string;
}

export type RequestDocumentsFormValues = z.infer<typeof requestDocumentsSchema>;
