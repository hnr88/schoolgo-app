import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

export async function ParentsStatsBar() {
  const t = await getTranslations('ParentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='bg-ink-900 py-10 md:py-28'>
      <SectionContainer>
        <div className='grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <dl className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-1 border-b-2 border-rausch-500 pb-4'>
              <dd className='font-display text-5xl font-extrabold tracking-[-0.03em] text-background md:text-6xl'>
                {t('items.schools.value', { count: stats.totalSchools })}
              </dd>
              <dt className='text-body-sm text-background/60'>
                {t('items.schools.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 border-b-2 border-background/30 pb-4'>
              <dd className='font-display text-5xl font-extrabold tracking-[-0.03em] text-background md:text-6xl'>
                {t('items.states.value')}
              </dd>
              <dt className='text-body-sm text-background/60'>
                {t('items.states.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 rounded-md border border-background/10 bg-background/5 px-4 py-3'>
              <dd className='font-display text-2xl font-bold tracking-[-0.02em] text-babu-100 md:text-3xl'>
                {t('items.sectors.value')}
              </dd>
              <dt className='text-caption text-background/50'>
                {t('items.sectors.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 rounded-md border border-background/10 bg-background/5 px-4 py-3'>
              <dd className='font-display text-2xl font-bold tracking-[-0.02em] text-background md:text-3xl'>
                {t('items.fees.value')}
              </dd>
              <dt className='text-caption text-background/50'>{t('items.fees.label')}</dt>
            </div>
          </dl>
        </div>
      </SectionContainer>
    </section>
  );
}
