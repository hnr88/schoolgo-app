'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TUITION_QUERY_KEY } from '@/modules/school-tuition-editor/queries/use-my-tuition.query';
import type {
  TuitionRowsResponse,
  TuitionSavePayload,
} from '@/modules/school-tuition-editor/types/school-tuition-editor.types';

export function useSaveTuition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TuitionSavePayload) => {
      const { data } = await privateApi.put<TuitionRowsResponse>(
        '/api/school-tuitions/mine',
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_TUITION_QUERY_KEY });
    },
  });
}
