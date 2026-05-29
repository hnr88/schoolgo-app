import type { AgentPartnership } from '@/modules/school-partnerships/types/school-partnerships.types';

export interface PartnershipTableProps {
  partnerships: AgentPartnership[];
  variant: 'active' | 'pending';
  pendingActionId: string | null;
  onApprove: (documentId: string) => void;
  onDeny: (documentId: string) => void;
  onRemove: (partnership: AgentPartnership) => void;
}
