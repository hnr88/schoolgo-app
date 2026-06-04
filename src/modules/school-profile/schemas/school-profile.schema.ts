import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

const SCHOOL_STATES = [
  'VIC',
  'NSW',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'ACT',
  'NT',
] as const;

const OSHC_ARRANGEMENTS = [
  'school_arranged',
  'agent_arranged',
  'either',
] as const;

export const TUITION_LEVELS = [
  'gr4',
  'gr5',
  'gr6',
  'yr7',
  'yr8',
  'yr9',
  'yr10',
  'yr11',
  'yr12',
] as const;

const MAX_FEE = 10_000_000;
const POSTCODE_PATTERN = /^\d{3,10}$/;

export function createIdentitySchema(t: SchemaTranslator) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t('nameRequired') })
      .max(255, { message: t('nameMax') }),
    cricosCode: z
      .string()
      .trim()
      .max(255, { message: t('cricosCodeMax') })
      .optional()
      .or(z.literal('')),
    suburb: z
      .string()
      .trim()
      .max(100, { message: t('suburbMax') })
      .optional()
      .or(z.literal('')),
    state: z.enum(SCHOOL_STATES).nullable(),
    postcode: z
      .union([
        z.literal(''),
        z.string().trim().regex(POSTCODE_PATTERN, { message: t('postcodeInvalid') }),
      ])
      .optional(),
  });
}

export function createDescriptionSchema(t: SchemaTranslator) {
  const optionalUrl = z
    .union([
      z.literal(''),
      z
        .string()
        .trim()
        .url({ message: t('urlInvalid') })
        .max(500, { message: t('urlMax') }),
    ])
    .optional();

  return z.object({
    description: z
      .string()
      .trim()
      .max(5000, { message: t('descriptionMax') })
      .optional()
      .or(z.literal('')),
    internationalStudentDescription: z
      .string()
      .trim()
      .max(5000, { message: t('intlDescriptionMax') })
      .optional()
      .or(z.literal('')),
    schoolHomepageUrl: optionalUrl,
    internationalEnrolmentUrl: optionalUrl,
    admissionsEmail: z
      .union([z.literal(''), z.string().trim().email({ message: t('emailInvalid') })])
      .optional(),
    admissionsPhone: z
      .string()
      .trim()
      .max(50, { message: t('phoneMax') })
      .optional()
      .or(z.literal('')),
  });
}

export function createFeesSchema(t: SchemaTranslator) {
  const fee = z
    .number({ message: t('feeRange') })
    .int()
    .min(0, { message: t('feeRange') })
    .max(MAX_FEE, { message: t('feeMax') })
    .nullable();

  return z.object({
    applicationFee: fee,
    enrolmentFee: fee,
    feeBoardingAnnual: fee,
    boardingAvailable: z.boolean(),
    feeApplicationRefundable: z.boolean(),
  });
}

export function createAcademicSchema(t: SchemaTranslator) {
  return z.object({
    ieltsMinScore: z
      .number({ message: t('ieltsRange') })
      .min(0, { message: t('ieltsRange') })
      .max(9, { message: t('ieltsRange') })
      .nullable(),
    aeasMinScore: z
      .number({ message: t('aeasRange') })
      .min(0, { message: t('aeasRange') })
      .max(100, { message: t('aeasRange') })
      .nullable(),
    pteMinScore: z
      .number({ message: t('pteRange') })
      .min(0, { message: t('pteRange') })
      .max(90, { message: t('pteRange') })
      .nullable(),
    duolingoMinScore: z
      .number({ message: t('duolingoRange') })
      .min(0, { message: t('duolingoRange') })
      .max(160, { message: t('duolingoRange') })
      .nullable(),
    curriculumOffered: z
      .string()
      .trim()
      .max(255, { message: t('curriculumMax') })
      .optional()
      .or(z.literal('')),
    levelsOffered: z
      .string()
      .trim()
      .max(255, { message: t('levelsMax') })
      .optional()
      .or(z.literal('')),
    intakePeriods: z
      .string()
      .trim()
      .max(2000, { message: t('intakePeriodsMax') })
      .optional()
      .or(z.literal('')),
  });
}

export function createPoliciesSchema(t: SchemaTranslator) {
  return z.object({
    offerAcceptanceWindowDays: z
      .number({ message: t('offerWindowRequired') })
      .int({ message: t('offerWindowRange') })
      .min(1, { message: t('offerWindowRange') })
      .max(365, { message: t('offerWindowRange') }),
    autoWaitlistEnabled: z.boolean(),
    partnerAgentsOnly: z.boolean(),
    oshcArrangement: z.enum(OSHC_ARRANGEMENTS).nullable(),
  });
}

export function createTuitionSchema(t: SchemaTranslator) {
  return z.object({
    level: z.enum(TUITION_LEVELS, { message: t('tuitionLevelRequired') }),
    annualAmountAud: z
      .number({ message: t('tuitionAmountRange') })
      .int()
      .min(0, { message: t('tuitionAmountRange') })
      .max(MAX_FEE, { message: t('tuitionAmountMax') }),
  });
}

export function createCapacitySchema(t: SchemaTranslator) {
  return z.object({
    yearLevel: z
      .string()
      .trim()
      .min(1, { message: t('capacityYearLevelRequired') })
      .max(20, { message: t('capacityYearLevelMax') }),
    intakePeriod: z
      .string()
      .trim()
      .min(1, { message: t('capacityIntakeRequired') })
      .max(50, { message: t('capacityIntakeMax') }),
    totalPlaces: z
      .number({ message: t('capacityTotalRange') })
      .int()
      .min(0, { message: t('capacityTotalRange') })
      .max(MAX_FEE, { message: t('capacityTotalMax') }),
    autoWaitlist: z.boolean(),
  });
}

export type IdentityValues = z.infer<ReturnType<typeof createIdentitySchema>>;
export type DescriptionValues = z.infer<ReturnType<typeof createDescriptionSchema>>;
export type FeesValues = z.infer<ReturnType<typeof createFeesSchema>>;
export type AcademicValues = z.infer<ReturnType<typeof createAcademicSchema>>;
export type PoliciesValues = z.infer<ReturnType<typeof createPoliciesSchema>>;
export type TuitionValues = z.infer<ReturnType<typeof createTuitionSchema>>;
export type CapacityValues = z.infer<ReturnType<typeof createCapacitySchema>>;
