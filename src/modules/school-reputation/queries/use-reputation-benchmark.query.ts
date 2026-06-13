'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { SCHOOL_REPUTATION_BENCHMARK_QUERY_KEY } from '@/modules/school-reputation/constants/school-reputation.constants';
import { benchmarkResponseSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import type { BenchmarkResponse } from '@/modules/school-reputation/types/school-reputation.types';

export function useReputationBenchmark() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<BenchmarkResponse>({
    queryKey: [...SCHOOL_REPUTATION_BENCHMARK_QUERY_KEY],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<unknown>(
        '/api/school-staffs/me/reputation/benchmark',
      );
      return benchmarkResponseSchema.parse(data);
    },
  });
}
