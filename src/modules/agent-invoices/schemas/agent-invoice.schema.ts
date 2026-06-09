import { z } from 'zod';

export const AGENT_INVOICE_STATUSES = [
  'draft',
  'issued',
  'paid',
  'overdue',
  'cancelled',
  'refunded',
] as const;

export const AGENT_INVOICE_KINDS = [
  'application_fee',
  'tuition',
  'enrolment',
  'boarding',
  'add_on_service',
] as const;

const applicationRefSchema = z.object({
  documentId: z.string(),
  status: z.string().nullish(),
  targetYearLevel: z.string().nullish(),
  targetIntake: z.string().nullish(),
  student: z
    .object({
      documentId: z.string(),
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
    })
    .nullish(),
  school: z
    .object({
      documentId: z.string(),
      name: z.string().nullish(),
    })
    .nullish(),
});

const schoolRefSchema = z.object({
  documentId: z.string(),
  name: z.string().nullish(),
  slug: z.string().nullish(),
});

const agentRefSchema = z.object({
  documentId: z.string(),
  companyName: z.string().nullish(),
});

const paymentRefSchema = z.object({
  documentId: z.string(),
  amountAud: z.number().nullish(),
  status: z.string().nullish(),
  paidAt: z.string().nullish(),
  method: z.string().nullish(),
});

// Flat Strapi v5 entity, exactly as the /invoices/mine agent branch sanitizes it.
export const agentInvoiceSchema = z.object({
  documentId: z.string(),
  invoiceNumber: z.string().nullish(),
  kind: z.enum(AGENT_INVOICE_KINDS),
  amountAud: z.number(),
  currency: z.string().nullish(),
  status: z.enum(AGENT_INVOICE_STATUSES),
  dueDate: z.string().nullish(),
  issuedAt: z.string().nullish(),
  paidAt: z.string().nullish(),
  lineItems: z.unknown().nullish(),
  notes: z.string().nullish(),
  application: applicationRefSchema.nullish(),
  school: schoolRefSchema.nullish(),
  agent: agentRefSchema.nullish(),
  payments: z.array(paymentRefSchema).nullish(),
});

// `mine` returns a bare { data: [...] } envelope (no pagination meta).
export const agentInvoicesResponseSchema = z.object({
  data: z.array(agentInvoiceSchema),
});
