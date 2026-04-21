import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (documentId: string) => {
      await privateApi.delete(`/api/student-documents/${documentId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['student-documents'] });
    },
  });
}
