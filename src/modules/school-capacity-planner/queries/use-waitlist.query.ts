'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import { WAITLIST_QUERY_KEY } from '@/modules/school-capacity-planner/constants/capacity-planner.constants';
import { waitlistResponseSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';

export function useWaitlist() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<WaitlistEntry[]>({
    queryKey: WAITLIST_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-staffs/me/capacity/waitlist');
      return waitlistResponseSchema.parse(res.data).data;
    },
  });
}
