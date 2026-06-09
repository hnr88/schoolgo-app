'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import type {
  QueueStaffMe,
  QueueStaffMeResponse,
} from '@/modules/school-pre-enrolment-queue/types/queue-staff-me.types';

export function useQueueStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<QueueStaffMe>({
    queryKey: ['school-pre-enrolment-queue', 'staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<QueueStaffMeResponse>('/api/school-staffs/me');
      return res.data.data;
    },
  });
}
