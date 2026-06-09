'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TOURS_MANAGE_KEY } from '@/modules/school-tours-manage/queries/use-my-school-tours.query';
import type {
  ManagedTour,
  ManagedTourResponse,
  TourWritePayload,
} from '@/modules/school-tours-manage/types/school-tours-manage.types';

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation<ManagedTour, Error, TourWritePayload>({
    mutationFn: async (payload) => {
      const res = await privateApi.post<ManagedTourResponse>('/api/school-tours/mine', {
        data: payload,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_TOURS_MANAGE_KEY });
    },
  });
}
