import type { ComponentProps } from 'react';
import type { IconComponent } from '@/modules/design-system';
import type { Link } from '@/i18n/navigation';

type LinkHref = ComponentProps<typeof Link>['href'];

export interface ParentQuickAction {
  href: LinkHref;
  icon: IconComponent;
  labelKey: string;
  bg: string;
  color: string;
}

export type ParentStatTileKey =
  | 'applicationsInProgress'
  | 'children'
  | 'savedSchools'
  | 'offers';

export interface ParentStatTileConfig {
  key: ParentStatTileKey;
  href: LinkHref;
  icon: IconComponent;
  labelKey: string;
  /** semantic text-color token tinting the tile's icon chip (§3.7) */
  iconClassName: string;
}

export type ParentStatCounts = Record<ParentStatTileKey, number>;

export interface ParentDashboardCardProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: LinkHref;
  viewAllLabel?: string;
  children: React.ReactNode;
}

export type ParentPipelineStageKey =
  | 'draft'
  | 'submitted'
  | 'review'
  | 'action'
  | 'offer'
  | 'enrolled'
  | 'closed';

export interface ParentPipelineSegment {
  key: ParentPipelineStageKey;
  labelKey: string;
  count: number;
  /** OKLCH token bg class for the segment fill */
  barClass: string;
  /** OKLCH token bg class for the legend dot */
  dotClass: string;
}

export interface ParentPipelineData {
  segments: ParentPipelineSegment[];
  total: number;
}

export interface ParentCompletenessItem {
  documentId: string;
  name: string;
  photoUrl?: string;
  percent: number;
  completed: number;
  total: number;
  isComplete: boolean;
}

export type ParentTimelineKind = 'submitted' | 'statusChanged' | 'offerReceived';

export interface ParentTimelineItem {
  id: string;
  kind: ParentTimelineKind;
  icon: IconComponent;
  iconClassName: string;
  schoolName: string;
  studentName: string;
  timestamp: string;
  iso: string;
  href: LinkHref;
}

export type ParentActionKind =
  | 'documents_requested'
  | 'assessment_required'
  | 'interview_scheduled';

export interface ParentActionItem {
  id: string;
  kind: ParentActionKind;
  labelKey: string;
  icon: IconComponent;
  iconClassName: string;
  schoolName: string;
  studentName: string;
  href: LinkHref;
}

export type ParentUpcomingKind = 'offerDeadline';

export interface ParentUpcomingItem {
  id: string;
  kind: ParentUpcomingKind;
  icon: IconComponent;
  iconClassName: string;
  title: string;
  subtitle: string;
  iso: string;
  href: LinkHref;
}
