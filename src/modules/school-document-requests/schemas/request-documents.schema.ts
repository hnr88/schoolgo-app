import { z } from 'zod';
import { REQUESTABLE_DOCUMENT_TYPES } from '@/modules/school-document-requests/constants/school-document-requests.constants';

export const requestDocumentsSchema = z.object({
  requiredDocuments: z.array(z.enum(REQUESTABLE_DOCUMENT_TYPES)).min(1, 'required'),
  deadline: z.string().optional(),
});
