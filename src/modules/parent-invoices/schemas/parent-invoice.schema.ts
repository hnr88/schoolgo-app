import { z } from 'zod';

export const PARENT_INVOICE_STATUSES = [
  'draft',
  'issued',
  'paid',
  'overdue',
  'cancelled',
  'refunded',
] as const;

export const PARENT_INVOICE_KINDS = [
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

// Flat Strapi v5 entity, exactly as the /invoices/mine controller sanitizes it.
export const parentInvoiceSchema = z.object({
  documentId: z.string(),
  invoiceNumber: z.string().nullish(),
  kind: z.enum(PARENT_INVOICE_KINDS),
  amountAud: z.number(),
  currency: z.string().nullish(),
  status: z.enum(PARENT_INVOICE_STATUSES),
  dueDate: z.string().nullish(),
  issuedAt: z.string().nullish(),
  paidAt: z.string().nullish(),
  lineItems: z.unknown().nullish(),
  notes: z.string().nullish(),
  application: applicationRefSchema.nullish(),
});

// `mine` returns a bare { data: [...] } envelope (no pagination meta).
export const parentInvoicesResponseSchema = z.object({
  data: z.array(parentInvoiceSchema),
});
