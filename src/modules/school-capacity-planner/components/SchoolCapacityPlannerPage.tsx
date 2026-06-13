'use client';

import { useTranslations } from 'next-intl';
import { YieldPlanSection } from '@/modules/school-capacity-planner/components/YieldPlanSection';
import { WaitlistSection } from '@/modules/school-capacity-planner/components/WaitlistSection';

export function SchoolCapacityPlannerPage() {
  const t = useTranslations('SchoolCapacityPlanner');

  return (
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
      </header>

      <YieldPlanSection />
      <WaitlistSection />
    </div>
  );
}
