import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer } from '@/modules/design-system';

const ITEMS = ['schools', 'requirements', 'tests', 'free'] as const;

export async function AgentsStatsBar() {
  const t = await getTranslations('AgentsStatsBar');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='border-y border-border bg-card py-6'>
      <SectionContainer>
        <ul className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-body-sm font-medium text-foggy'>
          {ITEMS.map((key, i) => (
            <li key={key} className='flex items-center gap-2'>
              {i > 0 && (
                <span className='h-1 w-1 rounded-full bg-foggy/40' aria-hidden='true' />
              )}
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
