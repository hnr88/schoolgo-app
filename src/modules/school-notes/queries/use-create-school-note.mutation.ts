'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_NOTES_QUERY_KEY } from '@/modules/school-notes/queries/use-school-notes.query';
import { createSchoolNoteResponseSchema } from '@/modules/school-notes/schemas/school-note.schema';

export function useCreateSchoolNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const { data } = await privateApi.post<unknown>('/api/school-private-notes', {
        data: { content },
      });
      return createSchoolNoteResponseSchema.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_NOTES_QUERY_KEY });
    },
  });
}
