import { z } from 'zod';

export const likelihoodBandSchema = z.enum(['reach', 'match', 'safety']);

export const likelihoodFactorSchema = z.object({
  factor: z.string(),
  impact: z.enum(['positive', 'negative', 'neutral', 'unknown']),
  detail: z.string(),
});

const schoolFoundSchema = z.object({
  found: z.literal(true),
  schoolDocumentId: z.string(),
  schoolName: z.string().nullable(),
  band: likelihoodBandSchema,
  score: z.number(),
  factors: z.array(likelihoodFactorSchema),
});

const schoolNotFoundSchema = z.object({
  found: z.literal(false),
  schoolDocumentId: z.string(),
});

export const schoolLikelihoodSchema = z.discriminatedUnion('found', [
  schoolFoundSchema,
  schoolNotFoundSchema,
]);

export const admissionLikelihoodResponseSchema = z.object({
  data: z.object({
    studentDocumentId: z.string(),
    schools: z.array(schoolLikelihoodSchema),
  }),
});

export const demandSignalSchema = z.object({
  schoolDocumentId: z.string(),
  schoolName: z.string().nullable(),
  enrolmentStatus: z.string().nullable(),
  placesRemaining: z.number().nullable(),
  totalPlaces: z.number().nullable(),
  offersOut: z.number(),
  activeApplications: z.number(),
  competition: z.enum(['low', 'moderate', 'high', 'unknown']),
  byYearLevel: z.array(
    z.object({
      yearLevel: z.string(),
      intakePeriod: z.string(),
      totalPlaces: z.number().nullable(),
      offersOut: z.number(),
      remaining: z.number().nullable(),
      band: z.string(),
    }),
  ),
});

export const demandSignalResponseSchema = z.object({
  data: demandSignalSchema,
});
