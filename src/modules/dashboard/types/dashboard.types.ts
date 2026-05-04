import type { Portal } from '@/lib/portal-url';
import type { IconComponent } from '@/modules/design-system';

export interface DashboardPlaceholderProps {
  titleKey: string;
}

export interface PortalSwitcherProps {
  activePortal: Portal;
}

export type ActionPriority = 'urgent' | 'high' | 'medium';

export interface ActionItem {
  id: string;
  text: string;
  href: string;
  priority: ActionPriority;
}

export interface PipelineCard {
  labelKey: string;
  count: number;
  change: number;
  href: string;
}

export type ActivityEventType =
  | 'status_change'
  | 'document_requested'
  | 'offer_made'
  | 'message'
  | 'test_results'
  | 'application_submitted'
  | 'offer_accepted'
  | 'coe_issued';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  text: string;
  timestamp: string;
  href: string;
}

export type DeadlineUrgency = 'urgent' | 'high' | 'normal';

export interface Deadline {
  id: string;
  date: string;
  label: string;
  description: string;
  urgency: DeadlineUrgency;
  href: string;
}

export type NavItem = {
  href: string;
  icon: IconComponent;
  labelKey: string;
  agentOnly: boolean;
};

export type PipelineCardStyle = {
  icon: IconComponent;
  bg: string;
  iconColor: string;
};

export type QuickAction = {
  href: string;
  icon: IconComponent;
  labelKey: string;
  bg: string;
  color: string;
};

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
