import type { AgentInvoiceStatus } from '@/modules/agent-invoices/types/agent-invoice.types';

type BadgeStyle = { dot: string; bg: string; text: string };

export const AGENT_INVOICE_STATUS_STYLES: Record<AgentInvoiceStatus, BadgeStyle> = {
  draft: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  issued: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  paid: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  overdue: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  cancelled: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
  refunded: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
};
