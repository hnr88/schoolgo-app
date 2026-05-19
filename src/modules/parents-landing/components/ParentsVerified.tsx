import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, SchoolCard } from '@/modules/design-system';
import { VERIFIED_CARDS } from '../constants/parents-landing.constants';

export async function ParentsVerified() {
  const [t, tc] = await Promise.all([
    getTranslations('ParentsVerified'),
    getTranslations('Common'),
  ]);
  return (
    <section id='trusted-agents' className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
          <div className='flex w-max snap-x snap-mandatory gap-4 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:grid-cols-4'>
            {VERIFIED_CARDS.map((card) => (
              <div key={card.key} className='w-64 snap-start sm:w-auto'>
                <SchoolCard
                  href='/search'
                  photoUrl={card.image}
                  name={t(`cards.${card.key}.name`)}
                  location={`${t(`cards.${card.key}.location`)} · ${t(`cards.${card.key}.sector`)}`}
                  cricosLabel={tc('cricosVerified')}
                  className='transition-transform hover:-translate-y-1'
                />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
