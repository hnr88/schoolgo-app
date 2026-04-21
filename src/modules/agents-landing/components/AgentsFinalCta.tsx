import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';

export async function AgentsFinalCta() {
  const t = await getTranslations('AgentsFinalCta');

  return (
    <section className='py-24 md:py-32'>
      <SectionContainer className='flex flex-col items-center gap-6 text-center'>
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
          <CtaLink href='/agents' size='lg' arrow>
            {t('ctaPrimary')}
          </CtaLink>
          <CtaLink href='/agents' variant='secondary' size='lg'>
            {t('ctaSecondary')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
