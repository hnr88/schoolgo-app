import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer } from '@/modules/design-system';
import { STATS_BAR_ITEMS } from '../constants/agents-landing.constants';

export async function AgentsStatsBar() {
  const t = await getTranslations('AgentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='bg-ink-900 py-10 md:py-12'>
      <SectionContainer>
        <ul className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {STATS_BAR_ITEMS.map((key) => (
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
