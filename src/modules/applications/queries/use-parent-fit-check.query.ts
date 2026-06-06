'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  ParentFitCheckParams,
  ParentFitCheckResult,
} from '@/modules/applications/types/parent-create-application.types';

export function useParentFitCheck(params: Partial<ParentFitCheckParams>) {
  const { school, student, targetYearLevel } = params;
  const enabled = Boolean(school && student && targetYearLevel);

  return useQuery({
    queryKey: ['parent', 'fit-check', school, student, targetYearLevel],
    enabled,
    queryFn: async () => {
      const { data } = await privateApi.get<{ data: ParentFitCheckResult }>(
        `/api/schools/${school}/fit-check`,
        { params: { student, targetYearLevel } },
      );
      return data.data;
    },
  });
}
