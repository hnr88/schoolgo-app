export type AgentPartnershipStatus = 'pending' | 'active' | 'denied' | 'removed';

export type PartnershipRequestedBy = 'agent' | 'school';

export interface PartnershipAgent {
  documentId: string;
  companyName: string;
  qeacNumber: string | null;
  verified: boolean;
  countryOfOperation: string | null;
  contactName: string;
}

export interface AgentPartnership {
  documentId: string;
  status: AgentPartnershipStatus;
  requestedBy: PartnershipRequestedBy;
  approvedAt: string | null;
  removedAt: string | null;
  createdAt: string;
  agent: PartnershipAgent | null;
}

export interface AgentSearchResult {
  documentId: string;
  companyName: string;
  qeacNumber: string | null;
  countryOfOperation: string | null;
  contactName: string;
}

export interface InviteAgentPayload {
  agentDocumentId: string;
}

export interface StrapiCollection<T> {
  data: T[];
  meta: Record<string, unknown>;
}
