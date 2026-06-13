'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { coeRegisterResponseSchema } from '@/modules/school-compliance/schemas/compliance.schema';
import type { CoeRegisterResult } from '@/modules/school-compliance/types/school-compliance.types';

export const COE_REGISTER_QUERY_KEY = ['school-compliance', 'coe-register'] as const;

export function useCoeRegister() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: COE_REGISTER_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<CoeRegisterResult> => {
      const { data } = await privateApi.get('/api/school-staffs/me/compliance/coe-register');
      const parsed = coeRegisterResponseSchema.parse(data);
      return {
        entries: parsed.data,
        bucketCounts: parsed.meta.bucketCounts,
        lifecycleCounts: parsed.meta.lifecycleCounts,
        total: parsed.meta.total,
      };
    },
  });
}
