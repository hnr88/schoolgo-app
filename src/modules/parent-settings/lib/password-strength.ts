import {
  PASSWORD_HAS_LETTER,
  PASSWORD_HAS_NUMBER,
  PASSWORD_MIN_LENGTH,
} from '@/modules/parent-settings/constants/parent-settings.constants';
import type {
  PasswordRequirement,
  PasswordStrength,
} from '@/modules/parent-settings/types/parent-settings.types';

const HAS_SYMBOL = /[^A-Za-z0-9]/;

export function getPasswordRequirements(value: string): PasswordRequirement[] {
  return [
    { id: 'length', met: value.length >= PASSWORD_MIN_LENGTH },
    { id: 'letter', met: PASSWORD_HAS_LETTER.test(value) },
    { id: 'number', met: PASSWORD_HAS_NUMBER.test(value) },
  ];
}

export function getPasswordStrength(value: string): PasswordStrength {
  if (value.length === 0) {
    return { level: 'weak', score: 0, percent: 0 };
  }

  let score = 0;
  if (value.length >= PASSWORD_MIN_LENGTH) score += 1;
  if (value.length >= 12) score += 1;
  if (PASSWORD_HAS_LETTER.test(value) && PASSWORD_HAS_NUMBER.test(value)) score += 1;
  if (HAS_SYMBOL.test(value)) score += 1;

  const level: PasswordStrength['level'] =
    score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong';

  return { level, score, percent: Math.round((score / 4) * 100) };
}
