'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import { queueStaffMeResponseSchema } from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';
import type { QueueStaffMe } from '@/modules/school-pre-enrolment-queue/types/queue-staff-me.types';

export function useQueueStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<QueueStaffMe>({
    queryKey: ['school-pre-enrolment-queue', 'staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-staffs/me');
      return queueStaffMeResponseSchema.parse(res.data).data;
    },
  });
}
