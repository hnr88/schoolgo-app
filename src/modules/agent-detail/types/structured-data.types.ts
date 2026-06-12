import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';
import type { Portal } from '@/lib/portal-url';

export interface AgentStructuredDataProps {
  agent: AgentDetail;
  activePortal: Portal;
  locale?: string;
}
