'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  MY_TOUR_BOOKINGS_QUERY_KEY,
  TOUR_BOOKINGS_ENDPOINT,
} from '@/modules/tours/constants/tours.constants';
import type { MyBookingsResponse } from '@/modules/tours/types/tours.types';

export function useMyTourBookings() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: MY_TOUR_BOOKINGS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<MyBookingsResponse>(TOUR_BOOKINGS_ENDPOINT);
      return data;
    },
  });
}
