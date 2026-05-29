'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolTuition } from '@/modules/school-profile/types/school-profile.types';

export const SCHOOL_TUITIONS_QUERY_KEY = ['school-tuitions'] as const;

interface TuitionListResponse {
  data: SchoolTuition[];
}

export function useSchoolTuitions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolTuition[]>({
    queryKey: SCHOOL_TUITIONS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<TuitionListResponse>('/api/school-tuitions');
      return res.data.data;
    },
  });
}
