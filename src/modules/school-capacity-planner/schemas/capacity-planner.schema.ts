import { z } from 'zod';

export const yieldScenarioSchema = z.object({
  label: z.enum(['conservative', 'expected', 'optimistic']),
  assumedMeltRate: z.number(),
  recommendedOffers: z.number(),
  projectedEnrolment: z.number(),
});

export const yieldPlanIntakeSchema = z.object({
  intakePeriod: z.string(),
  yearLevel: z.string(),
  totalPlaces: z.number().nullable(),
  offersOut: z.number(),
  accepted: z.number(),
  remaining: z.number().nullable(),
  projectedMelt: z.number(),
  recommendedOverOffer: z.number(),
  meltRate: z.number(),
  acceptRate: z.number(),
  sampleCount: z.number(),
  scenarios: z.array(yieldScenarioSchema),
});

export const yieldPlanResponseSchema = z.object({
  data: z.object({ intakes: z.array(yieldPlanIntakeSchema) }),
});

export const waitlistStatusSchema = z.enum(['waiting', 'promoted', 'declined', 'expired']);

export const waitlistEntrySchema = z.object({
  documentId: z.string(),
  intakePeriod: z.string().nullable(),
  yearLevel: z.string().nullable(),
  rank: z.number().nullable(),
  status: waitlistStatusSchema,
  addedAt: z.string().nullable(),
  promotedAt: z.string().nullable(),
  application: z
    .object({
      documentId: z.string(),
      status: z.string(),
      student: z
        .object({
          documentId: z.string(),
          name: z.string(),
          nationality: z.string().nullable(),
        })
        .nullable(),
      agent: z
        .object({
          documentId: z.string(),
          companyName: z.string().nullable(),
        })
        .nullable(),
    })
    .nullable(),
});

export const waitlistResponseSchema = z.object({
  data: z.array(waitlistEntrySchema),
});

export const addWaitlistSchema = z.object({
  applicationDocumentId: z.string().trim().min(1, 'required'),
  intakePeriod: z.string().trim().optional(),
  yearLevel: z.string().trim().optional(),
});

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const promoteWaitlistSchema = z.object({
  offerDeadline: z.string().regex(ISO_DATE_RE, 'invalidDate'),
});
