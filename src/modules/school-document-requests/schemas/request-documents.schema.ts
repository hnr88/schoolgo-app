import { z } from 'zod';
import { REQUESTABLE_DOCUMENT_TYPES } from '@/modules/school-document-requests/constants/school-document-requests.constants';

export const requestDocumentsSchema = z.object({
  requiredDocuments: z.array(z.enum(REQUESTABLE_DOCUMENT_TYPES)).min(1, 'required'),
  deadline: z.string().optional(),
});

export const documentRequestStatusSchema = z.enum([
  'pending',
  'partially_fulfilled',
  'fulfilled',
]);

export const schoolDocumentRequestRowSchema = z.object({
  documentId: z.string(),
  documentTypes: z.array(z.string()),
  note: z.string().nullable(),
  status: documentRequestStatusSchema,
  deadline: z.string().nullable(),
  fulfilledAt: z.string().nullable(),
  createdAt: z.string(),
  application: z
    .object({
      documentId: z.string(),
      student: z
        .object({
          firstName: z.string().nullable(),
          lastName: z.string().nullable(),
        })
        .nullable(),
    })
    .nullable(),
});

export const schoolDocumentRequestsResponseSchema = z.object({
  data: z.array(schoolDocumentRequestRowSchema),
});

export const createDocumentRequestResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
  }),
});
