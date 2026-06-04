'use client';

import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { evaluatePasswordStrength } from '@/modules/auth/lib/password-strength';
import { PASSWORD_MIN_LENGTH } from '@/modules/agent-settings/constants/agent-settings.constants';
import {
  AGENT_PASSWORD_RULES,
  PASSWORD_STRENGTH_BAR_CLASS,
  PASSWORD_STRENGTH_LABEL_KEY,
  PASSWORD_STRENGTH_SEGMENTS,
  PASSWORD_STRENGTH_TEXT_CLASS,
} from '@/modules/agent-settings/constants/password-strength.constants';

export function AgentPasswordStrengthMeter({ value }: { value: string }) {
  const t = useTranslations('AgentSettings');
  const { score, rules } = evaluatePasswordStrength(value);
  const hasInput = value.length > 0;

  return (
    <div className='mt-2 flex flex-col gap-2.5'>
      <div className='flex items-center gap-2' aria-hidden='true'>
        {Array.from({ length: PASSWORD_STRENGTH_SEGMENTS }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              hasInput && index < score ? PASSWORD_STRENGTH_BAR_CLASS[score] : 'bg-muted',
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

      <p className='text-xs font-medium text-foggy'>{t('passwordRequirementsTitle')}</p>
      <ul className='flex flex-col gap-1.5'>
        {AGENT_PASSWORD_RULES.map((rule) => {
          const met = rules[rule.id];
          return (
            <li key={rule.id} className='flex items-center gap-2 text-xs'>
              {met ? (
                <Check className='h-3.5 w-3.5 text-vivid-mint' aria-hidden='true' />
              ) : (
                <X className='h-3.5 w-3.5 text-foggy' aria-hidden='true' />
              )}
              <span className={met ? 'text-ink-900' : 'text-foggy'}>
                {t(rule.labelKey, { min: PASSWORD_MIN_LENGTH })}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
