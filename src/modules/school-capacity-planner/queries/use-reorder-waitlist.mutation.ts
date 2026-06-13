'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { WAITLIST_QUERY_KEY } from '@/modules/school-capacity-planner/constants/capacity-planner.constants';

export function useReorderWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderedDocumentIds: string[]) => {
      const { data } = await privateApi.put<unknown>(
        '/api/school-staffs/me/capacity/waitlist/reorder',
        { data: { orderedDocumentIds } },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAITLIST_QUERY_KEY });
    },
  });
}
