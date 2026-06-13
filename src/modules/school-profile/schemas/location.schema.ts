import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createLocationSchema(t: SchemaTranslator) {
  return z.object({
    latitude: z
      .number({ message: t('latitudeRange') })
      .min(-90, { message: t('latitudeRange') })
      .max(90, { message: t('latitudeRange') })
      .nullable(),
    longitude: z
      .number({ message: t('longitudeRange') })
      .min(-180, { message: t('longitudeRange') })
      .max(180, { message: t('longitudeRange') })
      .nullable(),
    distanceToCbd: z
      .number({ message: t('distanceToCbdRange') })
      .min(0, { message: t('distanceToCbdRange') })
      .max(100000, { message: t('distanceToCbdMax') })
      .nullable(),
  });
}

export type LocationValues = z.infer<ReturnType<typeof createLocationSchema>>;
