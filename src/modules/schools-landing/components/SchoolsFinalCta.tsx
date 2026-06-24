import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';

export async function SchoolsFinalCta() {
  const t = await getTranslations('SchoolsFinalCta');

  return (
    <section className='py-20 md:py-24'>
      <SectionContainer className='flex flex-col items-center gap-8 text-center'>
        <SectionHeader
          align='center'
          size='lg'
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('headingPrefix')}{' '}
              <em className='italic font-medium text-primary'>{t('headingEmphasis')}</em>{' '}
              {t('headingSuffix')}
            </>
          }
          subheading={t('subheading')}
        />

        <div className='mt-4 flex flex-wrap justify-center gap-3'>
          <CtaLink href='/school/sign-up' size='lg' arrow>
            {t('ctaPrimary')}
          </CtaLink>
          <CtaLink href='/contact' variant='secondary' size='lg'>
            {t('ctaSecondary')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
