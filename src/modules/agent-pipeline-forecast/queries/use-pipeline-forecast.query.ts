'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  PIPELINE_FORECAST_ENDPOINT,
  PIPELINE_FORECAST_QUERY_KEY,
} from '@/modules/agent-pipeline-forecast/constants/agent-pipeline-forecast.constants';
import { pipelineForecastResponseSchema } from '@/modules/agent-pipeline-forecast/schemas/agent-pipeline-forecast.schema';
import type { PipelineForecast } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

const EMPTY_FORECAST: PipelineForecast = {
  data: [],
  meta: {
    counts: { overdue: 0, watch: 0, onTrack: 0 },
    totalActive: 0,
    generatedAt: new Date(0).toISOString(),
  },
};

async function fetchPipelineForecast(): Promise<PipelineForecast> {
  const { data } = await privateApi.get<unknown>(PIPELINE_FORECAST_ENDPOINT);
  const parsed = pipelineForecastResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[usePipelineForecast] unexpected response shape', parsed.error.issues);
    return EMPTY_FORECAST;
  }
  return parsed.data;
}

export function usePipelineForecast() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PIPELINE_FORECAST_QUERY_KEY,
    queryFn: fetchPipelineForecast,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
