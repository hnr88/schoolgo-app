import { z } from 'zod';
import { DOCUMENT_TYPES } from '@/modules/students/types/document.types';

export const uploadAgentDocumentSchema = z.object({
  studentDocumentId: z.string().min(1),
  documentType: z.enum(DOCUMENT_TYPES),
  fileName: z.string().max(255).optional(),
  notes: z.string().optional(),
});

export type UploadAgentDocumentFormValues = z.infer<typeof uploadAgentDocumentSchema>;
