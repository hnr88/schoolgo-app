'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StudentAgentSharesResponse } from '@/modules/students/types/agent-share.types';

export function useAgentShares(studentDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'student', studentDocumentId, 'agent-shares'],
    enabled: isAuthenticated && Boolean(studentDocumentId),
    queryFn: async () => {
      const { data } = await privateApi.get<StudentAgentSharesResponse>(
        `/api/students/${studentDocumentId}/agent-shares`,
      );
      return data.data;
    },
  });
}
