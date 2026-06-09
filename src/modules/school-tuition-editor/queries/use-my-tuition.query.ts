'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { tuitionRowsResponseSchema } from '@/modules/school-tuition-editor/schemas/tuition-row.schema';
import type { TuitionRow } from '@/modules/school-tuition-editor/types/school-tuition-editor.types';

export const SCHOOL_TUITION_QUERY_KEY = ['school-tuition-editor', 'mine'] as const;

export function useMyTuition() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<TuitionRow[]>({
    queryKey: SCHOOL_TUITION_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-tuitions/mine');
      return tuitionRowsResponseSchema.parse(res.data).data;
    },
  });
}
