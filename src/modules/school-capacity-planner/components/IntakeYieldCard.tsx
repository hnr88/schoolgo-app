import { useTranslations } from 'next-intl';
import { SurfaceCard } from '@/modules/core';
import type { YieldPlanIntake } from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { formatRate } from '@/modules/school-capacity-planner/lib/format';
import { IntakeScenarios } from '@/modules/school-capacity-planner/components/IntakeScenarios';

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <span className='text-xs font-medium uppercase tracking-wide text-foggy'>{label}</span>
      <span className='font-display text-lg font-bold tabular-nums text-ink-900'>{value}</span>
    </div>
  );
}

export function IntakeYieldCard({ intake }: { intake: YieldPlanIntake }) {
  const t = useTranslations('SchoolCapacityPlanner');
  const dash = '—';

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex flex-col gap-0.5'>
        <h3 className='text-base font-semibold text-ink-900'>{intake.yearLevel}</h3>
        <p className='text-sm text-muted-foreground'>{intake.intakePeriod}</p>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        <Metric label={t('places')} value={intake.totalPlaces ?? dash} />
        <Metric label={t('offersOut')} value={intake.offersOut} />
        <Metric label={t('accepted')} value={intake.accepted} />
        <Metric label={t('remaining')} value={intake.remaining ?? dash} />
        <Metric label={t('projectedMelt')} value={intake.projectedMelt} />
        <Metric label={t('overOffer')} value={`+${intake.recommendedOverOffer}`} />
      </div>

      <p className='text-xs text-muted-foreground'>
        {t('historySummary', {
          meltRate: formatRate(intake.meltRate),
          acceptRate: formatRate(intake.acceptRate),
          samples: intake.sampleCount,
        })}
      </p>

      <div className='flex flex-col gap-2'>
        <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>
          {t('scenariosLabel')}
        </span>
        <IntakeScenarios scenarios={intake.scenarios} />
      </div>
    </SurfaceCard>
  );
}
