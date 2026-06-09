'use client';

import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { normalizeTemplateData } from '@/modules/school-templates';
import { activeTemplateResponseSchema } from '@/modules/school-detail/schemas/school-requirements.schema';
import type { SchoolRequirements } from '@/modules/school-detail/types/school-requirements.types';

export function useSchoolRequirements(schoolDocumentId: string | undefined) {
  return useQuery<SchoolRequirements | null>({
    queryKey: ['school-requirements', schoolDocumentId],
    enabled: Boolean(schoolDocumentId),
    queryFn: async () => {
      try {
        const res = await privateApi.get<unknown>(
          `/api/application-templates/active/${schoolDocumentId}`,
        );
        const parsed = activeTemplateResponseSchema.parse(res.data);
        return {
          version: parsed.data.version,
          publishedAt: parsed.data.publishedAt ?? null,
          templateData: normalizeTemplateData(parsed.data.templateData),
        };
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
  });
}
