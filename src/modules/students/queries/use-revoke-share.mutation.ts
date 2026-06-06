'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StudentAgentShareResponse } from '@/modules/students/types/agent-share.types';

export function useRevokeShare(studentDocumentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (shareDocumentId: string) => {
      const { data } = await privateApi.post<StudentAgentShareResponse>(
        `/api/student-agent-shares/${shareDocumentId}/revoke`,
      );
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['parent', 'student', studentDocumentId, 'agent-shares'],
      });
    },
  });
}
