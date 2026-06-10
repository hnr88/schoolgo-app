import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/auth/types/schema.types';
import type { Portal } from '@/lib/portal-url';
import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/constants/password-policy.constants';

const createBaseSchema = (t: SchemaTranslator) =>
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

export const createRegisterSchema = (t: SchemaTranslator, portal: Portal) => {
  const base = createBaseSchema(t);

  if (portal === 'agent') {
    return base.extend({
      agencyName: z.string().min(1, t('agent.agencyNameRequired')).max(255),
      countryOfOperation: z.string().max(100).optional().or(z.literal('')),
      phone: z.string().max(50).optional().or(z.literal('')),
    });
  }

  if (portal === 'school') {
    return base.extend({
      roleTitle: z.string().max(100).optional().or(z.literal('')),
    });
  }

  return base;
};

export type RegisterValues = {
  username: string;
  email: string;
  password: string;
  agencyName?: string;
  countryOfOperation?: string;
  phone?: string;
  roleTitle?: string;
};
