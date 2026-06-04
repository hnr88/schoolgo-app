import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/constants/password-policy.constants';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordRuleState {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
}

export interface PasswordStrengthResult {
  score: PasswordStrengthLevel;
  rules: PasswordRuleState;
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const rules: PasswordRuleState = {
    length: password.length >= PASSWORD_MIN_LENGTH,
    uppercase: PASSWORD_HAS_UPPERCASE.test(password),
    lowercase: PASSWORD_HAS_LOWERCASE.test(password),
    number: PASSWORD_HAS_NUMBER.test(password),
  };

  if (password.length === 0) {
    return { score: 0, rules };
  }

  const met = Number(rules.length) + Number(rules.uppercase) + Number(rules.lowercase) + Number(rules.number);
  const bonus = password.length >= 12 ? 1 : 0;
  const score = Math.min(4, met + bonus) as PasswordStrengthLevel;

  return { score, rules };
}
