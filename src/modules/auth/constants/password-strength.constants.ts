import type { PasswordStrengthLevel } from '@/modules/auth/lib/password-strength';

export const PASSWORD_STRENGTH_LABEL_KEY: Record<PasswordStrengthLevel, string> = {
  0: 'passwordStrengthWeak',
  1: 'passwordStrengthWeak',
  2: 'passwordStrengthFair',
  3: 'passwordStrengthGood',
  4: 'passwordStrengthStrong',
};

export const PASSWORD_STRENGTH_BAR_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'bg-destructive',
  1: 'bg-destructive',
  2: 'bg-vivid-amber',
  3: 'bg-babu-500',
  4: 'bg-vivid-mint',
};

export const PASSWORD_STRENGTH_TEXT_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'text-destructive',
  1: 'text-destructive',
  2: 'text-vivid-amber',
  3: 'text-babu-600',
  4: 'text-vivid-mint',
};

export const PASSWORD_STRENGTH_SEGMENTS = 4;
