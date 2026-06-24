import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';
import { PICK_A_TEST_FEATURED, PICK_A_TEST_SECONDARY } from '../constants/parents-landing.constants';

export async function ParentsPickATest() {
  const t = await getTranslations('ParentsPickATest');
  const testCards = [...PICK_A_TEST_FEATURED, ...PICK_A_TEST_SECONDARY];

  return (
    <section className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10'>
          <div className='flex flex-col gap-8'>
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

          <div className='grid grid-cols-2 gap-4 sm:hidden'>
            {testCards.map((key, index) => (
              <article
                key={key}
                className={`flex min-h-32 flex-col gap-1.5 rounded-lg bg-card p-5 shadow-2 ${
                  index === testCards.length - 1 ? 'col-span-2' : ''
                }`}
              >
                <h3 className='text-base font-semibold leading-tight text-ink-900'>
                  {t(`tests.${key}.name`)}
                </h3>
                <p className='line-clamp-2 text-xs leading-snug text-foggy'>
                  {t(`tests.${key}.fullName`)}
                </p>
                <p className='mt-auto line-clamp-2 pt-2 text-xs font-medium leading-snug text-primary'>
                  {t(`tests.${key}.description`)}
                </p>
              </article>
            ))}
          </div>

          <div className='hidden flex-col gap-5 sm:flex'>
            <div className='grid grid-cols-2 gap-5'>
              {PICK_A_TEST_FEATURED.map((key) => (
                <article
                  key={key}
                  className='flex flex-col gap-2 rounded-lg bg-card p-5 shadow-2 transition-shadow duration-300 ease-out-quart hover:shadow-3 motion-reduce:transition-none'
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

            <div className='grid grid-cols-3 gap-5'>
              {PICK_A_TEST_SECONDARY.map((key) => (
                <article
                  key={key}
                  className='flex flex-col gap-2 rounded-lg bg-card p-5 shadow-2 transition-shadow duration-300 ease-out-quart hover:shadow-3 motion-reduce:transition-none'
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

        <div className='rounded-lg border border-border bg-card p-5 shadow-2 md:p-6'>
          <p className='text-body-sm text-ink-900'>
            <span className='font-semibold'>{t('reassurance.title')}</span>{' '}
            {t('reassurance.body')}
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
