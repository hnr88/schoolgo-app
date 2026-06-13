import { z } from 'zod';

// Mirrors the commission content-type enums (api::commission.commission).
export const COMMISSION_STATUSES = [
  'pending',
  'accrued',
  'invoiced',
  'received',
  'disputed',
] as const;

export const COMMISSION_MILESTONES = [
  'offer',
  'accepted',
  'enrolled',
  'invoiced',
  'paid',
] as const;

// Decimal columns arrive as number (PG) or string (SQLite) — coerce to number.
const moneySchema = z.coerce.number();
const nullableMoneySchema = z.coerce.number().nullable();

const commissionApplicationSchema = z.object({
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
});

const commissionSchoolSchema = z.object({
  documentId: z.string(),
  name: z.string().nullish(),
});

export const commissionRowSchema = z.object({
  documentId: z.string(),
  expectedAmountAud: nullableMoneySchema,
  receivedAmountAud: nullableMoneySchema,
  currency: z.string().nullish(),
  ratePct: nullableMoneySchema,
  // Loosened from z.enum so an unknown backend value never breaks the table.
  milestone: z.string(),
  status: z.string(),
  accruedAt: z.string().nullish(),
  disputeNote: z.string().nullish(),
  createdAt: z.string(),
  application: commissionApplicationSchema.nullish(),
  school: commissionSchoolSchema.nullish(),
});

export const commissionSummarySchema = z.object({
  expectedAud: moneySchema,
  accruedAud: moneySchema,
  receivedAud: moneySchema,
  outstandingAud: moneySchema,
  counts: z.object({
    total: z.number(),
    byStatus: z.record(z.string(), z.number()),
  }),
});

export const commissionsListResponseSchema = z.object({
  data: z.array(commissionRowSchema),
  meta: z
    .object({
      pagination: z
        .object({ page: z.number(), pageSize: z.number(), total: z.number() })
        .partial()
        .nullish(),
      totals: commissionSummarySchema.nullish(),
    })
    .partial(),
});

export const commissionSummaryResponseSchema = z.object({
  data: commissionSummarySchema,
});
