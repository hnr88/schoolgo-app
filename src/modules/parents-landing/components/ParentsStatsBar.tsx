import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer } from '@/modules/design-system';

const ITEMS = ['schools', 'states', 'sectors', 'fees', 'verified'] as const;

export async function ParentsStatsBar() {
  const t = await getTranslations('ParentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='bg-ink-900 py-10 md:py-12'>
      <SectionContainer>
        <dl className='grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5'>
          {ITEMS.map((key) => (
            <div key={key} className='flex flex-col gap-1 text-center'>
              <dd className='font-display text-2xl font-extrabold tracking-tight text-background md:text-3xl'>
                {key === 'schools'
                  ? t('items.schools.value', { count: stats.totalSchools })
                  : t(`items.${key}.value`)}
              </dd>
              <dt className='text-caption text-background/70'>{t(`items.${key}.label`)}</dt>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
