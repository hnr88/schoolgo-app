import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createBoardingFeaturesSchema(t: SchemaTranslator) {
  return z.object({
    boardingFeatures: z.array(
      z
        .string()
        .trim()
        .min(1, { message: t('boardingFeatureRequired') })
        .max(100, { message: t('boardingFeatureMax') }),
    ),
  });
}

export type BoardingFeaturesValues = z.infer<ReturnType<typeof createBoardingFeaturesSchema>>;
