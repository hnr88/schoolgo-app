import type { z } from 'zod';
import type {
  agentPerformanceResponseSchema,
  agentPerformanceRowSchema,
  agentPerformanceTotalsSchema,
} from '@/modules/school-agent-performance/schemas/agent-performance.schema';

export type AgentPerformanceRow = z.infer<typeof agentPerformanceRowSchema>;
export type AgentPerformanceTotals = z.infer<typeof agentPerformanceTotalsSchema>;
export type AgentPerformance = z.infer<typeof agentPerformanceResponseSchema>['data'];

export type PerformanceSortKey = 'submitted' | 'offerRate' | 'acceptanceRate';
export type PerformanceSortDirection = 'asc' | 'desc';
