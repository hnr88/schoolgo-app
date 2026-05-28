'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { CreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';
import type { CreatedApplication } from '@/modules/applications/types/create-application.types';

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateApplicationFormValues) => {
      const { data } = await privateApi.post<{ data: CreatedApplication }>('/api/applications', {
        data: values,
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}
