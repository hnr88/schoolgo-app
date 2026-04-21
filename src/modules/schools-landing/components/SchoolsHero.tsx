import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { CtaLink, Eyebrow, SectionContainer, StatusBadge, TrustBadge } from '@/modules/design-system';

const ROWS: Array<{ key: 'a' | 'b' | 'c'; tone: 'brand' | 'featured' | 'trust' }> = [
  { key: 'a', tone: 'brand' },
  { key: 'b', tone: 'featured' },
  { key: 'c', tone: 'trust' },
];

export async function SchoolsHero() {
  const t = await getTranslations('SchoolsHero');
  const tc = await getTranslations('Common');
  return (
    <section className='relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24'>
      <div
        className='pointer-events-none absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-rausch-100/60 blur-3xl'
        aria-hidden='true'
      />
      <SectionContainer className='relative grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-6 md:col-span-6'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h1 className='font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-ink-900 md:text-7xl'>
            {t('headlinePrefix')}{' '}
            <em className='italic font-medium text-primary'>{t('headlineEmphasis')}</em>{' '}
            {t('headlineSuffix')}
          </h1>
          <p className='max-w-xl text-body text-foggy md:text-lg md:leading-relaxed'>
            {t('lede')}
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <CtaLink href='/schools' size='lg' arrow>
              {t('ctaPrimary')}
            </CtaLink>
            <CtaLink href='#how-it-works' variant='secondary' size='lg'>
              {t('ctaSecondary')}
            </CtaLink>
          </div>
        </div>

        <div className='md:col-span-6'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-3'>
            <div className='flex items-center justify-between border-b border-divider bg-muted px-5 py-3'>
              <div className='flex flex-col'>
                <span
                  className='text-caption font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('inbox.eyebrow')}
                </span>
                <span className='text-body-sm font-semibold text-ink-900'>
                  {t('inbox.countLabel')} · 23
                </span>
              </div>
              <TrustBadge variant='qeac' label={tc('qeacVerified')} />
            </div>
            <ul className='divide-y divide-divider'>
              {ROWS.map((row) => (
                <li key={row.key} className='flex items-center gap-4 px-5 py-4'>
                  <div className='relative h-11 w-11 shrink-0 overflow-hidden rounded-pill border border-border bg-muted'>
                    <Image
                      src={`https://picsum.photos/seed/schoolgo-inbox-${row.key}/160/160`}
                      alt=''
                      fill
                      sizes='44px'
                      className='object-cover'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='flex min-w-0 flex-1 flex-col'>
                    <span className='text-body-sm font-semibold text-ink-900'>
                      {t(`inbox.rows.${row.key}.name`)}
                    </span>
                    <span className='text-caption text-foggy'>
                      {t(`inbox.rows.${row.key}.meta`)}
                    </span>
                  </div>
                  <StatusBadge tone={row.tone} size='md'>
                    {t(`inbox.rows.${row.key}.status`)}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
