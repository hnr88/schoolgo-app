import {
  ArrowRight,
  Award,
  CalendarCheck,
  CalendarClock,
  CheckCircle,
  ClipboardCheck,
  FileQuestion,
  FileUp,
  Gift,
  ListChecks,
  MessageSquare,
  Send,
  Undo2,
  Users,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ParentTimelineEventType } from '@/modules/applications/types/parent-timeline.types';

export const PARENT_TIMELINE_EVENT_ICON: Record<ParentTimelineEventType, LucideIcon> = {
  status_change: ArrowRight,
  document_uploaded: FileUp,
  document_requested: FileQuestion,
  message_sent: MessageSquare,
  message_received: MessageSquare,
  test_results: ClipboardCheck,
  offer_made: Gift,
  offer_extended: Gift,
  offer_withdrawn: XCircle,
  offer_accepted: CheckCircle,
  coe_issued: Award,
  interview_scheduled: CalendarClock,
  interview_completed: CalendarCheck,
  application_submitted: Send,
  application_withdrawn: Undo2,
  checklist_item_updated: ListChecks,
  capacity_impact: Users,
};

export const PARENT_TIMELINE_DEFAULT_PAGE_SIZE = 100;
