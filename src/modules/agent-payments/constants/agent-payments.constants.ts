import type { AgentPaymentStatus } from '@/modules/agent-payments/types/agent-payment.types';

export const PAYMENT_STATUS_STYLES: Record<
  AgentPaymentStatus,
  { dot: string; bg: string; text: string }
> = {
  completed: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  pending: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber' },
  failed: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  refunded: { dot: 'bg-foggy', bg: 'bg-muted', text: 'text-foggy' },
};
