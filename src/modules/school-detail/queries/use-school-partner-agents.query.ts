'use client';

import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { publicApi } from '@/lib/axios';
import { schoolPartnerAgentsResponseSchema } from '@/modules/school-detail/schemas/school-partner-agents.schema';
import type { SchoolPartnerAgent } from '@/modules/school-detail/types/school-partner-agents.types';

export function useSchoolPartnerAgents(schoolDocumentId: string | undefined) {
  return useQuery<SchoolPartnerAgent[]>({
    queryKey: ['school-partner-agents', schoolDocumentId],
    enabled: Boolean(schoolDocumentId),
    queryFn: async () => {
      try {
        const res = await publicApi.get<unknown>(
          `/api/agent-partnerships/school/${schoolDocumentId}/public`,
        );
        return schoolPartnerAgentsResponseSchema.parse(res.data).data;
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) return [];
        throw err;
      }
    },
  });
}
