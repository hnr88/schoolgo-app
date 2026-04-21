import Image from 'next/image';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

const ROWS: Array<{ key: 'a' | 'b' | 'c'; tone: 'new' | 'reviewing' | 'offer' }> = [
  { key: 'a', tone: 'new' },
  { key: 'b', tone: 'reviewing' },
  { key: 'c', tone: 'offer' },
];

const TONE_CLASSES: Record<(typeof ROWS)[number]['tone'], string> = {
  new: 'bg-rausch-50 text-rausch-700',
  reviewing: 'bg-arches-50 text-arches-700',
  offer: 'bg-babu-50 text-babu-700',
};

export async function SchoolsHero() {
  const t = await getTranslations('SchoolsHero');
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
            <Link
              href='/schools'
              className='inline-flex items-center gap-2 rounded-pill bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
            >
              {t('ctaPrimary')}
              <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
            </Link>
            <Link
              href='#how-it-works'
              className='inline-flex items-center gap-2 rounded-pill border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground no-underline transition-colors hover:bg-muted'
            >
              {t('ctaSecondary')}
            </Link>
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
              <span className='inline-flex items-center gap-1.5 rounded-pill bg-babu-50 px-2.5 py-1 text-caption font-semibold text-babu-700'>
                <BadgeCheck className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                QEAC Verified
              </span>
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
                  <span
                    className={`rounded-pill px-2.5 py-1 text-caption font-semibold ${TONE_CLASSES[row.tone]}`}
                  >
                    {t(`inbox.rows.${row.key}.status`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
