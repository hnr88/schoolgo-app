'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { schoolVettingKey } from '@/modules/school-applications/queries/use-school-vetting.query';
import type { AttachServiceFormValues } from '@/modules/school-applications/schemas/attach-service.schema';
import type {
  AttachServiceResponse,
  AttachServiceResult,
} from '@/modules/school-applications/types/school-applications.types';

export function useAttachService(documentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AttachServiceFormValues): Promise<AttachServiceResult> => {
      const { data } = await privateApi.post<AttachServiceResponse>(
        `/api/applications/${documentId}/attach-service`,
        { data: values },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school', 'invoices'] });
      queryClient.invalidateQueries({ queryKey: schoolVettingKey(documentId) });
    },
  });
}
