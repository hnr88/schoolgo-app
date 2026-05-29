import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaLink, Eyebrow, SectionContainer, TrustBadge } from '@/modules/design-system';
import { Link } from '@/i18n/navigation';
import { hueFromString, initialsFromName } from '@/modules/agents-landing/lib/featured-schools';

import { getFeaturedSchools } from '../lib/featured-schools';

export async function SchoolsHero() {
  const [t, tc, schools] = await Promise.all([
    getTranslations('SchoolsHero'),
    getTranslations('Common'),
    getFeaturedSchools(3),
  ]);
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-arches-50/40 via-arches-50/10 to-transparent pt-28 pb-16 md:pt-36 md:pb-20'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute -right-20 -top-20 h-[700px] w-[700px] rounded-full bg-arches-200 opacity-25 blur-[140px]' />
        <div className='absolute -left-32 bottom-[-10%] h-[500px] w-[500px] rounded-full bg-arches-100 opacity-30 blur-[120px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.05]'>
          <defs>
            <pattern id='schools-hex' width='56' height='48' patternUnits='userSpaceOnUse'>
              <path d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z' fill='none' stroke='currentColor' strokeWidth='0.5' transform='scale(0.75)' />
              <path d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z' fill='none' stroke='currentColor' strokeWidth='0.5' transform='translate(28 24) scale(0.75)' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#schools-hex)' />
        </svg>
      </div>
      <SectionContainer className='relative grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-8 md:col-span-6'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h1 className='font-display text-5xl font-extrabold leading-display-xl tracking-display-lg text-ink-900 md:text-7xl'>
            {t('headlinePrefix')}{' '}
            <em className='font-bold italic text-primary'>{t('headlineEmphasis')}</em>{' '}
            {t('headlineSuffix')}
          </h1>
          <p className='max-w-xl text-body text-foggy md:text-lg md:leading-relaxed'>
            {t('lede')}
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <CtaLink href='/search' size='lg' arrow>
              {t('ctaPrimary')}
            </CtaLink>
          </div>
        </div>

        <div className='md:col-span-6'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-3'>
            <div className='flex items-center justify-between border-b border-divider bg-muted px-5 py-3'>
              <span className='text-body-sm font-semibold text-ink-900'>
                {tc('featured.eyebrow')}
              </span>
              <TrustBadge variant='qeac' label={tc('qeacVerified')} />
            </div>
            <ul className='divide-y divide-divider'>
              {schools.map((school) => (
                <li key={school.slug}>
                  <Link
                    href={`/school/schools/${school.slug}`}
                    className='group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='relative h-11 w-11 shrink-0 overflow-hidden rounded-pill border border-border bg-card'>
                      {school.logoUrl ? (
                        <Image
                          src={school.logoUrl}
                          alt=''
                          fill
                          sizes='44px'
                          className='object-contain p-2'
                          aria-hidden='true'
                        />
                      ) : (
                        <div
                          className='flex h-full w-full items-center justify-center text-xs font-bold uppercase text-white'
                          style={{ backgroundColor: `hsl(${hueFromString(school.name)} 65% 45%)` }}
                        >
                          {initialsFromName(school.name)}
                        </div>
                      )}
                    </div>
                    <div className='flex min-w-0 flex-1 flex-col'>
                      <span className='text-body-sm font-semibold text-ink-900 group-hover:text-primary-strong'>
                        {school.name}
                      </span>
                      <span className='text-caption text-foggy'>
                        {school.suburb}, {school.state}
                      </span>
                    </div>
                    <ArrowRight className='h-4 w-4 shrink-0 text-foggy transition-transform group-hover:translate-x-0.5 group-hover:text-primary-strong' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
