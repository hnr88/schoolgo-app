import type { StatusBadgeProps } from '@/modules/core';
import {
  COMMISSION_MILESTONES,
  COMMISSION_STATUSES,
} from '@/modules/agent-commissions/schemas/agent-commissions.schema';
import type {
  CommissionMilestone,
  CommissionStatus,
} from '@/modules/agent-commissions/types/agent-commissions.types';

export const AGENT_COMMISSIONS_ENDPOINT = '/api/agents/me/commissions';
export const AGENT_COMMISSIONS_SUMMARY_ENDPOINT = '/api/agents/me/commissions/summary';

export const AGENT_COMMISSIONS_QUERY_KEY = ['agent', 'commissions'] as const;

export const COMMISSION_STATUS_OPTIONS = COMMISSION_STATUSES;
export const COMMISSION_MILESTONE_OPTIONS = COMMISSION_MILESTONES;

const COMMISSION_STATUS_LABEL_KEY: Record<CommissionStatus, string> = {
  pending: 'status_pending',
  accrued: 'status_accrued',
  invoiced: 'status_invoiced',
  received: 'status_received',
  disputed: 'status_disputed',
};

const COMMISSION_MILESTONE_LABEL_KEY: Record<CommissionMilestone, string> = {
  offer: 'milestone_offer',
  accepted: 'milestone_accepted',
  enrolled: 'milestone_enrolled',
  invoiced: 'milestone_invoiced',
  paid: 'milestone_paid',
};

/** Resolve a translation key for any (possibly unknown) backend status. */
export function resolveStatusLabelKey(status: string): string {
  return COMMISSION_STATUS_LABEL_KEY[status as CommissionStatus] ?? 'status_pending';
}

/** Resolve a translation key for any (possibly unknown) backend milestone. */
export function resolveMilestoneLabelKey(milestone: string): string {
  return COMMISSION_MILESTONE_LABEL_KEY[milestone as CommissionMilestone] ?? 'milestone_offer';
}

export const COMMISSION_STATUS_BADGE_STYLES: StatusBadgeProps['styles'] = {
  pending: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  accrued: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  invoiced: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber' },
  received: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  disputed: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};
