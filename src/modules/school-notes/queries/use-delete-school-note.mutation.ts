'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_NOTES_QUERY_KEY } from '@/modules/school-notes/queries/use-school-notes.query';
import { deleteSchoolNoteResponseSchema } from '@/modules/school-notes/schemas/school-note.schema';

export function useDeleteSchoolNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.delete<unknown>(
        `/api/school-private-notes/${documentId}`,
      );
      return deleteSchoolNoteResponseSchema.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_NOTES_QUERY_KEY });
    },
  });
}
