import type {
  StrapiListResponse,
  StrapiSingleResponse,
} from '@/modules/students/types/student.types';

export type AgentShareStatus = 'active' | 'revoked';

export type AgentQeacValidationStatus = 'none' | 'pending' | 'verified';

export interface AgentShareUser {
  firstName: string | null;
  lastName: string | null;
}

export interface AgentShareAgent {
  documentId: string;
  companyName: string;
  verified: boolean;
  qeacValidationStatus: AgentQeacValidationStatus;
  user: AgentShareUser | null;
}

export interface StudentAgentShare {
  documentId: string;
  status: AgentShareStatus;
  sharedAt: string | null;
  revokedAt: string | null;
  note: string | null;
  agent: AgentShareAgent | null;
}

export type StudentAgentSharesResponse = StrapiListResponse<StudentAgentShare>;
export type StudentAgentShareResponse = StrapiSingleResponse<StudentAgentShare>;

export interface ShareWithAgentInput {
  agentDocumentId: string;
  note?: string;
}

export type { ShareWithAgentFormValues } from '@/modules/students/schemas/share-with-agent.schema';

export interface AgentRepresentationView {
  activeShare: StudentAgentShare | null;
  pastShares: StudentAgentShare[];
  hasRepresentation: boolean;
  isLoading: boolean;
  isError: boolean;
}
