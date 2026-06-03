'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { VAULT_DOCUMENTS_QUERY_KEY } from '@/modules/document-vault/queries/use-vault-documents.query';

export function useDeleteVaultDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      await privateApi.delete(`/api/parent-documents/${documentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VAULT_DOCUMENTS_QUERY_KEY });
    },
  });
}
