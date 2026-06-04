import type { PasswordStrengthLevel } from '@/modules/auth/lib/password-strength';
import type { PasswordRuleId } from '@/modules/school-settings/types/password-strength.types';

export const SCHOOL_PASSWORD_STRENGTH_LABEL_KEY: Record<PasswordStrengthLevel, string> = {
  0: 'passwordStrengthWeak',
  1: 'passwordStrengthWeak',
  2: 'passwordStrengthFair',
  3: 'passwordStrengthGood',
  4: 'passwordStrengthStrong',
};

export const SCHOOL_PASSWORD_STRENGTH_BAR_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'bg-destructive',
  1: 'bg-destructive',
  2: 'bg-arches-500',
  3: 'bg-babu-500',
  4: 'bg-babu-600',
};

export const SCHOOL_PASSWORD_STRENGTH_TEXT_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'text-destructive',
  1: 'text-destructive',
  2: 'text-arches-700',
  3: 'text-babu-600',
  4: 'text-babu-700',
};

export const SCHOOL_PASSWORD_STRENGTH_SEGMENTS = 4;

export const SCHOOL_PASSWORD_RULES = [
  { id: 'length', labelKey: 'passwordReqLength' },
  { id: 'uppercase', labelKey: 'passwordReqUppercase' },
  { id: 'lowercase', labelKey: 'passwordReqLowercase' },
  { id: 'number', labelKey: 'passwordReqNumber' },
] as const satisfies readonly { id: PasswordRuleId; labelKey: string }[];
