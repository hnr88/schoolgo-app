import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer, TrustBadge } from '@/modules/design-system';

export async function AgentsQeacTrust() {
  const t = await getTranslations('AgentsQeacTrust');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16'>
        <div className='flex flex-col gap-6 md:col-span-6'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='max-w-lg text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='md:col-span-6'>
          <article className='relative rounded-2xl border border-border bg-card p-6 shadow-3 md:p-8'>
            <span className='absolute top-4 right-4 rounded-pill bg-muted px-3 py-1 text-caption font-medium text-foggy'>
              {t('sampleLabel')}
            </span>
            <header className='flex items-center gap-4 border-b border-divider pb-5'>
              <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-pill border border-border bg-muted'>
                <Image
                  src='https://picsum.photos/seed/schoolgo-qeac-agent/160/160'
                  alt=''
                  fill
                  sizes='56px'
                  className='object-cover'
                  aria-hidden='true'
                />
              </div>
              <div className='flex min-w-0 flex-1 flex-col'>
                <span
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('profile.name')}
                </span>
                <span className='text-h4 font-semibold text-ink-900'>Mei Lin</span>
              </div>
              <TrustBadge variant='qeac' label={t('profile.qeac')} />
            </header>

            <dl className='grid grid-cols-2 gap-5 pt-5 sm:grid-cols-4'>
              <div className='flex flex-col gap-1'>
                <dt
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('profile.yearsActive')}
                </dt>
                <dd className='text-h3 font-bold text-ink-900'>8</dd>
              </div>
              <div className='flex flex-col gap-1'>
                <dt
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('profile.students')}
                </dt>
                <dd className='text-h3 font-bold text-ink-900'>143</dd>
              </div>
              <div className='flex flex-col gap-1'>
                <dt
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('profile.placements')}
                </dt>
                <dd className='text-h3 font-bold text-ink-900'>37</dd>
              </div>
              <div className='flex flex-col gap-1'>
                <dt
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('profile.languages')}
                </dt>
                <dd className='text-h3 font-bold text-ink-900'>中 · EN</dd>
              </div>
            </dl>
          </article>
        </div>
      </SectionContainer>
    </section>
  );
}
