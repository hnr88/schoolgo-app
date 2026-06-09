'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TOURS_MANAGE_KEY } from '@/modules/school-tours-manage/queries/use-my-school-tours.query';
import type {
  ManagedTour,
  ManagedTourResponse,
  TourWritePayload,
} from '@/modules/school-tours-manage/types/school-tours-manage.types';

interface UpdateTourVariables {
  documentId: string;
  payload: TourWritePayload;
}

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation<ManagedTour, Error, UpdateTourVariables>({
    mutationFn: async ({ documentId, payload }) => {
      const res = await privateApi.put<ManagedTourResponse>(`/api/school-tours/${documentId}`, {
        data: payload,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_TOURS_MANAGE_KEY });
    },
  });
}
