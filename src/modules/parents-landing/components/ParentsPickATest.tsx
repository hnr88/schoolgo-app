import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';

const FEATURED: Array<'aeas' | 'idat' | 'duolingo' | 'ielts'> = [
  'aeas',
  'idat',
  'duolingo',
  'ielts',
];

const SECONDARY: Array<'pte' | 'cambridge' | 'toefl'> = ['pte', 'cambridge', 'toefl'];

export async function ParentsPickATest() {
  const t = await getTranslations('ParentsPickATest');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16'>
          <div className='flex flex-col gap-6'>
            <SectionHeader
              eyebrow={t('eyebrow')}
              heading={
                <>
                  {t('heading')}{' '}
                  <em className='font-medium italic text-primary'>
                    {t('headingAccent')}
                  </em>
                </>
              }
              subheading={t('subheading')}
            />
            <div>
              <CtaLink href='/search' arrow>
                {t('cta')}
              </CtaLink>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              {FEATURED.map((key) => (
                <article
                  key={key}
                  className='flex flex-col gap-2 rounded-lg border border-border bg-card p-5 shadow-2 transition-shadow hover:shadow-3'
                >
                  <h3 className='text-lg font-semibold text-ink-900'>
                    {t(`tests.${key}.name`)}
                  </h3>
                  <p className='text-caption leading-snug text-foggy'>
                    {t(`tests.${key}.fullName`)}
                  </p>
                  <p className='mt-auto pt-2 text-caption font-medium text-primary'>
                    {t(`tests.${key}.description`)}
                  </p>
                </article>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-4'>
              {SECONDARY.map((key) => (
                <article
                  key={key}
                  className='flex flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3 shadow-1'
                >
                  <h3 className='text-body-sm font-semibold text-ink-900'>
                    {t(`tests.${key}.name`)}
                  </h3>
                  <p className='text-caption leading-snug text-foggy'>
                    {t(`tests.${key}.fullName`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
