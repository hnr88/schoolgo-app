import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Banknote,
  Bookmark,
  Building2,
  Calculator,
  CalendarDays,
  ChartLine,
  CheckCircle,
  ClipboardCheck,
  ClipboardList,
  Columns3,
  FileQuestion,
  FilePlus,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Gauge,
  GraduationCap,
  Gift,
  Handshake,
  Heart,
  History,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LayoutTemplate,
  ListChecks,
  MessageCircleQuestion,
  MessageSquare,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  StickyNote,
  Target,
  TrendingUp,
  Trophy,
  UserCircle,
  UserPlus,
  Users,
  Video,
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
  '/dashboard/partnerships': 'partnerships',
  '/dashboard/templates': 'templates',
  '/dashboard/staff': 'staff',
  '/dashboard/capacity': 'capacity',
  '/dashboard/pre-enrolment': 'preEnrolment',
  '/dashboard/analytics': 'analytics',
  '/dashboard/follow-ups': 'followUps',
  '/dashboard/compliance': 'compliance',
  '/dashboard/activity': 'activity',
  '/dashboard/notes': 'notes',
  '/dashboard/tuition': 'tuition',
  '/dashboard/agent-performance': 'agentPerformance',
  '/dashboard/document-requests': 'documentRequests',
  '/dashboard/leads': 'leads',
};

export const PORTAL_NAV: Record<Portal, PortalNav> = {
  agent: {
    home: '/dashboard',
    groups: [
      {
        labelKey: 'groupOverview',
        items: [
          { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
          { href: '/dashboard/activity', icon: History, labelKey: 'activity' },
        ],
      },
      {
        labelKey: 'groupStudents',
        items: [
          { href: '/dashboard/students', icon: Users, labelKey: 'students' },
          { href: '/dashboard/documents', icon: FolderOpen, labelKey: 'documents' },
          { href: '/dashboard/results', icon: Trophy, labelKey: 'results' },
          { href: '/dashboard/compliance', icon: ShieldCheck, labelKey: 'compliance' },
        ],
      },
      {
        labelKey: 'groupApplications',
        items: [
          { href: '/dashboard/applications', icon: FileText, labelKey: 'applications' },
          { href: '/dashboard/offers', icon: Gift, labelKey: 'offers' },
          { href: '/dashboard/pipeline', icon: BarChart3, labelKey: 'pipeline' },
          { href: '/dashboard/forecast', icon: TrendingUp, labelKey: 'forecast' },
          { href: '/dashboard/application-qa', icon: ClipboardCheck, labelKey: 'applicationQa' },
          { href: '/dashboard/follow-ups', icon: ListChecks, labelKey: 'followUps' },
          { href: '/dashboard/analytics', icon: ChartLine, labelKey: 'analytics' },
        ],
      },
      {
        labelKey: 'groupSchools',
        items: [
          { href: '/dashboard/search', icon: Search, labelKey: 'searchSchools' },
          { href: '/dashboard/saved-schools', icon: Heart, labelKey: 'savedSchools' },
          { href: '/dashboard/saved-searches', icon: Bookmark, labelKey: 'savedSearches' },
          { href: '/dashboard/partnerships', icon: Handshake, labelKey: 'agentPartnerships' },
        ],
      },
      {
        labelKey: 'groupEarnings',
        items: [
          { href: '/dashboard/training', icon: GraduationCap, labelKey: 'training' },
        ],
      },
      {
        labelKey: 'groupComms',
        items: [
          { href: '/dashboard/leads', icon: Inbox, labelKey: 'leads' },
          { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages' },
          { href: '/dashboard/notifications', icon: Bell, labelKey: 'notifications' },
        ],
      },
      {
        labelKey: 'groupAccount',
        items: [
          { href: '/dashboard/profile', icon: UserCircle, labelKey: 'profile' },
          { href: '/dashboard/settings', icon: Settings, labelKey: 'settings' },
        ],
      },
    ],
  },
  school: {
    home: '/dashboard',
    groups: [
      {
        labelKey: 'groupOverview',
        items: [
          { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
          { href: '/dashboard/analytics', icon: BarChart3, labelKey: 'analytics' },
          { href: '/dashboard/agent-performance', icon: Award, labelKey: 'agentPerformance' },
        ],
      },
      {
        labelKey: 'groupApplications',
        items: [
          { href: '/dashboard/applications', icon: FileText, labelKey: 'applications' },
          { href: '/dashboard/offers', icon: Gift, labelKey: 'offers' },
          { href: '/dashboard/applicant-fit', icon: Target, labelKey: 'applicantFit' },
          { href: '/dashboard/pre-enrolment', icon: ClipboardCheck, labelKey: 'preEnrolment' },
          { href: '/dashboard/document-requests', icon: FileQuestion, labelKey: 'documentRequests' },
          { href: '/dashboard/compliance', icon: ShieldCheck, labelKey: 'compliance' },
        ],
      },
      {
        labelKey: 'groupPartnerships',
        items: [
          { href: '/dashboard/partnerships', icon: Handshake, labelKey: 'partnerships' },
          { href: '/dashboard/templates', icon: LayoutTemplate, labelKey: 'templates' },
        ],
      },
      {
        labelKey: 'groupFinance',
        items: [
          { href: '/dashboard/growth-services', icon: TrendingUp, labelKey: 'growthServices' },
        ],
      },
      {
        labelKey: 'groupSchool',
        items: [
          { href: '/dashboard/profile', icon: Building2, labelKey: 'profile' },
          { href: '/dashboard/capacity', icon: FileSpreadsheet, labelKey: 'capacity' },
          { href: '/dashboard/capacity-planner', icon: Gauge, labelKey: 'capacityPlanner' },
          { href: '/dashboard/tuition', icon: Banknote, labelKey: 'tuition' },
          { href: '/dashboard/staff', icon: Users, labelKey: 'staff' },
          { href: '/dashboard/reputation', icon: Star, labelKey: 'reputation' },
        ],
      },
      {
        labelKey: 'groupComms',
        items: [
          { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages' },
          { href: '/dashboard/questions', icon: MessageCircleQuestion, labelKey: 'questions' },
          { href: '/dashboard/notifications', icon: Bell, labelKey: 'notifications' },
          { href: '/dashboard/notes', icon: StickyNote, labelKey: 'notes' },
        ],
      },
      {
        labelKey: 'groupAccount',
        items: [{ href: '/dashboard/settings', icon: Settings, labelKey: 'settings' }],
      },
    ],
  },
  parent: {
    home: '/parent/dashboard',
    groups: [
      {
        labelKey: 'groupOverview',
        items: [
          { href: '/parent/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
          { href: '/parent/calendar', icon: CalendarDays, labelKey: 'calendar' },
        ],
      },
      {
        labelKey: 'groupStudents',
        items: [
          { href: '/parent/students', icon: GraduationCap, labelKey: 'students' },
          { href: '/parent/family-overview', icon: LayoutGrid, labelKey: 'familyOverview' },
          { href: '/parent/documents', icon: FolderOpen, labelKey: 'documents' },
          { href: '/parent/tests', icon: ClipboardCheck, labelKey: 'tests' },
          { href: '/parent/results', icon: Trophy, labelKey: 'results' },
        ],
      },
      {
        labelKey: 'groupApplications',
        items: [
          { href: '/parent/applications', icon: FileText, labelKey: 'applications' },
          { href: '/parent/offers', icon: Gift, labelKey: 'offers' },
          { href: '/parent/interviews', icon: Video, labelKey: 'interviews' },
          { href: '/parent/enrolment-readiness', icon: ListChecks, labelKey: 'enrolmentReadiness' },
        ],
      },
      {
        labelKey: 'groupSchools',
        items: [
          { href: '/parent/search', icon: Search, labelKey: 'searchSchools' },
          { href: '/parent/search?mode=agents', icon: Users, labelKey: 'findAgent' },
          { href: '/parent/saved-schools', icon: Heart, labelKey: 'savedSchools' },
          { href: '/parent/compare', icon: Columns3, labelKey: 'compare' },
          { href: '/parent/shortlists', icon: ClipboardList, labelKey: 'shortlists' },
          { href: '/parent/cost-estimator', icon: Calculator, labelKey: 'costEstimator' },
          { href: '/parent/scholarships', icon: GraduationCap, labelKey: 'scholarships' },
          { href: '/parent/fit-report', icon: ClipboardCheck, labelKey: 'fitReport' },
          { href: '/parent/admission-likelihood', icon: Target, labelKey: 'admissionLikelihood' },
          { href: '/parent/reviews', icon: Star, labelKey: 'reviews' },
          { href: '/parent/saved-searches', icon: Bookmark, labelKey: 'savedSearches' },
        ],
      },
      {
        labelKey: 'groupComms',
        items: [
          { href: '/parent/messages', icon: MessageSquare, labelKey: 'messages' },
          { href: '/parent/questions', icon: MessageCircleQuestion, labelKey: 'questions' },
          { href: '/parent/notifications', icon: Bell, labelKey: 'notifications' },
        ],
      },
      {
        labelKey: 'groupAccount',
        items: [
          { href: '/parent/settings', icon: Settings, labelKey: 'settings' },
        ],
      },
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
