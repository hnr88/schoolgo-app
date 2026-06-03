'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  TOURS_ENDPOINT,
  TOURS_PAGE_SIZE,
  TOURS_QUERY_KEY,
} from '@/modules/tours/constants/tours.constants';
import type { ToursListResponse } from '@/modules/tours/types/tours.types';

export function useTours() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: TOURS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<ToursListResponse>(TOURS_ENDPOINT, {
        params: { page: 1, pageSize: TOURS_PAGE_SIZE },
      });
      return data;
    },
  });
}
