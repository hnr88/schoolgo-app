'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import {
  MY_TOUR_BOOKINGS_QUERY_KEY,
  TOUR_BOOKINGS_ENDPOINT,
  TOURS_QUERY_KEY,
} from '@/modules/tours/constants/tours.constants';
import type { BookTourResponse } from '@/modules/tours/types/tours.types';

export function useBookTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tourId: string) => {
      const { data } = await privateApi.post<BookTourResponse>(TOUR_BOOKINGS_ENDPOINT, {
        tour: tourId,
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MY_TOUR_BOOKINGS_QUERY_KEY });
    },
  });
}
