'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  ApplicationTemplate,
  StrapiList,
} from '@/modules/school-templates/types/school-templates.types';

export function useSchoolTemplates(schoolDocumentId: string | undefined) {
  return useQuery<ApplicationTemplate[]>({
    queryKey: ['school-templates', 'list', schoolDocumentId],
    enabled: Boolean(schoolDocumentId),
    queryFn: async () => {
      const res = await privateApi.get<StrapiList<ApplicationTemplate>>(
        `/api/application-templates/by-school/${schoolDocumentId}`,
      );
      return res.data.data;
    },
  });
}
