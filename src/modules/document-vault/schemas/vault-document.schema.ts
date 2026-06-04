import { z } from 'zod';

import { VAULT_DOCUMENT_TYPES } from '@/modules/document-vault/types/document-vault.types';

export const uploadVaultDocumentSchema = z.object({
  title: z.string().min(1).max(255),
  documentType: z.enum(VAULT_DOCUMENT_TYPES),
  notes: z.string().max(2000).optional(),
  expiresAt: z.date().optional(),
});

export type UploadVaultDocumentFormValues = z.infer<typeof uploadVaultDocumentSchema>;
