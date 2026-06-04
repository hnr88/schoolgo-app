import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';

export const createLoginSchema = (t: SchemaTranslator) =>
  z.object({
    identifier: z.string().min(1, t('identifierRequired')),
    password: z.string().min(1, t('passwordRequired')),
  });

export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;
