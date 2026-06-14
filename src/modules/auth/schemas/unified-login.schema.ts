import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';

export const createUnifiedLoginSchema = (t: SchemaTranslator) =>
  z.object({
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    password: z.string().min(1, t('passwordRequired')),
  });

export type UnifiedLoginValues = z.infer<ReturnType<typeof createUnifiedLoginSchema>>;
