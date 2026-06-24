import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, StatusBadge, TrustBadge } from '@/modules/design-system';
import { QEAC_VISIBILITY_ROWS } from '../constants/agents-landing.constants';
import type { QeacVisibilityKey } from '../types/agents-landing.types';

const VISIBILITY_TONES: Record<QeacVisibilityKey, 'trust' | 'muted'> = {
  public: 'trust',
  optional: 'muted',
  private: 'muted',
};

export async function AgentsQeacTrust() {
  const t = await getTranslations('AgentsQeacTrust');

  return (
    <section id='trust' className='py-16 md:py-20'>
      <SectionContainer className='grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-8 md:col-span-6'>
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />
        </div>

        <div className='md:col-span-6'>
          <article className='relative rounded-2xl border border-border bg-card p-6 shadow-3 md:p-8'>
            <StatusBadge tone='muted' size='md' className='absolute top-4 right-4 px-3'>
              {t('sampleLabel')}
            </StatusBadge>
            <header className='flex items-center gap-4 border-b border-divider pb-5'>
              <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-pill border border-border'>
                <Image
                  src='https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80'
                  alt=''
                  fill
                  sizes='56px'
                  className='object-cover'
                />
              </div>
              <div className='flex min-w-0 flex-1 flex-col'>
                <span className='text-caption font-semibold uppercase tracking-eyebrow text-foggy'>
                  {t('profile.name')}
                </span>
                <span className='text-h4 font-semibold text-ink-900'>{t('profile.agentName')}</span>
              </div>
              <TrustBadge variant='qeac' label={t('profile.qeac')} />
            </header>

            <ul className='flex flex-col gap-5 pt-5'>
              {QEAC_VISIBILITY_ROWS.map((key) => (
                <li key={key} className='flex flex-col gap-1'>
                  <StatusBadge tone={VISIBILITY_TONES[key]} size='md' className='self-start px-3'>
                    {t(`visibility.${key}.label`)}
                  </StatusBadge>
                  <p className='text-body-sm text-foggy'>{t(`visibility.${key}.items`)}</p>
                </li>
              ))}
            </ul>

            <p className='mt-5 border-t border-divider pt-5 text-body-sm text-foggy'>
              {t('qeacNote')}
            </p>
          </article>
        </div>
      </SectionContainer>
    </section>
  );
}
