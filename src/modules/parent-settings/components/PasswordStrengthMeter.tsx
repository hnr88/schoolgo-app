'use client';

import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { PASSWORD_MIN_LENGTH } from '@/modules/parent-settings/constants/parent-settings.constants';
import {
  getPasswordRequirements,
  getPasswordStrength,
} from '@/modules/parent-settings/lib/password-strength';
import type {
  PasswordRequirementId,
  PasswordStrengthLevel,
} from '@/modules/parent-settings/types/parent-settings.types';

const REQUIREMENT_LABEL_KEY: Record<
  PasswordRequirementId,
  'passwordReqLength' | 'passwordReqLetter' | 'passwordReqNumber'
> = {
  length: 'passwordReqLength',
  letter: 'passwordReqLetter',
  number: 'passwordReqNumber',
};

const STRENGTH_FILL_CLASS: Record<PasswordStrengthLevel, string> = {
  weak: 'bg-destructive',
  fair: 'bg-arches-500',
  good: 'bg-rausch-400',
  strong: 'bg-babu-500',
};

const STRENGTH_WIDTH_CLASS: Record<PasswordStrengthLevel, string> = {
  weak: 'w-1/4',
  fair: 'w-2/4',
  good: 'w-3/4',
  strong: 'w-full',
};

export function PasswordStrengthMeter({ value }: { value: string }) {
  const t = useTranslations('ParentSettings');
  const requirements = getPasswordRequirements(value);
  const strength = getPasswordStrength(value);

  return (
    <div className='flex flex-col gap-3'>
      {value.length > 0 ? (
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-foggy'>{t('passwordStrengthLabel')}</span>
            <span className='font-medium text-ink-900'>
              {t(`passwordStrength_${strength.level}`)}
            </span>
          </div>
          <div
            className='h-1.5 w-full overflow-hidden rounded-full bg-muted'
            role='progressbar'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={strength.percent}
            aria-label={t('passwordStrengthLabel')}
          >
            <div
              className={cn(
                'h-full rounded-full',
                STRENGTH_FILL_CLASS[strength.level],
                STRENGTH_WIDTH_CLASS[strength.level],
              )}
            />
          </div>
        </div>
      ) : null}

      <div className='flex flex-col gap-1.5'>
        <p className='text-xs font-medium text-foggy'>{t('passwordRequirementsTitle')}</p>
        <ul className='flex flex-col gap-1'>
          {requirements.map((requirement) => (
            <li
              key={requirement.id}
              className={cn(
                'flex items-center gap-2 text-xs',
                requirement.met ? 'text-babu-700' : 'text-foggy',
              )}
            >
              {requirement.met ? (
                <Check className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />
              ) : (
                <X className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />
              )}
              {t(REQUIREMENT_LABEL_KEY[requirement.id], { min: PASSWORD_MIN_LENGTH })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
