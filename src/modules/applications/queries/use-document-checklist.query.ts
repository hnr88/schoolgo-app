'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  documentChecklistResponseSchema,
  type DocumentChecklist,
} from '@/modules/applications/schemas/document-checklist.schema';

async function fetchDocumentChecklist(applicationDocumentId: string): Promise<DocumentChecklist> {
  const { data } = await privateApi.get(
    `/api/applications/${applicationDocumentId}/document-checklist`
  );
  return documentChecklistResponseSchema.parse(data).data;
}

export function useDocumentChecklist(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', applicationDocumentId, 'document-checklist'],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: () => fetchDocumentChecklist(applicationDocumentId),
    staleTime: 60_000,
  });
}
