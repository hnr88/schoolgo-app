'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TOURS_MANAGE_KEY } from '@/modules/school-tours-manage/queries/use-my-school-tours.query';
import { managedTourResponseSchema } from '@/modules/school-tours-manage/schemas/school-tours-manage.schema';
import type {
  ManagedTour,
  TourWritePayload,
} from '@/modules/school-tours-manage/types/school-tours-manage.types';

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation<ManagedTour, Error, TourWritePayload>({
    mutationFn: async (payload) => {
      const res = await privateApi.post<unknown>('/api/school-tours/mine', {
        data: payload,
      });
      return managedTourResponseSchema.parse(res.data).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_TOURS_MANAGE_KEY });
    },
  });
}
