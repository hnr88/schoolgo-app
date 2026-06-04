'use client';

import { useParentApplications } from '@/modules/applications';
import type { ParentApplication } from '@/modules/applications';

export function useApplicationStatusBySchool(
  schoolDocumentId: string,
): ParentApplication | undefined {
  const { data } = useParentApplications({ pageSize: 100 });

  return (data?.data ?? []).find(
    (app) => app.school.documentId === schoolDocumentId,
  );
}
