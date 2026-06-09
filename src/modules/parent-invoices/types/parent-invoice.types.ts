import type { z } from 'zod';
import type {
  parentInvoiceSchema,
  parentInvoicesResponseSchema,
  PARENT_INVOICE_KINDS,
  PARENT_INVOICE_STATUSES,
} from '@/modules/parent-invoices/schemas/parent-invoice.schema';

export type ParentInvoice = z.infer<typeof parentInvoiceSchema>;
export type ParentInvoicesResponse = z.infer<typeof parentInvoicesResponseSchema>;
export type ParentInvoiceStatus = (typeof PARENT_INVOICE_STATUSES)[number];
export type ParentInvoiceKind = (typeof PARENT_INVOICE_KINDS)[number];
