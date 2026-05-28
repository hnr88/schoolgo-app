import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Bookmark,
  CheckCircle,
  ClipboardCheck,
  CreditCard,
  FileQuestion,
  FilePlus,
  FileText,
  FolderOpen,
  GraduationCap,
  Gift,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Trophy,
  UserCircle,
  UserPlus,
  Users,
} from 'lucide-react';

import type { Portal } from '@/lib/portal-url';

import type {
  ActivityEventType,
  DeadlineUrgency,
  PipelineCardStyle,
  PortalNav,
  QuickAction,
} from '../types/dashboard.types';

export const ROUTE_TITLE_MAP: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/dashboard/notifications': 'notifications',
  '/dashboard/students': 'students',
  '/dashboard/applications': 'applications',
  '/dashboard/offers': 'offers',
  '/dashboard/documents': 'documents',
  '/dashboard/pipeline': 'pipeline',
  '/dashboard/search': 'searchSchools',
  '/dashboard/saved-schools': 'savedSchools',
  '/dashboard/saved-searches': 'savedSearches',
  '/dashboard/results': 'results',
  '/dashboard/messages': 'messages',
  '/dashboard/settings': 'settings',
  '/dashboard/profile': 'profile',
};

export const PORTAL_NAV: Record<Portal, PortalNav> = {
  agent: {
    home: '/dashboard',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
      { href: '/dashboard/notifications', icon: Bell, labelKey: 'notifications' },
      { href: '/dashboard/students', icon: Users, labelKey: 'students' },
      { href: '/dashboard/applications', icon: FileText, labelKey: 'applications' },
      { href: '/dashboard/offers', icon: Gift, labelKey: 'offers' },
      { href: '/dashboard/documents', icon: FolderOpen, labelKey: 'documents' },
      { href: '/dashboard/pipeline', icon: BarChart3, labelKey: 'pipeline' },
      { href: '/dashboard/search', icon: Search, labelKey: 'searchSchools' },
      { href: '/dashboard/saved-schools', icon: Heart, labelKey: 'savedSchools' },
      { href: '/dashboard/saved-searches', icon: Bookmark, labelKey: 'savedSearches' },
      { href: '/dashboard/results', icon: Trophy, labelKey: 'results' },
      { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages' },
      { href: '/dashboard/profile', icon: UserCircle, labelKey: 'profile' },
      { href: '/dashboard/settings', icon: Settings, labelKey: 'settings' },
    ],
  },
  school: {
    home: '/dashboard',
    items: [{ href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' }],
  },
  parent: {
    home: '/parent/dashboard',
    items: [
      { href: '/parent/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
      { href: '/parent/notifications', icon: Bell, labelKey: 'notifications' },
      { href: '/parent/students', icon: GraduationCap, labelKey: 'students' },
      { href: '/parent/applications', icon: FileText, labelKey: 'applications' },
      { href: '/parent/saved-schools', icon: Heart, labelKey: 'savedSchools' },
      { href: '/parent/saved-searches', icon: Bookmark, labelKey: 'savedSearches' },
      { href: '/parent/results', icon: Trophy, labelKey: 'results' },
      { href: '/parent/settings', icon: Settings, labelKey: 'settings' },
      { href: '/parent/payments', icon: CreditCard, labelKey: 'payments' },
    ],
  },
};

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
