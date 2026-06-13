import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createCocurricularSchema(t: SchemaTranslator) {
  return z.object({
    programTypes: z.array(
      z
        .string()
        .trim()
        .min(1, { message: t('cocurricularActivityRequired') })
        .max(100, { message: t('cocurricularActivityMax') }),
    ),
  });
}

export type CocurricularValues = z.infer<ReturnType<typeof createCocurricularSchema>>;
