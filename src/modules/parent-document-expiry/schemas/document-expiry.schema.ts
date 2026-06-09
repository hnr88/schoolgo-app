import { z } from 'zod';
import { DOCUMENT_STATUSES, DOCUMENT_TYPES } from '@/modules/students/types/document.types';

export const studentExpiryDocumentSchema = z.object({
  documentId: z.string(),
  documentType: z.enum(DOCUMENT_TYPES),
  fileName: z.string().nullable(),
  expiresAt: z.string().nullable(),
  status: z.enum(DOCUMENT_STATUSES),
  student: z
    .object({
      documentId: z.string(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
    })
    .nullable(),
});

export const studentExpiryDocumentsResponseSchema = z.object({
  data: z.array(studentExpiryDocumentSchema),
  meta: z.object({ truncated: z.boolean().optional() }).optional(),
});
