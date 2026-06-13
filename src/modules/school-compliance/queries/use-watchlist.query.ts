'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { watchlistResponseSchema } from '@/modules/school-compliance/schemas/compliance.schema';
import type { WatchlistResult } from '@/modules/school-compliance/types/school-compliance.types';

export const WATCHLIST_QUERY_KEY = ['school-compliance', 'watchlist'] as const;

export function useWatchlist() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: WATCHLIST_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<WatchlistResult> => {
      const { data } = await privateApi.get('/api/school-staffs/me/compliance/watchlist');
      const parsed = watchlistResponseSchema.parse(data);
      return {
        entries: parsed.data,
        flagCounts: parsed.meta.flagCounts,
        total: parsed.meta.total,
      };
    },
  });
}
