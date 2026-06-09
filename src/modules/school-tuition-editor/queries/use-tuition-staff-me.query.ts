'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { tuitionStaffMeResponseSchema } from '@/modules/school-tuition-editor/schemas/tuition-row.schema';
import type { TuitionStaffMe } from '@/modules/school-tuition-editor/types/school-tuition-editor.types';

export function useTuitionStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<TuitionStaffMe>({
    queryKey: ['school-tuition-editor', 'staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-staffs/me');
      return tuitionStaffMeResponseSchema.parse(res.data).data;
    },
  });
}
