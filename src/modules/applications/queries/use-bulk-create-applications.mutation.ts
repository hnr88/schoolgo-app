'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { BulkCreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';
import type { BulkCreateResult } from '@/modules/applications/types/create-application.types';

export function useBulkCreateApplications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: BulkCreateApplicationFormValues) => {
      const { data } = await privateApi.post<{ data: BulkCreateResult }>(
        '/api/applications/bulk-create',
        { data: values },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['pipeline'] });
    },
  });
}
