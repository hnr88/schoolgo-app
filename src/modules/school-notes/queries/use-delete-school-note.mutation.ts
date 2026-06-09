'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_NOTES_QUERY_KEY } from '@/modules/school-notes/queries/use-school-notes.query';

export function useDeleteSchoolNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.delete(`/api/school-private-notes/${documentId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_NOTES_QUERY_KEY });
    },
  });
}
