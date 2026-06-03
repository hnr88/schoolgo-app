'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { VAULT_DOCUMENTS_QUERY_KEY } from '@/modules/document-vault/queries/use-vault-documents.query';
import type { StrapiUploadResponseItem } from '@/modules/forms/types/media.types';
import type {
  UploadVaultDocumentInput,
  VaultSingleResponse,
} from '@/modules/document-vault/types/document-vault.types';

export function useUploadVaultDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, documentType, notes, file }: UploadVaultDocumentInput) => {
      const uploadForm = new FormData();
      uploadForm.append('files', file, file.name);

      const { data: uploaded } = await privateApi.post<StrapiUploadResponseItem[]>(
        '/api/upload',
        uploadForm,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      const fileId = uploaded?.[0]?.id;
      if (!fileId) throw new Error('Upload returned an empty response');

      const { data } = await privateApi.post<VaultSingleResponse>('/api/parent-documents', {
        data: {
          title,
          documentType,
          file: fileId,
          ...(notes ? { notes } : {}),
        },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VAULT_DOCUMENTS_QUERY_KEY });
    },
  });
}
