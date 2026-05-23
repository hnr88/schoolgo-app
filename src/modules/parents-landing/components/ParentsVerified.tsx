import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, SchoolCard } from '@/modules/design-system';
import { getFeaturedSchools } from '../lib/featured-schools';

export async function ParentsVerified() {
  const [t, tc, schools] = await Promise.all([
    getTranslations('ParentsVerified'),
    getTranslations('Common'),
    getFeaturedSchools(),
  ]);

  return (
    <section id='trusted-agents' className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
          <div className='flex w-max snap-x snap-mandatory gap-4 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:grid-cols-4'>
            {schools.map((school) => (
              <div key={school.slug} className='w-64 snap-start sm:w-auto'>
                <SchoolCard
                  href={`/parent/schools/${school.slug}`}
                  photoUrl={school.photoUrl ?? undefined}
                  logoUrl={school.logoUrl ?? undefined}
                  name={school.name}
                  location={`${school.suburb}, ${school.state}`}
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
