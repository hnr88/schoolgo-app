import type { StatusBadgeProps } from '@/modules/core';
import { LEAD_STATUSES } from '@/modules/agent-leads/schemas/agent-leads.schema';
import type { LeadStatus } from '@/modules/agent-leads/types/agent-leads.types';

export const AGENT_LEADS_ENDPOINT = '/api/agents/me/inquiries';

export const AGENT_LEADS_QUERY_KEY = ['agent', 'leads'] as const;

export const LEAD_STATUS_OPTIONS = LEAD_STATUSES;

const LEAD_STATUS_LABEL_KEY: Record<LeadStatus, string> = {
  new: 'status_new',
  read: 'status_read',
  responded: 'status_responded',
  closed: 'status_closed',
};

/** Resolve a translation key for any (possibly unknown) backend status. */
export function resolveLeadStatusLabelKey(status: string): string {
  return LEAD_STATUS_LABEL_KEY[status as LeadStatus] ?? 'status_new';
}

export const LEAD_STATUS_BADGE_STYLES: StatusBadgeProps['styles'] = {
  new: { dot: 'bg-babu-500', bg: 'bg-babu-50', text: 'text-babu-700' },
  read: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  responded: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  closed: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};
