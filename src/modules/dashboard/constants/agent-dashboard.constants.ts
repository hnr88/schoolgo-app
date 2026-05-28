import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckCircle,
  CheckSquare,
  ClipboardList,
  FileText,
  Gift,
  MessageCircle,
  Send,
  Upload,
  XCircle,
} from 'lucide-react';

import type { IconComponent } from '@/modules/design-system';
import type {
  ActionItemPriority,
  DeadlineUrgencyTone,
} from '@/modules/dashboard/types/agent-dashboard.types';

export const ACTIVITY_ICON: Record<string, IconComponent> = {
  Activity,
  ArrowRight,
  AlertTriangle,
  Award,
  Calendar,
  Check,
  CheckCircle,
  CheckSquare,
  ClipboardList,
  FileText,
  Gift,
  MessageCircle,
  Send,
  Upload,
  XCircle,
};

export const ACTIVITY_COLOR: Record<string, string> = {
  status_change: 'bg-vivid-amber-soft text-vivid-amber',
  document_uploaded: 'bg-vivid-coral-soft text-vivid-coral',
  document_requested: 'bg-vivid-coral-soft text-vivid-coral',
  message_sent: 'bg-vivid-iris-soft text-vivid-iris',
  message_received: 'bg-vivid-iris-soft text-vivid-iris',
  test_results: 'bg-vivid-mint-soft text-vivid-mint',
  offer_made: 'bg-vivid-mint-soft text-vivid-mint',
  offer_extended: 'bg-vivid-mint-soft text-vivid-mint',
  offer_withdrawn: 'bg-rausch-50 text-rausch-600',
  offer_accepted: 'bg-vivid-mint-soft text-vivid-mint',
  coe_issued: 'bg-vivid-iris-soft text-vivid-iris',
  interview_scheduled: 'bg-vivid-amber-soft text-vivid-amber',
  interview_completed: 'bg-vivid-mint-soft text-vivid-mint',
  application_submitted: 'bg-vivid-coral-soft text-vivid-coral',
  application_withdrawn: 'bg-rausch-50 text-rausch-600',
  checklist_item_updated: 'bg-vivid-amber-soft text-vivid-amber',
  capacity_impact: 'bg-arches-100 text-arches-700',
};

export const ACTIVITY_COLOR_FALLBACK = 'bg-muted text-foggy';

export const DEADLINE_TONE: Record<DeadlineUrgencyTone, string> = {
  red: 'bg-rausch-100 text-rausch-700',
  amber: 'bg-arches-100 text-arches-700',
  grey: 'bg-muted text-foggy',
};

export const ACTION_PRIORITY_TONE: Record<ActionItemPriority, string> = {
  urgent: 'bg-rausch-50 text-rausch-700',
  high: 'bg-arches-50 text-arches-700',
  medium: 'bg-muted text-foggy',
};
