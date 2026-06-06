'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import type { CreatedApplication } from '@/modules/applications/types/create-application.types';
import type {
  ParentCreateApplicationError,
  ParentCreateApplicationInput,
} from '@/modules/applications/types/parent-create-application.types';

function toParentCreateApplicationError(error: unknown): ParentCreateApplicationError {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      (error.response?.data as { error?: { message?: string } } | undefined)?.error?.message ??
      error.message;

    if (status === 400) return { kind: 'ageBlock', message };
    if (status === 403) return { kind: 'cricos', message };
    return { kind: 'unknown', message };
  }

  return { kind: 'unknown', message: error instanceof Error ? error.message : 'Request failed' };
}

export function useParentCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation<CreatedApplication, ParentCreateApplicationError, ParentCreateApplicationInput>({
    mutationFn: async (input) => {
      try {
        const { data } = await privateApi.post<{ data: CreatedApplication }>(
          '/api/applications/parent-create',
          {
            data: {
              student: input.student,
              school: input.school,
              targetYearLevel: input.targetYearLevel,
              targetIntake: input.targetIntake,
              boardingRequired: input.boardingRequired,
            },
          },
        );
        return data.data;
      } catch (error) {
        throw toParentCreateApplicationError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent', 'applications'] });
    },
  });
}
