'use client';

import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { evaluatePasswordStrength } from '@/modules/auth/lib/password-strength';
import { PASSWORD_POLICY_RULES } from '@/modules/auth/constants/password-policy.constants';
import {
  PASSWORD_STRENGTH_BAR_CLASS,
  PASSWORD_STRENGTH_LABEL_KEY,
  PASSWORD_STRENGTH_SEGMENTS,
  PASSWORD_STRENGTH_TEXT_CLASS,
} from '@/modules/auth/constants/password-strength.constants';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const t = useTranslations('Auth');
  const { score, rules } = evaluatePasswordStrength(password);
  const hasInput = password.length > 0;

  return (
    <div className='mt-2 flex flex-col gap-2.5'>
      <div className='flex items-center gap-2' aria-hidden='true'>
        {Array.from({ length: PASSWORD_STRENGTH_SEGMENTS }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              hasInput && index < score
                ? PASSWORD_STRENGTH_BAR_CLASS[score]
                : 'bg-muted',
            )}
          />
        ))}
      </div>

      <p className='text-xs font-medium text-foggy' role='status' aria-live='polite'>
        {t('passwordStrengthLabel')}
        {hasInput && (
          <span className={cn('ml-1 font-semibold', PASSWORD_STRENGTH_TEXT_CLASS[score])}>
            {t(PASSWORD_STRENGTH_LABEL_KEY[score])}
          </span>
        )}
      </p>

      <ul className='flex flex-col gap-1.5'>
        {PASSWORD_POLICY_RULES.map((rule) => {
          const met = rules[rule.id];
          return (
            <li key={rule.id} className='flex items-center gap-2 text-xs'>
              {met ? (
                <Check className='h-3.5 w-3.5 text-vivid-mint' aria-hidden='true' />
              ) : (
                <X className='h-3.5 w-3.5 text-foggy' aria-hidden='true' />
              )}
              <span className={met ? 'text-ink-900' : 'text-foggy'}>
                {t(rule.labelKey)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
