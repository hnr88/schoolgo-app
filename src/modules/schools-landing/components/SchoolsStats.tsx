import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

const ITEMS = ['views', 'countries', 'enquiries', 'applications'] as const;

export async function SchoolsStats() {
  const t = await getTranslations('SchoolsStats');
  return (
    <section className='bg-ink-900 py-20 text-background md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow className='text-background/70'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-background md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-background/75 md:text-lg'>{t('subheading')}</p>
        </div>

        <dl className='grid grid-cols-2 gap-x-8 gap-y-10 border-t border-background/15 pt-10 md:grid-cols-4'>
          {ITEMS.map((key) => (
            <div key={key} className='flex flex-col gap-2'>
              <dd className='font-display text-4xl font-extrabold tracking-[-0.025em] text-background md:text-6xl'>
                {t(`items.${key}.value`)}
              </dd>
              <dt className='text-body-sm text-background/70'>{t(`items.${key}.label`)}</dt>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
