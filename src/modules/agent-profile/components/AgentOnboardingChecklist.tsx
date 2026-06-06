'use client';

import { useTranslations } from 'next-intl';
import { Check, Rocket } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AGENT_ONBOARDING_STEPS } from '@/modules/agent-profile/constants/agent-profile.constants';
import { useAgentOnboarding } from '@/modules/agent-profile/queries/use-agent-onboarding.query';

export function AgentOnboardingChecklist() {
  const t = useTranslations('AgentOnboarding');
  const { data } = useAgentOnboarding();

  if (!data || data.allComplete) return null;

  const completedByKey = new Map(data.steps.map((step) => [step.key, step.completed]));
  const percent = Math.round((data.completedCount / data.totalCount) * 100);

  return (
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
      <div className='flex items-start gap-3 border-b border-divider px-5 py-4'>
        <span
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vivid-iris-soft text-vivid-iris'
          aria-hidden='true'
        >
          <Rocket className='h-4 w-4' />
        </span>
        <span className='flex min-w-0 flex-1 flex-col'>
          <span className='text-base font-bold text-ink-900'>{t('title')}</span>
          <span className='text-sm text-foggy'>{t('subtitle')}</span>
        </span>
      </div>

      <div className='flex flex-col gap-2 px-5 py-4'>
        <div className='flex items-center justify-between text-sm font-medium text-ink-900'>
          <span>
            {t('progressLabel', {
              completed: data.completedCount,
              total: data.totalCount,
            })}
          </span>
          <span className='tabular-nums text-foggy'>{t('percent', { percent })}</span>
        </div>
        <Progress value={percent} aria-label={t('title')} />
      </div>

      <ul className='flex flex-col divide-y divide-divider border-t border-divider'>
        {AGENT_ONBOARDING_STEPS.map((step) => {
          const done = completedByKey.get(step.key) ?? false;
          const Icon = step.icon;

          return (
            <li key={step.key} className='flex items-center gap-3 px-5 py-4'>
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
                <span className='shrink-0 text-xs font-medium text-vivid-mint-strong'>{t('done')}</span>
              ) : (
                <Link href={step.href} className='shrink-0 no-underline'>
                  <Button size='sm' variant='outline'>
                    {t('start')}
                  </Button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
