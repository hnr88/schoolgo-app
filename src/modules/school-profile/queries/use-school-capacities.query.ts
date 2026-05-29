'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { SchoolCapacity } from '@/modules/school-profile/types/school-profile.types';

export const SCHOOL_CAPACITIES_QUERY_KEY = ['school-capacities'] as const;

interface CapacityListResponse {
  data: SchoolCapacity[];
}

export function useSchoolCapacities(schoolDocumentId: string | undefined) {
  return useQuery<SchoolCapacity[]>({
    queryKey: [...SCHOOL_CAPACITIES_QUERY_KEY, schoolDocumentId],
    enabled: Boolean(schoolDocumentId),
    queryFn: async () => {
      const res = await privateApi.get<CapacityListResponse>(
        `/api/school-capacities/by-school/${schoolDocumentId}`,
      );
      return res.data.data;
    },
  });
}
