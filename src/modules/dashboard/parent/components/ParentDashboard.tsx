'use client';

import { useTranslations } from 'next-intl';
import { ParentDashboardHeader } from '@/modules/dashboard/parent/components/ParentDashboardHeader';
import { ParentStatTiles } from '@/modules/dashboard/parent/components/ParentStatTiles';
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
          <ParentRecentApplicationsTable />
        </div>
        <div className='flex flex-col gap-6 lg:col-span-1'>
          <ParentStudentsSummaryCard />
          <ParentTestsSummaryCard />
        </div>
      </div>

      <section className='flex flex-col gap-4'>
        <h2 className='text-base font-bold text-ink-900'>{t('quickActionsTitle')}</h2>
        <ParentQuickActions />
      </section>
    </div>
  );
}
