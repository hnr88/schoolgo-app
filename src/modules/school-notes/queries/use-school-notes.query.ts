'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { schoolNotesResponseSchema } from '@/modules/school-notes/schemas/school-note.schema';
import type { SchoolNotesResponse } from '@/modules/school-notes/types/school-notes.types';

export const SCHOOL_NOTES_QUERY_KEY = ['school-notes', 'mine'] as const;

export function useSchoolNotes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SCHOOL_NOTES_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolNotesResponse> => {
      const { data } = await privateApi.get<unknown>('/api/school-private-notes/mine');
      return schoolNotesResponseSchema.parse(data);
    },
  });
}
