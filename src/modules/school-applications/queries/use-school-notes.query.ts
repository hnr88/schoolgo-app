'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolPrivateNote,
  SchoolPrivateNotesResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolNotesKey(applicationDocumentId: string) {
  return ['school-applications', applicationDocumentId, 'notes'] as const;
}

export function useSchoolNotes(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolNotesKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<SchoolPrivateNote[]> => {
      const { data } = await privateApi.get<SchoolPrivateNotesResponse>(
        '/api/school-private-notes',
        {
          params: {
            'filters[application][documentId][$eq]': applicationDocumentId,
            'populate[author][fields][0]': 'documentId',
            'sort[0]': 'createdAt:desc',
          },
        },
      );
      return data.data;
    },
  });
}

export function useCreateSchoolNote(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const { data } = await privateApi.post('/api/school-private-notes', {
        data: { application: applicationDocumentId, content },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolNotesKey(applicationDocumentId) });
    },
  });
}
