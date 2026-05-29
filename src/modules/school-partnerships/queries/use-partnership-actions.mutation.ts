'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PARTNERSHIPS_QUERY_KEY } from '@/modules/school-partnerships/queries/use-partnerships.query';
import type { InviteAgentPayload } from '@/modules/school-partnerships/types/school-partnerships.types';

function useInvalidatePartnerships() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: PARTNERSHIPS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: ['school', 'partnerships', 'agent-search'] });
  };
}

export function useApprovePartnership() {
  const invalidate = useInvalidatePartnerships();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.post(
        `/api/agent-partnerships/${documentId}/approve`,
      );
      return data;
    },
    onSuccess: invalidate,
  });
}

export function useDenyPartnership() {
  const invalidate = useInvalidatePartnerships();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.post(
        `/api/agent-partnerships/${documentId}/deny`,
      );
      return data;
    },
    onSuccess: invalidate,
  });
}

export function useRemovePartnership() {
  const invalidate = useInvalidatePartnerships();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.delete(`/api/agent-partnerships/${documentId}`);
      return data;
    },
    onSuccess: invalidate,
  });
}

export function useAddPartner() {
  const invalidate = useInvalidatePartnerships();
  return useMutation({
    mutationFn: async (payload: InviteAgentPayload) => {
      const { data } = await privateApi.post('/api/agent-partnerships', {
        data: payload,
      });
      return data;
    },
    onSuccess: invalidate,
  });
}
