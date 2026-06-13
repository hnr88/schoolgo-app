import type { z } from 'zod';
import type {
  forecastCountsSchema,
  forecastItemSchema,
  forecastRiskSchema,
  pipelineForecastResponseSchema,
  stageStatSchema,
  stageStatsResponseSchema,
} from '@/modules/agent-pipeline-forecast/schemas/agent-pipeline-forecast.schema';

export type ForecastRisk = z.infer<typeof forecastRiskSchema>;
export type ForecastItem = z.infer<typeof forecastItemSchema>;
export type ForecastCounts = z.infer<typeof forecastCountsSchema>;
export type PipelineForecast = z.infer<typeof pipelineForecastResponseSchema>;

export type StageStat = z.infer<typeof stageStatSchema>;
export type StageStats = z.infer<typeof stageStatsResponseSchema>['data'];

export interface SchoolOption {
  documentId: string;
  name: string | null;
}
