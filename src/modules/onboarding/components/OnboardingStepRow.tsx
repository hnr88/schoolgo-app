'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import type { OnboardingStepConfig } from '@/modules/onboarding/types/onboarding.types';

interface OnboardingStepRowProps {
  step: OnboardingStepConfig;
  done: boolean;
}

export function OnboardingStepRow({ step, done }: OnboardingStepRowProps) {
  const t = useTranslations('Onboarding');
  const Icon = step.icon;

  return (
    <li className='flex items-center gap-3 px-5 py-4'>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          done ? 'bg-vivid-mint-soft text-vivid-mint' : 'bg-muted text-foggy'
        }`}
        aria-hidden='true'
      >
        {done ? <Check className='h-4 w-4' /> : <Icon className='h-4 w-4' />}
      </span>

      <span className='flex min-w-0 flex-1 flex-col'>
        <span
          className={`truncate text-sm font-semibold ${
            done ? 'text-foggy line-through' : 'text-ink-900'
          }`}
        >
          {t(step.labelKey)}
        </span>
        <span className='truncate text-xs text-foggy'>{t(step.descriptionKey)}</span>
      </span>

      {done ? (
        <span className='shrink-0 text-xs font-medium text-vivid-mint'>{t('done')}</span>
      ) : (
        <Link href={step.href} className='shrink-0 no-underline'>
          <Button size='sm' variant='outline'>
            {t('start')}
          </Button>
        </Link>
      )}
    </li>
  );
}
