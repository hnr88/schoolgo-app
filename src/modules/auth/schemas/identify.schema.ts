import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';

export const createIdentifySchema = (t: SchemaTranslator) =>
  z.object({
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
  });

export type IdentifyValues = z.infer<ReturnType<typeof createIdentifySchema>>;
