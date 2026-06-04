import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';
import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/constants/password-policy.constants';

export const createResetPasswordSchema = (t: SchemaTranslator) =>
  z
    .object({
      code: z.string().min(1, t('codeRequired')),
      password: z
        .string()
        .min(PASSWORD_MIN_LENGTH, t('passwordMin'))
        .regex(PASSWORD_HAS_UPPERCASE, t('passwordPolicyUppercase'))
        .regex(PASSWORD_HAS_LOWERCASE, t('passwordPolicyLowercase'))
        .regex(PASSWORD_HAS_NUMBER, t('passwordPolicyNumber')),
      passwordConfirmation: z.string().min(1, t('passwordConfirmRequired')),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwordsDoNotMatch'),
      path: ['passwordConfirmation'],
    });

export type ResetPasswordValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;
