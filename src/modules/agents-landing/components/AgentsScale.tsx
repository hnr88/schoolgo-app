import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader, TrustBadge } from '@/modules/design-system';
import { SCALE_AGENTS } from '../constants/agents-landing.constants';

export async function AgentsScale() {
  const [t, tc] = await Promise.all([
    getTranslations('AgentsScale'),
    getTranslations('Common'),
  ]);
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
          <div className='flex w-max snap-x snap-mandatory gap-4 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:grid-cols-4'>
            {SCALE_AGENTS.map((agent) => (
              <div key={agent.key} className='w-64 snap-start sm:w-auto'>
                <article className='flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-2 transition-shadow hover:shadow-3 sm:p-5'>
                  <div className='flex min-w-0 flex-wrap items-center gap-3'>
                    <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-pill border border-border bg-muted'>
                      <Image
                        src={agent.image}
                        alt=''
                        fill
                        sizes='48px'
                        className='object-cover'
                        aria-hidden='true'
                      />
                    </div>
                    <TrustBadge variant='qeac' label={tc('qeacVerified')} className='max-w-full' />
                  </div>
                  <div className='flex min-w-0 flex-col'>
                    <span className='line-clamp-1 text-body-sm font-semibold text-ink-900'>
                      {t(`agents.${agent.key}.name`)}
                    </span>
                    <span className='line-clamp-1 text-caption text-foggy'>
                      {t(`agents.${agent.key}.region`)}
                    </span>
                  </div>
                  <p className='text-caption text-foggy'>{t(`agents.${agent.key}.meta`)}</p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div>
          <CtaLink href='/agents' arrow>
            {t('cta')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
