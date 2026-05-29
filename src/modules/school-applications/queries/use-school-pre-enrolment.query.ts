'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolPreEnrolmentItem,
  SchoolPreEnrolmentResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolPreEnrolmentKey(applicationDocumentId: string) {
  return ['school-applications', applicationDocumentId, 'pre-enrolment'] as const;
}

export function useSchoolPreEnrolment(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolPreEnrolmentKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<SchoolPreEnrolmentItem[]> => {
      const { data } = await privateApi.get<SchoolPreEnrolmentResponse>(
        '/api/pre-enrolment-items/by-application',
        { params: { applicationDocumentId } },
      );
      return data.data;
    },
  });
}

export function useUpdatePreEnrolmentStatus(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { itemDocumentId: string; status: 'approved' | 'rejected'; note?: string }) => {
      const { data } = await privateApi.put(
        `/api/pre-enrolment-items/${input.itemDocumentId}/status`,
        { data: { status: input.status, note: input.note } },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolPreEnrolmentKey(applicationDocumentId) });
    },
  });
}
