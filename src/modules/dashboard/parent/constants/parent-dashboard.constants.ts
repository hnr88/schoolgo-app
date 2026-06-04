import { Award, CreditCard, FileText, Heart, Search, Settings, UserPlus, Users } from 'lucide-react';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';
import type {
  ParentQuickAction,
  ParentStatTileConfig,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

export const PARENT_DASHBOARD_RECENT_LIMIT = 4;

export const PARENT_APPLICATION_IN_PROGRESS_STATUSES: ApplicationStatus[] = [
  'submitted',
  'received',
  'under_review',
  'documents_requested',
  'assessment_required',
  'interview_scheduled',
  'interview_completed',
  'offer_made',
  'offer_accepted',
  'pre_enrolment',
  'coe_issued',
];

export const PARENT_APPLICATION_OFFER_STATUSES: ApplicationStatus[] = [
  'offer_made',
  'offer_accepted',
];

export const PARENT_STAT_TILES: ParentStatTileConfig[] = [
  {
    key: 'applicationsInProgress',
    href: '/parent/applications',
    icon: FileText,
    labelKey: 'statApplicationsInProgress',
    iconClassName: 'bg-vivid-iris-soft text-vivid-iris-strong',
  },
  {
    key: 'children',
    href: '/parent/students',
    icon: Users,
    labelKey: 'statChildren',
    iconClassName: 'bg-vivid-coral-soft text-vivid-coral-strong',
  },
  {
    key: 'savedSchools',
    href: '/parent/saved-schools',
    icon: Heart,
    labelKey: 'statSavedSchools',
    iconClassName: 'bg-vivid-mint-soft text-vivid-mint',
  },
  {
    key: 'offers',
    href: '/parent/offers',
    icon: Award,
    labelKey: 'statOffers',
    iconClassName: 'bg-vivid-amber-soft text-arches-700',
  },
];

export const PARENT_QUICK_ACTIONS: ParentQuickAction[] = [
  {
    href: '/parent/students/new',
    icon: UserPlus,
    labelKey: 'quickAddStudent',
    bg: 'bg-vivid-coral-soft',
    color: 'text-vivid-coral',
  },
  {
    href: '/parent/search',
    icon: Search,
    labelKey: 'quickSearchSchools',
    bg: 'bg-vivid-mint-soft',
    color: 'text-vivid-mint',
  },
  {
    href: '/parent/settings',
    icon: Settings,
    labelKey: 'quickSettings',
    bg: 'bg-vivid-iris-soft',
    color: 'text-vivid-iris',
  },
];

export const PARENT_PAYMENTS_ACTION = {
  icon: CreditCard,
  labelKey: 'quickPayments',
  bg: 'bg-muted',
  color: 'text-foggy',
} as const;
