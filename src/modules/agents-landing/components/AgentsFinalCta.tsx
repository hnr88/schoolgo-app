import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

export async function AgentsFinalCta() {
  const t = await getTranslations('AgentsFinalCta');
  return (
    <section className='py-24 md:py-32'>
      <SectionContainer className='flex flex-col items-center gap-6 text-center'>
        <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
        <h2 className='max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.025em] text-ink-900 md:text-7xl'>
          {t('headingPrefix')}{' '}
          <em className='italic font-medium text-primary'>{t('headingEmphasis')}</em>{' '}
          {t('headingSuffix')}
        </h2>
        <p className='max-w-xl text-body text-foggy md:text-lg'>{t('subheading')}</p>
        <div className='mt-4 flex flex-wrap justify-center gap-3'>
          <Link
            href='/agents'
            className='inline-flex items-center gap-2 rounded-pill bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
          >
            {t('ctaPrimary')}
            <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
          </Link>
          <Link
            href='/agents'
            className='inline-flex items-center gap-2 rounded-pill border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground no-underline transition-colors hover:bg-muted'
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
