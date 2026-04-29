import { CheckCircle2, Inbox, ListChecks, School } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, StatusBadge } from '@/modules/design-system';
import type { IconComponent } from '@/modules/design-system';

const STEPS: Array<{ key: 'receive' | 'review' | 'decide' | 'onboard'; icon: IconComponent; comingSoon?: true }> = [
  { key: 'receive', icon: Inbox, comingSoon: true },
  { key: 'review', icon: ListChecks, comingSoon: true },
  { key: 'decide', icon: CheckCircle2, comingSoon: true },
  { key: 'onboard', icon: School, comingSoon: true },
];

export async function SchoolsTimeline() {
  const t = await getTranslations('SchoolsTimeline');
  const tc = await getTranslations('Common');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <ol className='relative grid grid-cols-1 gap-6 md:grid-cols-4'>
          <div
            className='pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-border md:block'
            aria-hidden='true'
          />
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
            <li
              key={step.key}
              className='relative flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-2'
            >
              <div className='flex items-center gap-3'>
                <span className='relative flex h-10 w-10 items-center justify-center rounded-pill bg-primary text-on-primary'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {tc('step', { number: index + 1 })}
                </span>
                {step.comingSoon && (
                  <StatusBadge>{t(`steps.${step.key}.comingSoon`)}</StatusBadge>
                )}
              </div>
              <h3 className='text-h4 font-semibold text-ink-900'>{t(`steps.${step.key}.title`)}</h3>
              <p className='text-body-sm text-foggy'>{t(`steps.${step.key}.description`)}</p>
            </li>
            );
          })}
        </ol>
      </SectionContainer>
    </section>
  );
}
