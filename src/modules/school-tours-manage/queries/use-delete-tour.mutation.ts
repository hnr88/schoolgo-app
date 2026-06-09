'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TOURS_MANAGE_KEY } from '@/modules/school-tours-manage/queries/use-my-school-tours.query';

export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (documentId) => {
      await privateApi.delete(`/api/school-tours/${documentId}`);
      return documentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_TOURS_MANAGE_KEY });
    },
  });
}
