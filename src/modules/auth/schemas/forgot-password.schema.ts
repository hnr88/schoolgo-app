import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';

export const createForgotPasswordSchema = (t: SchemaTranslator) =>
  z.object({
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
  });

export type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
