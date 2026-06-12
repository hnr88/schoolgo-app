import { ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';

export async function ParentsAgentCta() {
  const t = await getTranslations('ParentsAgentCta');

  return (
    <section className='py-16 md:py-20'>
      <SectionContainer>
        <div className='relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-12 md:px-12 md:py-16'>
          <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
            <div className='absolute -right-20 -top-24 h-96 w-96 rounded-full bg-rausch-500 opacity-20 blur-3xl' />
            <div className='absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-babu-500 opacity-15 blur-3xl' />
          </div>

          <div className='relative flex flex-col items-center gap-8 text-center'>
            <SectionHeader
              align='center'
              size='lg'
              theme='dark'
              eyebrow={t('eyebrow')}
              heading={
                <>
                  {t('headingPrefix')}{' '}
                  <em className='italic font-medium text-rausch-300'>
                    {t('headingEmphasis')}
                  </em>{' '}
                  {t('headingSuffix')}
                </>
              }
              subheading={t('subheading')}
            />

            <Link
              href='/search?mode=agents'
              role='search'
              aria-label={t('searchAriaLabel')}
              className='flex w-full max-w-2xl items-center gap-3 rounded-pill border border-background/15 bg-background/10 p-1.5 pl-5 text-left transition-colors hover:bg-background/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900'
            >
              <Search
                className='h-5 w-5 shrink-0 text-background/60'
                strokeWidth={2}
                aria-hidden='true'
              />
              <span className='min-w-0 flex-1 truncate text-body text-background/60'>
                {t('searchPlaceholder')}
              </span>
              <span className='flex h-11 shrink-0 items-center gap-2 rounded-pill bg-rausch-700 px-5 text-sm font-semibold text-background shadow-brand'>
                {t('ctaPrimary')}
                <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
              </span>
            </Link>

            <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2'>
              <CtaLink href='/search?mode=agents' variant='secondary' size='md'>
                {t('ctaSecondary')}
              </CtaLink>
              <span className='inline-flex items-center gap-1.5 text-body-sm text-background/65'>
                <ShieldCheck
                  className='h-4 w-4 shrink-0 text-babu-300'
                  strokeWidth={2}
                  aria-hidden='true'
                />
                {t('reassurance')}
              </span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
