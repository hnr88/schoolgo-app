import type { z } from 'zod';
import type {
  agentActivityEventSchema,
  agentActivityPaginationSchema,
} from '@/modules/agent-activity/schemas/agent-activity.schema';
import type { AgentActivityEvent } from '@/modules/dashboard/types/agent-dashboard.types';

export type AgentActivityApiEvent = z.infer<typeof agentActivityEventSchema>;
export type AgentActivityPagination = z.infer<typeof agentActivityPaginationSchema>;

export interface AgentActivityHistory {
  events: AgentActivityEvent[];
  pagination: AgentActivityPagination;
}
