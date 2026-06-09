'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  queueResponseSchema,
  type PreEnrolmentQueueItem,
} from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

export const PRE_ENROLMENT_QUEUE_KEY = ['school-pre-enrolment-queue'] as const;

export function usePreEnrolmentQueue() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PRE_ENROLMENT_QUEUE_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<PreEnrolmentQueueItem[]> => {
      const { data } = await privateApi.get<unknown>(
        '/api/school-staffs/me/pre-enrolment-queue',
      );
      return queueResponseSchema.parse(data).data;
    },
  });
}
