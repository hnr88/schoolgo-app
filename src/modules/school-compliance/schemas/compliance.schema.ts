import { z } from 'zod';

export const coeLifecycleStateSchema = z.enum([
  'not_issued',
  'missing',
  'issued',
  'started',
  'expiring_soon',
  'expired',
  'unknown',
]);

export const expiryBucketSchema = z.enum([
  'expired',
  'expiring_0_30',
  'expiring_31_60',
  'expiring_61_90',
  'ok',
  'unknown',
]);

export const passportStatusSchema = z.enum(['ok', 'expiring', 'expired', 'unknown']);

export const passportInfoSchema = z.object({
  documentId: z.string().nullable(),
  expiresAt: z.string().nullable(),
  daysUntilExpiry: z.number().nullable(),
  status: passportStatusSchema,
});

export const watchlistFlagsSchema = z.object({
  coeExpiringSoon: z.boolean(),
  coeExpired: z.boolean(),
  coeMissing: z.boolean(),
  caawPending: z.boolean(),
  passportExpiringSoon: z.boolean(),
  passportExpired: z.boolean(),
});

export const coeEventSummarySchema = z.object({
  documentId: z.string(),
  type: z.string(),
  dueAt: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  note: z.string().nullable(),
  createdAt: z.string(),
});

export const coeRegisterEntrySchema = z.object({
  applicationDocumentId: z.string(),
  status: z.string(),
  studentName: z.string(),
  studentDocumentId: z.string().nullable(),
  nationality: z.string().nullable(),
  agentCompany: z.string().nullable(),
  targetYearLevel: z.string().nullable(),
  targetIntake: z.string().nullable(),
  coeNumber: z.string().nullable(),
  coeStartDate: z.string().nullable(),
  coeEndDate: z.string().nullable(),
  coeIssuedAt: z.string().nullable(),
  caawIssued: z.boolean(),
  lifecycleState: coeLifecycleStateSchema,
  expiryBucket: expiryBucketSchema,
  daysUntilCoeEnd: z.number().nullable(),
  passport: passportInfoSchema,
  flags: watchlistFlagsSchema,
  events: z.array(coeEventSummarySchema),
});

export const coeRegisterResponseSchema = z.object({
  data: z.array(coeRegisterEntrySchema),
  meta: z.object({
    generatedAt: z.string(),
    total: z.number(),
    returned: z.number(),
    bucketCounts: z.record(z.string(), z.number()),
    lifecycleCounts: z.record(z.string(), z.number()),
  }),
});

export const watchlistFlagCountsSchema = z.object({
  coeExpiringSoon: z.number(),
  coeExpired: z.number(),
  coeMissing: z.number(),
  caawPending: z.number(),
  passportExpiringSoon: z.number(),
  passportExpired: z.number(),
});

export const watchlistResponseSchema = z.object({
  data: z.array(coeRegisterEntrySchema),
  meta: z.object({
    generatedAt: z.string(),
    total: z.number(),
    flagCounts: watchlistFlagCountsSchema,
  }),
});

export const complianceEventSchema = z.object({
  documentId: z.string(),
  type: z.string(),
  dueAt: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  note: z.string().nullable(),
  createdAt: z.string(),
});

export const complianceEventResponseSchema = z.object({
  data: complianceEventSchema,
});
