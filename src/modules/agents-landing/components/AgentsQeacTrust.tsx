import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, StatusBadge, TrustBadge } from '@/modules/design-system';

export async function AgentsQeacTrust() {
  const t = await getTranslations('AgentsQeacTrust');
  return (
    <section id='trust' className='py-20 md:py-28'>
      <SectionContainer className='grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16'>
        <div className='flex flex-col gap-6 md:col-span-6'>
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
              <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-pill border border-border bg-muted'>
                <Image
                  src='https://images.unsplash.com/photo-1758518729459-235dcaadc611?auto=format&fit=crop&w=160&h=160&q=80'
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
                <span className='text-h4 font-semibold text-ink-900'>{t('profile.agentName')}</span>
              </div>
              <TrustBadge variant='qeac' label={t('profile.qeac')} />
            </header>

            <dl className='grid grid-cols-2 gap-5 pt-5 sm:grid-cols-4'>
              {(['yearsActive', 'students', 'placements', 'languages'] as const).map((key) => (
                <div key={key} className='flex flex-col gap-1'>
                  <dt
                    className='text-caption font-semibold uppercase text-foggy'
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {t(`profile.${key}`)}
                  </dt>
                  <dd className='text-h3 font-bold text-ink-900'>
                    {key === 'yearsActive' && '8'}
                    {key === 'students' && '143'}
                    {key === 'placements' && '37'}
                    {key === 'languages' && t('profile.languagesValue')}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </SectionContainer>
    </section>
  );
}
