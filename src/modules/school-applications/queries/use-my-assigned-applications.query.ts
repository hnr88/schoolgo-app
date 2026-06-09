'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { SCHOOL_APPLICATIONS_QUERY_KEY } from '@/modules/school-applications/queries/use-school-applications.query';
import type {
  SchoolApplicationListItem,
  SchoolApplicationListResponse,
} from '@/modules/school-applications/types/school-applications.types';

export interface UseMyAssignedApplicationsParams {
  status?: string;
  intake?: string;
  enabled?: boolean;
}

export function useMyAssignedApplications({
  status,
  intake,
  enabled = true,
}: UseMyAssignedApplicationsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...SCHOOL_APPLICATIONS_QUERY_KEY, 'assigned', { status, intake }],
    enabled: isAuthenticated && enabled,
    queryFn: async (): Promise<SchoolApplicationListItem[]> => {
      const params: Record<string, unknown> = { pageSize: 100 };
      if (status && status !== 'all') params.status = status;
      if (intake) params.targetIntake = intake;

      const { data } = await privateApi.get<SchoolApplicationListResponse>(
        '/api/school-staffs/me/applications/assigned',
        { params },
      );
      return data.data;
    },
  });
}
