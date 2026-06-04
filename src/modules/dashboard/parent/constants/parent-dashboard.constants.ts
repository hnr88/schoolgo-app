import { Award, CreditCard, FileText, Heart, Search, Settings, UserPlus, Users } from 'lucide-react';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';
import type {
  ParentActionKind,
  ParentPipelineStageKey,
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
    gradient: 'from-rausch-500 to-rausch-700',
  },
  {
    key: 'children',
    href: '/parent/students',
    icon: Users,
    labelKey: 'statChildren',
    gradient: 'from-babu-500 to-babu-700',
  },
  {
    key: 'savedSchools',
    href: '/parent/saved-schools',
    icon: Heart,
    labelKey: 'statSavedSchools',
    gradient: 'from-arches-600 to-arches-700',
  },
  {
    key: 'offers',
    href: '/parent/offers',
    icon: Award,
    labelKey: 'statOffers',
    gradient: 'from-vivid-iris to-vivid-iris-strong',
  },
];

export const PARENT_QUICK_ACTIONS: ParentQuickAction[] = [
  {
    href: '/parent/students/new',
    icon: UserPlus,
    labelKey: 'quickAddStudent',
    bg: 'bg-transparent',
    color: 'text-foggy',
  },
  {
    href: '/parent/search',
    icon: Search,
    labelKey: 'quickSearchSchools',
    bg: 'bg-transparent',
    color: 'text-foggy',
  },
  {
    href: '/parent/settings',
    icon: Settings,
    labelKey: 'quickSettings',
    bg: 'bg-transparent',
    color: 'text-foggy',
  },
];

export const PARENT_PAYMENTS_ACTION = {
  icon: CreditCard,
  labelKey: 'quickPayments',
  bg: 'bg-transparent',
  color: 'text-foggy',
} as const;

/** Status -> pipeline stage bucket for the segmented-bar visualization. */
export const PARENT_PIPELINE_STAGE_BY_STATUS: Record<ApplicationStatus, ParentPipelineStageKey> = {
  draft: 'draft',
  submitted: 'submitted',
  received: 'submitted',
  under_review: 'review',
  documents_requested: 'action',
  assessment_required: 'action',
  interview_scheduled: 'action',
  interview_completed: 'review',
  offer_made: 'offer',
  offer_accepted: 'offer',
  pre_enrolment: 'enrolled',
  coe_issued: 'enrolled',
  enrolled: 'enrolled',
  withdrawn: 'closed',
  declined: 'closed',
  waitlisted: 'review',
};

export interface ParentPipelineStageStyle {
  labelKey: string;
  barClass: string;
  dotClass: string;
}

/** Ordered stages with OKLCH token styles for the segmented bar + legend. */
export const PARENT_PIPELINE_STAGES: Array<{ key: ParentPipelineStageKey } & ParentPipelineStageStyle> = [
  { key: 'draft', labelKey: 'pipelineStageDraft', barClass: 'bg-foggy', dotClass: 'bg-foggy' },
  { key: 'submitted', labelKey: 'pipelineStageSubmitted', barClass: 'bg-babu-500', dotClass: 'bg-babu-500' },
  { key: 'review', labelKey: 'pipelineStageReview', barClass: 'bg-vivid-iris', dotClass: 'bg-vivid-iris' },
  { key: 'action', labelKey: 'pipelineStageAction', barClass: 'bg-vivid-amber', dotClass: 'bg-vivid-amber' },
  { key: 'offer', labelKey: 'pipelineStageOffer', barClass: 'bg-vivid-mint', dotClass: 'bg-vivid-mint' },
  { key: 'enrolled', labelKey: 'pipelineStageEnrolled', barClass: 'bg-babu-700', dotClass: 'bg-babu-700' },
  { key: 'closed', labelKey: 'pipelineStageClosed', barClass: 'bg-rausch-300', dotClass: 'bg-rausch-300' },
];

/** Statuses that require a parent response, surfaced in the action-required panel. */
export const PARENT_ACTION_REQUIRED_STATUSES: ParentActionKind[] = [
  'documents_requested',
  'assessment_required',
  'interview_scheduled',
];

export const PARENT_ACTION_META: Record<
  ParentActionKind,
  { labelKey: string; iconClassName: string }
> = {
  documents_requested: {
    labelKey: 'actionDocumentsRequested',
    iconClassName: 'text-foggy',
  },
  assessment_required: {
    labelKey: 'actionAssessmentRequired',
    iconClassName: 'text-foggy',
  },
  interview_scheduled: {
    labelKey: 'actionInterviewScheduled',
    iconClassName: 'text-foggy',
  },
};

/** How many applications to fetch when deriving pipeline / timeline / actions. */
export const PARENT_DASHBOARD_DERIVE_PAGE_SIZE = 100;

/** Cap for the activity timeline + upcoming previews. */
export const PARENT_TIMELINE_LIMIT = 6;
export const PARENT_UPCOMING_LIMIT = 4;
