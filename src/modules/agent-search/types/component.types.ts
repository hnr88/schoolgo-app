import type { Portal } from '@/lib/portal-url';

export interface AgentResultsPanelProps {
  activePortal: Portal;
  className?: string;
}

export interface AgentFilterSidebarProps {
  className?: string;
  cardClassName?: string;
}

export interface AgentSearchContentProps {
  activePortal: Portal;
  className?: string;
}
