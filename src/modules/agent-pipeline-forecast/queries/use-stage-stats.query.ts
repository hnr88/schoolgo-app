'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  STAGE_STATS_QUERY_KEY,
  stageStatsEndpoint,
} from '@/modules/agent-pipeline-forecast/constants/agent-pipeline-forecast.constants';
import { stageStatsResponseSchema } from '@/modules/agent-pipeline-forecast/schemas/agent-pipeline-forecast.schema';
import type { StageStats } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

async function fetchStageStats(schoolDocumentId: string): Promise<StageStats> {
  const { data } = await privateApi.get<unknown>(stageStatsEndpoint(schoolDocumentId));
  return stageStatsResponseSchema.parse(data).data;
}

export function useStageStats(schoolDocumentId: string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...STAGE_STATS_QUERY_KEY, schoolDocumentId],
    queryFn: () => fetchStageStats(schoolDocumentId as string),
    enabled: isAuthenticated && Boolean(schoolDocumentId),
    staleTime: 60_000,
  });
}
