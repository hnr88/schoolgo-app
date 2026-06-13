import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createAdmissionsStepsSchema(t: SchemaTranslator) {
  return z.object({
    steps: z.array(
      z.object({
        title: z
          .string()
          .trim()
          .min(1, { message: t('admissionsStepTitleRequired') })
          .max(255, { message: t('admissionsStepTitleMax') }),
        description: z
          .string()
          .trim()
          .max(2000, { message: t('admissionsStepDescriptionMax') })
          .optional()
          .or(z.literal('')),
      }),
    ),
  });
}

export type AdmissionsStepsValues = z.infer<ReturnType<typeof createAdmissionsStepsSchema>>;
