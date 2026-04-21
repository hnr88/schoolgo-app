import type { ComponentType, SVGProps } from 'react';
import { CheckCircle2, Inbox, ListChecks, School } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const STEPS: Array<{ key: 'receive' | 'review' | 'decide' | 'onboard'; icon: IconComponent }> = [
  { key: 'receive', icon: Inbox },
  { key: 'review', icon: ListChecks },
  { key: 'decide', icon: CheckCircle2 },
  { key: 'onboard', icon: School },
];

export async function SchoolsTimeline() {
  const t = await getTranslations('SchoolsTimeline');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <ol className='relative grid grid-cols-1 gap-6 md:grid-cols-4'>
          <div
            className='pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-border md:block'
            aria-hidden='true'
          />
          {STEPS.map(({ key, icon: Icon }, index) => (
            <li
              key={key}
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
                  Step {index + 1}
                </span>
              </div>
              <h3 className='text-h4 font-semibold text-ink-900'>{t(`steps.${key}.title`)}</h3>
              <p className='text-body-sm text-foggy'>{t(`steps.${key}.description`)}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}
