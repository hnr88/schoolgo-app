import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer } from '@/modules/design-system';

const ITEMS = ['schools', 'requirements', 'tests', 'free'] as const;

export async function AgentsStatsBar() {
  const t = await getTranslations('AgentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='bg-ink-900 py-10 md:py-12'>
      <SectionContainer>
        <ul className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {ITEMS.map((key) => (
            <li
              key={key}
              className='text-center text-body-sm font-medium text-background/70'
            >
              {key === 'schools'
                ? t('items.schools', { count: stats.totalSchools })
                : t(`items.${key}`)}
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
