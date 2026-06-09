import type { z } from 'zod';
import type {
  agentInvoiceSchema,
  agentInvoicesResponseSchema,
  AGENT_INVOICE_KINDS,
  AGENT_INVOICE_STATUSES,
} from '@/modules/agent-invoices/schemas/agent-invoice.schema';

export type AgentInvoice = z.infer<typeof agentInvoiceSchema>;
export type AgentInvoicesResponse = z.infer<typeof agentInvoicesResponseSchema>;
export type AgentInvoiceStatus = (typeof AGENT_INVOICE_STATUSES)[number];
export type AgentInvoiceKind = (typeof AGENT_INVOICE_KINDS)[number];
