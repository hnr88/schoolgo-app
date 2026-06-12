import type { z } from 'zod';
import type {
  agentLeadSchema,
  agentLeadsResponseSchema,
  leadStatusSchema,
} from '@/modules/agent-leads/schemas/agent-leads.schema';

export type LeadStatus = z.infer<typeof leadStatusSchema>;
export type AgentLead = z.infer<typeof agentLeadSchema>;
export type AgentLeadsResponse = z.infer<typeof agentLeadsResponseSchema>;

export interface UpdateLeadStatusPayload {
  documentId: string;
  status: LeadStatus;
}
