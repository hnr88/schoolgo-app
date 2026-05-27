'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentApplicationDetailResponse } from '@/modules/applications/types/parent-application.types';

export function useParentApplication(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'application', documentId],
    enabled: isAuthenticated && !!documentId,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentApplicationDetailResponse>(
        `/api/applications/${documentId}`,
      );
      return data.data;
    },
  });
}
