import type { z } from 'zod';
import type {
  agentPaymentSchema,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
} from '@/modules/agent-payments/schemas/agent-payment.schema';

export type AgentPayment = z.infer<typeof agentPaymentSchema>;
export type AgentPaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type AgentPaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface AgentEarningsSummary {
  /** Sum of amounts for completed payments. */
  totalCompleted: number;
  /** Sum of amounts still pending. */
  totalPending: number;
  /** Sum of refunded amounts. */
  totalRefunded: number;
  /** Completed amount whose paid date falls in the reference month. */
  thisMonthCompleted: number;
  /** Total number of payment records. */
  count: number;
}
