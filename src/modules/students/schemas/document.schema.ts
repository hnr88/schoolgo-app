import { z } from 'zod';
import { DOCUMENT_TYPES, DOCUMENT_STATUSES } from '@/modules/students/types/document.types';

export const uploadDocumentSchema = z.object({
  documentType: z.enum(DOCUMENT_TYPES),
  fileName: z.string().max(255).optional(),
  expiresAt: z.string().optional(),
  notes: z.string().optional(),
});

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>;

export const documentFilterSchema = z.object({
  documentType: z.enum(DOCUMENT_TYPES).optional(),
  status: z.enum(DOCUMENT_STATUSES).optional(),
});

export type DocumentFilterValues = z.infer<typeof documentFilterSchema>;
