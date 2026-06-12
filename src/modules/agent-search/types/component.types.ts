import type { Portal } from '@/lib/portal-url';
import type { SearchCapability } from '@/modules/unified-search';

export interface AgentResultsPanelProps {
  activePortal: Portal;
  capability: SearchCapability;
  className?: string;
}

export interface AgentFilterSidebarProps {
  capability: SearchCapability;
  className?: string;
  cardClassName?: string;
}

export interface AgentSearchContentProps {
  activePortal: Portal;
  className?: string;
}
