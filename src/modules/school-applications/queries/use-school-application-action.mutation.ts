'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { schoolApplicationKey } from '@/modules/school-applications/queries/use-school-application.query';
import { SCHOOL_APPLICATIONS_QUERY_KEY } from '@/modules/school-applications/queries/use-school-applications.query';
import type { SchoolActionKey } from '@/modules/school-applications/types/school-applications.types';

const PUT_ACTIONS: SchoolActionKey[] = ['exam-outcome'];

export function useSchoolApplicationAction(documentId: string, action: SchoolActionKey) {
  const queryClient = useQueryClient();
  const method = PUT_ACTIONS.includes(action) ? 'put' : 'post';

  return useMutation({
    mutationFn: async (payload?: Record<string, unknown>) => {
      const url = `/api/applications/${documentId}/${action}`;
      const body = payload ? { data: payload } : undefined;
      const { data } =
        method === 'put'
          ? await privateApi.put(url, body)
          : await privateApi.post(url, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolApplicationKey(documentId) });
      queryClient.invalidateQueries({ queryKey: SCHOOL_APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['school-applications', documentId, 'timeline'] });
    },
  });
}
