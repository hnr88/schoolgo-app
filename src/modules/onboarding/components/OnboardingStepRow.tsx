'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { OnboardingStepConfig } from '@/modules/onboarding/types/onboarding.types';

interface OnboardingStepRowProps {
  step: OnboardingStepConfig;
  done: boolean;
  isActive: boolean;
}

export function OnboardingStepRow({ step, done, isActive }: OnboardingStepRowProps) {
  const t = useTranslations('Onboarding');
  const Icon = step.icon;

  return (
    <li
      className={cn(
        'flex items-center gap-4 px-5 py-4 sm:px-6',
        isActive && 'bg-muted/60',
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          done
            ? 'bg-babu-600 text-background'
            : isActive
              ? 'bg-primary text-primary-foreground'
              : 'border-2 border-border bg-card text-foggy',
        )}
        aria-hidden='true'
      >
        {done ? (
          <Check className='h-5 w-5' strokeWidth={2.5} />
        ) : (
          <Icon className='h-5 w-5' strokeWidth={1.75} />
        )}
      </span>

      <div className='flex min-w-0 flex-1 flex-col'>
        <span
          className={cn(
            'text-sm font-bold',
            done ? 'text-foggy line-through' : 'text-ink-900',
          )}
        >
          {t(step.labelKey)}
        </span>
        <span className='text-sm text-foggy'>{t(step.descriptionKey)}</span>
      </div>

      {done ? (
        <span className='flex shrink-0 items-center gap-1.5 text-sm font-semibold text-babu-700'>
          <Check className='h-4 w-4' strokeWidth={2.5} aria-hidden='true' />
          {t('done')}
        </span>
      ) : (
        <Link href={step.href} className='shrink-0 no-underline'>
          <Button size='sm' variant={isActive ? 'default' : 'outline'}>
            {t('start')}
            {isActive && (
              <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
            )}
          </Button>
        </Link>
      )}
    </li>
  );
}
