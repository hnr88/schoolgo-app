import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

import { AGENT_RELATIONSHIP_BULLETS } from '../constants/schools-landing.constants';

export async function SchoolsAgentRelationships() {
  const t = await getTranslations('SchoolsAgentRelationships');
  return (
    <section id='agent-relationships' className='bg-ink-900 py-16 text-background md:py-20'>
      <SectionContainer className='grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-8 md:col-span-6'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />
          <ul className='mt-4 flex flex-col gap-5'>
            {AGENT_RELATIONSHIP_BULLETS.map(({ key, icon: Icon }) => (
              <li key={key} className='flex gap-4'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-background/10 text-background'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <p className='text-body text-background/80'>{t(`bullets.${key}`)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:col-span-6'>
          <div className='rounded-2xl border border-background/10 bg-background/5 p-8 shadow-3 md:p-10'>
            <p className='font-display text-4xl font-extrabold tracking-tight text-background md:text-5xl'>
              {t('cardTitle')}
            </p>
            <p className='mt-3 max-w-sm text-body-sm text-background/70'>{t('cardBody')}</p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
