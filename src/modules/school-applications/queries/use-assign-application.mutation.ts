'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { schoolApplicationKey } from '@/modules/school-applications/queries/use-school-application.query';
import { SCHOOL_APPLICATIONS_QUERY_KEY } from '@/modules/school-applications/queries/use-school-applications.query';
import type {
  AssignApplicationResponse,
  AssignApplicationResult,
} from '@/modules/school-applications/types/school-applications.types';

export function useAssignApplication(documentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staffDocumentId: string | null): Promise<AssignApplicationResult> => {
      const { data } = await privateApi.put<AssignApplicationResponse>(
        `/api/school-staffs/me/applications/${documentId}/assign`,
        { data: { staffDocumentId } },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolApplicationKey(documentId) });
      queryClient.invalidateQueries({ queryKey: SCHOOL_APPLICATIONS_QUERY_KEY });
    },
  });
}
