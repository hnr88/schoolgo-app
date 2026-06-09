import type { z } from 'zod';
import type {
  agentAnalyticsResponseSchema,
  analyticsTotalsSchema,
  schoolAnalyticsRowSchema,
} from '@/modules/agent-analytics/schemas/agent-analytics.schema';

export type SchoolAnalyticsRow = z.infer<typeof schoolAnalyticsRowSchema>;
export type AnalyticsTotals = z.infer<typeof analyticsTotalsSchema>;
export type AgentAnalytics = z.infer<typeof agentAnalyticsResponseSchema>['data'];

export type AnalyticsSortKey = 'submitted' | 'offerRate';
export type AnalyticsSortDirection = 'asc' | 'desc';
