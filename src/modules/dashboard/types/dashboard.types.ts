import type { ComponentProps, ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';
import type { IconComponent } from '@/modules/design-system';
import type { Link } from '@/i18n/navigation';

export interface BreadcrumbItemEntry {
  label: string;
  href?: ComponentProps<typeof Link>['href'];
}

export interface DashboardCardBoundaryProps {
  /** Localized message shown when a wrapped card throws during render. */
  fallbackMessage: string;
  /** Localized label for the retry button that remounts the wrapped card. */
  retryLabel: string;
  children: ReactNode;
}

export interface DashboardCardBoundaryState {
  hasError: boolean;
}

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
};

export type NavGroup = {
  labelKey: string;
  items: NavItem[];
};

export type PortalNav = {
  home: string;
  items?: NavItem[];
  groups?: NavGroup[];
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
