import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';
import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/constants/password-policy.constants';

export const createRegisterSchema = (t: SchemaTranslator) =>
  z.object({
    username: z.string().min(3, t('usernameMin')),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, t('passwordMin'))
      .regex(PASSWORD_HAS_UPPERCASE, t('passwordPolicyUppercase'))
      .regex(PASSWORD_HAS_LOWERCASE, t('passwordPolicyLowercase'))
      .regex(PASSWORD_HAS_NUMBER, t('passwordPolicyNumber')),
  });

export type RegisterValues = z.infer<ReturnType<typeof createRegisterSchema>>;
