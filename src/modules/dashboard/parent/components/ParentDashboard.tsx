'use client';

import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/modules/design-system';
import { ParentDashboardHeader } from '@/modules/dashboard/parent/components/ParentDashboardHeader';
import { ParentStatTiles } from '@/modules/dashboard/parent/components/ParentStatTiles';
import { ParentPipelineCard } from '@/modules/dashboard/parent/components/ParentPipelineCard';
import { ParentActionRequiredCard } from '@/modules/dashboard/parent/components/ParentActionRequiredCard';
import { ParentTimelineCard } from '@/modules/dashboard/parent/components/ParentTimelineCard';
import { ParentUpcomingCard } from '@/modules/dashboard/parent/components/ParentUpcomingCard';
import { ParentCompletenessCard } from '@/modules/dashboard/parent/components/ParentCompletenessCard';
import { ParentRecentApplicationsTable } from '@/modules/dashboard/parent/components/ParentRecentApplicationsTable';
import { ParentStudentsSummaryCard } from '@/modules/dashboard/parent/components/ParentStudentsSummaryCard';
import { ParentTestsSummaryCard } from '@/modules/dashboard/parent/components/ParentTestsSummaryCard';
import { ParentQuickActions } from '@/modules/dashboard/parent/components/ParentQuickActions';
import { ParentOnboardingSection } from '@/modules/onboarding';

export function ParentDashboard() {
  const t = useTranslations('ParentDashboard');

  return (
    <div className='flex flex-col gap-8'>
      <ParentDashboardHeader />

      <ParentOnboardingSection />

      <ParentStatTiles />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <ParentPipelineCard />
        </div>
        <div className='lg:col-span-1'>
          <ParentActionRequiredCard />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <ParentRecentApplicationsTable />
        </div>
        <div className='flex flex-col gap-6 lg:col-span-1 lg:grid lg:auto-rows-fr'>
          <ParentTimelineCard />
          <ParentUpcomingCard />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-1'>
          <ParentCompletenessCard />
        </div>
        <div className='lg:col-span-1'>
          <ParentStudentsSummaryCard />
        </div>
        <div className='lg:col-span-1'>
          <ParentTestsSummaryCard />
        </div>
      </div>

      <section className='flex flex-col gap-6 rounded-2xl bg-primary p-6 shadow-2 md:p-8'>
        <div className='flex flex-col gap-1.5'>
          <Eyebrow className='text-background/60'>{t('quickActionsTitle')}</Eyebrow>
          <h2 className='font-display text-xl font-bold tracking-tight text-background'>
            {t('subtitle')}
          </h2>
        </div>
        <ParentQuickActions />
      </section>
    </div>
  );
}
