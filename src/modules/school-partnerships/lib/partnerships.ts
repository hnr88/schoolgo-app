import type { AgentPartnership } from '@/modules/school-partnerships/types/school-partnerships.types';

export interface GroupedPartnerships {
  active: AgentPartnership[];
  pending: AgentPartnership[];
}

export function groupPartnerships(partnerships: AgentPartnership[]): GroupedPartnerships {
  return {
    active: partnerships.filter((p) => p.status === 'active'),
    pending: partnerships.filter((p) => p.status === 'pending'),
  };
}

export function formatPartnershipDate(value: string | null, locale: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
