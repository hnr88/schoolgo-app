import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { CtaLink, Eyebrow, SectionContainer } from '@/modules/design-system';

export async function AgentsHero() {
  const t = await getTranslations('AgentsHero');
  const tc = await getTranslations('Common');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24'>
      <div
        className='pointer-events-none absolute -right-20 top-10 h-[28rem] w-[28rem] rounded-full bg-rausch-100/60 blur-3xl'
        aria-hidden='true'
      />
      <SectionContainer className='relative grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-6 md:col-span-7'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h1 className='font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-ink-900 md:text-7xl'>
            {t('headlinePrefix')}{' '}
            <em className='italic font-medium text-primary'>{t('headlineEmphasis')}</em>
          </h1>
          <p className='max-w-xl text-body text-foggy md:text-lg md:leading-relaxed'>
            {t('lede', { count: stats.totalSchools })}
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <CtaLink href='/agents' size='lg' arrow>
              {t('ctaPrimary')}
            </CtaLink>
            <CtaLink href='#how-it-works' variant='secondary' size='lg'>
              {t('ctaSecondary')}
            </CtaLink>
          </div>

          <dl className='mt-6 grid grid-cols-1 gap-5 border-t border-divider pt-6 sm:grid-cols-3'>
            {(['schools', 'sectors', 'commission'] as const).map((k) => (
              <div key={k} className='flex flex-col gap-1'>
                <dt
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t(`stats.${k}.label`)}
                </dt>
                <dd className='font-display text-3xl font-bold tracking-tight text-ink-900 md:text-4xl'>
                  {k === 'schools'
                    ? t('stats.schools.value', { count: stats.totalSchools })
                    : t(`stats.${k}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='relative md:col-span-5'>
          <div className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-3'>
            <Image
              src='https://picsum.photos/seed/schoolgo-agent-hero/720/900'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw, 420px'
              className='object-cover'
              aria-hidden='true'
            />
          </div>
          <div className='absolute -left-4 top-6 flex max-w-[16rem] items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
              <BadgeCheck className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
            </div>
            <div className='flex flex-col'>
              <span className='text-body-sm font-semibold text-ink-900'>{tc('qeacVerified')}</span>
              <span className='text-caption text-foggy'>{t('badgeMeta')}</span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
