export type AgentPartnershipStatus = 'pending' | 'approved' | 'denied';

export interface AgentPartnership {
  documentId: string;
  agentName: string;
  agentDocumentId: string;
  status: AgentPartnershipStatus;
  requestedAt: string;
}

export interface InviteAgentPayload {
  agentDocumentId: string;
}
