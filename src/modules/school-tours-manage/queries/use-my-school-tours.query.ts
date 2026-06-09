'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  ManagedTour,
  ManagedToursResponse,
} from '@/modules/school-tours-manage/types/school-tours-manage.types';

export const SCHOOL_TOURS_MANAGE_KEY = ['school-tours-manage', 'list'] as const;

export function useMySchoolTours() {
  return useQuery<ManagedTour[]>({
    queryKey: SCHOOL_TOURS_MANAGE_KEY,
    queryFn: async () => {
      const res = await privateApi.get<ManagedToursResponse>('/api/school-tours/mine');
      return res.data.data;
    },
  });
}
