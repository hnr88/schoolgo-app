import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';

const TESTS: Array<'aeas' | 'idat' | 'duolingo' | 'ielts' | 'pte' | 'cambridge' | 'toefl'> = [
  'aeas',
  'idat',
  'duolingo',
  'ielts',
  'pte',
  'cambridge',
  'toefl',
];

export async function ParentsPickATest() {
  const t = await getTranslations('ParentsPickATest');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('heading')}{' '}
              <em className='italic font-medium text-primary'>{t('headingAccent')}</em>
            </>
          }
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
          {TESTS.map((key) => (
            <article
              key={key}
              className='flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-2 transition-shadow hover:shadow-3'
            >
              <h3 className='text-h4 font-semibold text-ink-900'>{t(`tests.${key}.name`)}</h3>
              <p className='text-caption text-foggy leading-snug'>{t(`tests.${key}.fullName`)}</p>
              <p className='mt-auto text-caption font-medium text-primary'>
                {t(`tests.${key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <div>
          <CtaLink href='/search' arrow>
            {t('cta')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
