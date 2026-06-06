import { z } from 'zod';

export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const;
export const PAYMENT_METHODS = ['bank_transfer', 'card', 'other'] as const;

const invoiceRefSchema = z.object({
  documentId: z.string(),
  invoiceNumber: z.string().nullish(),
  kind: z.string().nullish(),
  amountAud: z.number().nullish(),
  status: z.string().nullish(),
});

const paidByUserSchema = z.object({
  documentId: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  email: z.string().nullish(),
});

// Flat Strapi v5 entity, exactly as the /payments/mine controller sanitizes it.
export const agentPaymentSchema = z.object({
  documentId: z.string(),
  amountAud: z.number(),
  method: z.enum(PAYMENT_METHODS),
  reference: z.string().nullish(),
  status: z.enum(PAYMENT_STATUSES),
  paidAt: z.string().nullish(),
  notes: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  invoice: invoiceRefSchema.nullish(),
  paidByUser: paidByUserSchema.nullish(),
});

// `mine` returns a bare { data: [...] } envelope (no pagination meta).
export const agentPaymentsResponseSchema = z.object({
  data: z.array(agentPaymentSchema),
});
