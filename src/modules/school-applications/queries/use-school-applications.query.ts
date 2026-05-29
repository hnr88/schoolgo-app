'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolApplicationListItem,
  SchoolApplicationListResponse,
} from '@/modules/school-applications/types/school-applications.types';

export const SCHOOL_APPLICATIONS_QUERY_KEY = ['school-applications'] as const;

export interface UseSchoolApplicationsParams {
  status?: string;
  intake?: string;
  sort?: string;
}

export function useSchoolApplications({ status, intake, sort }: UseSchoolApplicationsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...SCHOOL_APPLICATIONS_QUERY_KEY, { status, intake, sort }],
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolApplicationListItem[]> => {
      const params: Record<string, unknown> = { pageSize: 100 };
      if (status && status !== 'all') params.status = status;
      if (intake) params.targetIntake = intake;
      if (sort) params.sort = sort;

      const { data } = await privateApi.get<SchoolApplicationListResponse>(
        '/api/school-staffs/me/applications',
        { params },
      );
      return data.data;
    },
  });
}
