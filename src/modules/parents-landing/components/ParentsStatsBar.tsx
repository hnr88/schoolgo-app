import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

export async function ParentsStatsBar() {
  const t = await getTranslations('ParentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='bg-ink-900 py-20 md:py-28'>
      <SectionContainer>
        <div className='grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <dl className='grid grid-cols-2 gap-3 md:gap-5'>
            <div className='flex flex-col gap-1 border-b-2 border-rausch-500 pb-3 md:pb-4'>
              <dd className='font-display text-3xl font-extrabold tracking-tight tabular-nums text-background md:text-6xl'>
                {t('items.schools.value', { count: stats.totalSchools })}
              </dd>
              <dt className='text-caption text-background/60 md:text-body-sm'>
                {t('items.schools.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 border-b-2 border-background/30 pb-3 md:pb-4'>
              <dd className='font-display text-3xl font-extrabold tracking-tight tabular-nums text-background md:text-6xl'>
                {t('items.states.value')}
              </dd>
              <dt className='text-caption text-background/60 md:text-body-sm'>
                {t('items.states.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 rounded-md border border-background/10 bg-background/5 px-3 py-2 md:px-4 md:py-3'>
              <dd className='font-display text-xl font-bold tracking-tight tabular-nums text-babu-100 md:text-3xl'>
                {t('items.sectors.value')}
              </dd>
              <dt className='text-caption text-background/50'>
                {t('items.sectors.label')}
              </dt>
            </div>

            <div className='flex flex-col gap-1 rounded-md border border-background/10 bg-background/5 px-3 py-2 md:px-4 md:py-3'>
              <dd className='font-display text-xl font-bold tracking-tight tabular-nums text-background md:text-3xl'>
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
