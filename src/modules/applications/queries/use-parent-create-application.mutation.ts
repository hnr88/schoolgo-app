'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { CreatedApplication } from '@/modules/applications/types/create-application.types';
import type { ParentCreateApplicationInput } from '@/modules/applications/types/parent-create-application.types';

export function useParentCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ParentCreateApplicationInput) => {
      const { data } = await privateApi.post<{ data: CreatedApplication }>(
        '/api/applications/parent-create',
        { data: { student: input.student, school: input.school } },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent', 'applications'] });
    },
  });
}
