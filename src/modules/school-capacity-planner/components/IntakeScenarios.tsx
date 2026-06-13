import { useTranslations } from 'next-intl';
import type { YieldScenario } from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { formatRate } from '@/modules/school-capacity-planner/lib/format';

export function IntakeScenarios({ scenarios }: { scenarios: YieldScenario[] }) {
  const t = useTranslations('SchoolCapacityPlanner');

  return (
    <div className='grid grid-cols-3 gap-3'>
      {scenarios.map((scenario) => (
        <div
          key={scenario.label}
          className='flex flex-col gap-1 rounded-lg bg-page-surface p-3'
        >
          <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>
            {t(`scenario_${scenario.label}`)}
          </span>
          <span className='font-display text-xl font-bold tabular-nums text-ink-900'>
            {scenario.recommendedOffers}
          </span>
          <span className='text-xs text-muted-foreground'>
            {t('scenarioMelt', { rate: formatRate(scenario.assumedMeltRate) })}
          </span>
          <span className='text-xs text-muted-foreground'>
            {t('scenarioEnrolment', { count: scenario.projectedEnrolment })}
          </span>
        </div>
      ))}
    </div>
  );
}
