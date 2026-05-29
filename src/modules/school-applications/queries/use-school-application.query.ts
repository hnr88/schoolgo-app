'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolApplicationDetail,
  SchoolApplicationDetailResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolApplicationKey(documentId: string) {
  return ['school-applications', documentId] as const;
}

export function useSchoolApplication(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolApplicationKey(documentId),
    enabled: isAuthenticated && !!documentId,
    queryFn: async (): Promise<SchoolApplicationDetail> => {
      const { data } = await privateApi.get<SchoolApplicationDetailResponse>(
        `/api/applications/${documentId}/school-detail`,
      );
      return data.data;
    },
  });
}
