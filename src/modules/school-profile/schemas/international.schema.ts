import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createInternationalSchema(t: SchemaTranslator) {
  return z.object({
    cricosAgeRange: z
      .string()
      .trim()
      .max(50, { message: t('cricosAgeRangeMax') })
      .optional()
      .or(z.literal('')),
    yearLevelsInternational: z
      .string()
      .trim()
      .max(500, { message: t('yearLevelsInternationalMax') })
      .optional()
      .or(z.literal('')),
    languagesOffered: z
      .string()
      .trim()
      .max(2000, { message: t('languagesOfferedMax') })
      .optional()
      .or(z.literal('')),
    elicosEslSupport: z.boolean(),
    atarAvailable: z.boolean(),
    internationalStudentCapacity: z
      .number({ message: t('intlCapacityRange') })
      .int({ message: t('intlCapacityRange') })
      .min(0, { message: t('intlCapacityRange') })
      .nullable(),
    internationalStudentPercentage: z
      .number({ message: t('intlPercentageRange') })
      .min(0, { message: t('intlPercentageRange') })
      .max(100, { message: t('intlPercentageRange') })
      .nullable(),
    totalEnrolment: z
      .number({ message: t('totalEnrolmentRange') })
      .int({ message: t('totalEnrolmentRange') })
      .min(0, { message: t('totalEnrolmentRange') })
      .nullable(),
    oshcPreferredProvider: z
      .string()
      .trim()
      .max(50, { message: t('oshcPreferredProviderMax') })
      .optional()
      .or(z.literal('')),
    proposedEntryLevel: z
      .string()
      .trim()
      .max(100, { message: t('proposedEntryLevelMax') })
      .optional()
      .or(z.literal('')),
    postSubmissionMessage: z
      .string()
      .trim()
      .max(5000, { message: t('postSubmissionMessageMax') })
      .optional()
      .or(z.literal('')),
  });
}

export type InternationalValues = z.infer<ReturnType<typeof createInternationalSchema>>;
