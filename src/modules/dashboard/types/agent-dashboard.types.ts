import type { IconComponent } from '@/modules/design-system';

export interface StrapiEnvelope<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface DashboardStat {
  count: number;
  delta: number;
}

export interface AgentDashboardStats {
  activeStudents: DashboardStat;
  appsInProgress: DashboardStat;
  offersReceived: DashboardStat;
  enrolledThisTerm: DashboardStat;
  unreadNotifications: number;
  agentVerified: boolean;
  verificationStatus: {
    emailVerified: boolean;
    profileCompleted: boolean;
    adminReview: string;
  };
}

export interface ActivityFeedApplication {
  documentId: string;
  status: string;
  school: { documentId: string; name: string } | null;
  student: { documentId: string; firstName: string; lastName: string } | null;
}

export interface AgentActivityEvent {
  documentId: string;
  eventType: string;
  description: string;
  actorRole: string;
  createdAt: string;
  iconHint: string;
  application: ActivityFeedApplication | null;
}

export type DeadlineUrgencyTone = 'red' | 'amber' | 'grey';

export interface AgentDeadlineItem {
  type: 'offer_deadline' | 'passport_expiry';
  applicationDocumentId: string | null;
  studentName: string | null;
  schoolName: string | null;
  date: string | null;
  urgency: DeadlineUrgencyTone;
  description: string;
}

export interface AgentDeadlinesPayload {
  items: AgentDeadlineItem[];
  overflowCount: number;
}

export type ActionItemPriority = 'urgent' | 'high' | 'medium';

export interface AgentActionItem {
  id: string;
  type: string;
  priority: ActionItemPriority;
  studentName: string | null;
  schoolName: string | null;
  deadline: string | null;
  applicationDocumentId: string | null;
  description: string;
}

export interface AgentActionItemsPayload {
  items: AgentActionItem[];
  overflowCount: number;
}

export type AgentDashboardSection = 'stats' | 'activity' | 'deadlines' | 'actionItems';

export interface AgentDashboardData {
  stats: AgentDashboardStats | null;
  activity: AgentActivityEvent[] | null;
  deadlines: AgentDeadlinesPayload | null;
  actionItems: AgentActionItemsPayload | null;
  /** Sections whose fetch rejected — used to render per-section error states. */
  sectionErrors: Record<AgentDashboardSection, boolean>;
}

export interface StatCardView {
  labelKey: string;
  count: number;
  delta: number;
  href: string;
}

export interface StatTileView {
  labelKey: string;
  count: number;
  delta: number;
  href: string;
  icon: IconComponent;
  /** soft-bg + strong-text OKLCH token classes for the StatTile icon chip */
  iconClassName: string;
}

export interface ActivityRowView {
  id: string;
  icon: IconComponent;
  colorClass: string;
  text: string;
  timestamp: string;
  href: string;
}

export interface DeadlineRowView {
  id: string;
  day: string;
  month: string;
  toneClass: string;
  label: string;
  description: string;
  href: string;
}

export interface ActionRowView {
  id: string;
  text: string;
  priority: ActionItemPriority;
  href: string;
}
