'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  ShareWithAgentInput,
  StudentAgentShareResponse,
} from '@/modules/students/types/agent-share.types';

export function useShareWithAgent(studentDocumentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: ShareWithAgentInput) => {
      const { data } = await privateApi.post<StudentAgentShareResponse>(
        `/api/students/${studentDocumentId}/share-with-agent`,
        { data: input },
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
