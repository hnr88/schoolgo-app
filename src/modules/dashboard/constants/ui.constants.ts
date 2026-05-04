import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  FileQuestion,
  FilePlus,
  FileText,
  Gift,
  LayoutDashboard,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

import type {
  ActivityEventType,
  DeadlineUrgency,
  NavItem,
  PipelineCardStyle,
  QuickAction,
} from '../types/dashboard.types';

export const ROUTE_TITLE_MAP: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/dashboard/students': 'students',
  '/dashboard/applications': 'applications',
  '/dashboard/pipeline': 'pipeline',
  '/dashboard/search': 'searchSchools',
  '/dashboard/messages': 'messages',
  '/dashboard/settings': 'settings',
  '/dashboard/profile': 'profile',
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard', agentOnly: false },
  { href: '/dashboard/students', icon: Users, labelKey: 'students', agentOnly: true },
  { href: '/dashboard/applications', icon: FileText, labelKey: 'applications', agentOnly: true },
  { href: '/dashboard/pipeline', icon: BarChart3, labelKey: 'pipeline', agentOnly: true },
  { href: '/dashboard/search', icon: Search, labelKey: 'searchSchools', agentOnly: true },
  { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages', agentOnly: true },
];

export const EVENT_ICON: Record<ActivityEventType, typeof ArrowRight> = {
  status_change: ArrowRight,
  document_requested: FileQuestion,
  offer_made: Gift,
  message: MessageSquare,
  test_results: ClipboardCheck,
  application_submitted: Send,
  offer_accepted: CheckCircle,
  coe_issued: Award,
};

export const EVENT_COLOR: Record<ActivityEventType, string> = {
  status_change: 'bg-vivid-amber-soft text-vivid-amber',
  document_requested: 'bg-vivid-coral-soft text-vivid-coral',
  offer_made: 'bg-vivid-mint-soft text-vivid-mint',
  message: 'bg-vivid-iris-soft text-vivid-iris',
  test_results: 'bg-vivid-mint-soft text-vivid-mint',
  application_submitted: 'bg-vivid-coral-soft text-vivid-coral',
  offer_accepted: 'bg-vivid-mint-soft text-vivid-mint',
  coe_issued: 'bg-vivid-iris-soft text-vivid-iris',
};

export const DATE_STYLE: Record<DeadlineUrgency, string> = {
  urgent: 'bg-rausch-100 text-rausch-700',
  high: 'bg-arches-100 text-arches-700',
  normal: 'bg-muted text-foggy',
};

export const CARD_STYLE: Record<string, PipelineCardStyle> = {
  activeStudents: { icon: Users, bg: 'bg-vivid-coral-soft', iconColor: 'text-vivid-coral' },
  appsInProgress: { icon: FileText, bg: 'bg-vivid-amber-soft', iconColor: 'text-vivid-amber' },
  offersReceived: { icon: Gift, bg: 'bg-vivid-mint-soft', iconColor: 'text-vivid-mint' },
  enrolledThisTerm: { icon: ShieldCheck, bg: 'bg-vivid-iris-soft', iconColor: 'text-vivid-iris' },
};

export const QUICK_ACTIONS: QuickAction[] = [
  { href: '/dashboard/students/new', icon: UserPlus, labelKey: 'addStudent', bg: 'bg-vivid-coral-soft', color: 'text-vivid-coral' },
  { href: '/dashboard/applications', icon: FilePlus, labelKey: 'reviewApplications', bg: 'bg-vivid-amber-soft', color: 'text-vivid-amber' },
  { href: '/dashboard/search', icon: Search, labelKey: 'searchSchools', bg: 'bg-vivid-mint-soft', color: 'text-vivid-mint' },
];
