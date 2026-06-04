import {
  AlertTriangle,
  ArrowRightLeft,
  Award,
  CalendarClock,
  CalendarX,
  CheckCircle,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileCheck,
  FileQuestion,
  FileText,
  Gift,
  GraduationCap,
  ListChecks,
  LogOut,
  MessageSquare,
  Send,
  ShieldOff,
  Timer,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type {
  NotificationEventType,
  NotificationPriority,
  NotificationTimeGroup,
} from '../types/notification.types';

export const NOTIFICATIONS_DEFAULT_PAGE_SIZE = 50;

export const UNREAD_COUNT_REFETCH_INTERVAL_MS = 60_000;

export const NOTIFICATION_EVENT_FILTER_ALL = 'all';

export const NOTIFICATION_EVENT_FILTER_OPTIONS: NotificationEventType[] = [
  'application_submitted',
  'status_changed',
  'documents_requested',
  'documents_uploaded',
  'message_received',
  'offer_made',
  'offer_deadline_approaching',
  'interview_scheduled',
  'coe_issued',
  'enrolled',
];

export const NOTIFICATION_EVENT_ICON: Record<NotificationEventType, LucideIcon> = {
  application_submitted: Send,
  application_received: FileText,
  status_changed: ArrowRightLeft,
  documents_requested: FileQuestion,
  documents_uploaded: FileCheck,
  message_received: MessageSquare,
  offer_made: Gift,
  offer_accepted: CheckCircle,
  offer_deadline_approaching: CalendarClock,
  offer_deadline_expired: CalendarX,
  application_declined: XCircle,
  application_withdrawn: LogOut,
  interview_scheduled: CalendarClock,
  coe_issued: Award,
  enrolled: GraduationCap,
  intake_closed: Timer,
  template_updated: ClipboardList,
  capacity_low: AlertTriangle,
  checklist_item_updated: ListChecks,
  test_results_ready: ClipboardCheck,
  application_viewed: Eye,
  weekly_pipeline_summary: FileText,
  score_revoked: ShieldOff,
};

export const NOTIFICATION_PRIORITY_DOT: Record<NotificationPriority, string> = {
  high: 'bg-vivid-coral',
  medium: 'bg-vivid-amber',
  low: 'bg-foggy',
};

export const GROUP_ORDER: NotificationTimeGroup[] = [
  'today',
  'yesterday',
  'this_week',
  'older',
];

export const GROUP_LABEL_KEY: Record<NotificationTimeGroup, string> = {
  today: 'groupToday',
  yesterday: 'groupYesterday',
  this_week: 'groupThisWeek',
  older: 'groupOlder',
};
