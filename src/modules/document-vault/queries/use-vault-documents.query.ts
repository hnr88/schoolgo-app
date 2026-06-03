'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { VaultListResponse } from '@/modules/document-vault/types/document-vault.types';

export const VAULT_DOCUMENTS_QUERY_KEY = ['vault-documents'] as const;

export function useVaultDocuments() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: VAULT_DOCUMENTS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<VaultListResponse>('/api/parent-documents');
      return data;
    },
  });
}
