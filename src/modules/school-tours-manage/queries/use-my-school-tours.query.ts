'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { managedToursResponseSchema } from '@/modules/school-tours-manage/schemas/school-tours-manage.schema';
import type { ManagedTour } from '@/modules/school-tours-manage/types/school-tours-manage.types';

export const SCHOOL_TOURS_MANAGE_KEY = ['school-tours-manage', 'list'] as const;

export function useMySchoolTours() {
  return useQuery<ManagedTour[]>({
    queryKey: SCHOOL_TOURS_MANAGE_KEY,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-tours/mine');
      return managedToursResponseSchema.parse(res.data).data;
    },
  });
}
