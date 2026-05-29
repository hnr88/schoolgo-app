import { z } from 'zod';

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

const optionalText = z
  .string()
  .trim()
  .max(255)
  .optional()
  .or(z.literal(''));

const optionalUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .optional()
  .or(z.literal(''));

const optionalEmail = z
  .string()
  .trim()
  .email()
  .optional()
  .or(z.literal(''));

const nonNegativeInt = z
  .number()
  .int()
  .min(0)
  .nullable();

const decimalScore = z
  .number()
  .min(0)
  .max(9)
  .nullable();

export const identitySchema = z.object({
  name: z.string().trim().min(1).max(255),
  cricosCode: optionalText,
  suburb: z.string().trim().max(100).optional().or(z.literal('')),
  state: z.enum(SCHOOL_STATES).nullable(),
  postcode: z.string().trim().max(10).optional().or(z.literal('')),
});

export const descriptionSchema = z.object({
  description: z.string().trim().max(5000).optional().or(z.literal('')),
  internationalStudentDescription: z
    .string()
    .trim()
    .max(5000)
    .optional()
    .or(z.literal('')),
  schoolHomepageUrl: optionalUrl,
  internationalEnrolmentUrl: optionalUrl,
  admissionsEmail: optionalEmail,
  admissionsPhone: z.string().trim().max(50).optional().or(z.literal('')),
});

export const feesSchema = z.object({
  applicationFee: nonNegativeInt,
  enrolmentFee: nonNegativeInt,
  feeBoardingAnnual: nonNegativeInt,
  boardingAvailable: z.boolean(),
  feeApplicationRefundable: z.boolean(),
});

export const academicSchema = z.object({
  ieltsMinScore: decimalScore,
  aeasMinScore: decimalScore,
  pteMinScore: decimalScore,
  duolingoMinScore: decimalScore,
  curriculumOffered: z.string().trim().max(255).optional().or(z.literal('')),
  levelsOffered: z.string().trim().max(255).optional().or(z.literal('')),
  intakePeriods: z.string().trim().max(2000).optional().or(z.literal('')),
});

export const policiesSchema = z.object({
  offerAcceptanceWindowDays: z
    .number()
    .int()
    .min(1)
    .max(365),
  autoWaitlistEnabled: z.boolean(),
  partnerAgentsOnly: z.boolean(),
  oshcArrangement: z.enum(OSHC_ARRANGEMENTS).nullable(),
});

export const tuitionSchema = z.object({
  level: z.enum(TUITION_LEVELS),
  annualAmountAud: z
    .number()
    .int()
    .min(0),
});

export const capacitySchema = z.object({
  yearLevel: z.string().trim().min(1).max(20),
  intakePeriod: z.string().trim().min(1).max(50),
  totalPlaces: z
    .number()
    .int()
    .min(0),
  autoWaitlist: z.boolean(),
});

export type IdentityValues = z.infer<typeof identitySchema>;
export type DescriptionValues = z.infer<typeof descriptionSchema>;
export type FeesValues = z.infer<typeof feesSchema>;
export type AcademicValues = z.infer<typeof academicSchema>;
export type PoliciesValues = z.infer<typeof policiesSchema>;
export type TuitionValues = z.infer<typeof tuitionSchema>;
export type CapacityValues = z.infer<typeof capacitySchema>;
