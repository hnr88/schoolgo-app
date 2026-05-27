'use client';

import { useTranslations } from 'next-intl';
import { ParentDashboardHeader } from '@/modules/dashboard/parent/components/ParentDashboardHeader';
import { ParentStudentsSummaryCard } from '@/modules/dashboard/parent/components/ParentStudentsSummaryCard';
import { ParentApplicationsSummaryCard } from '@/modules/dashboard/parent/components/ParentApplicationsSummaryCard';
import { ParentTestsSummaryCard } from '@/modules/dashboard/parent/components/ParentTestsSummaryCard';
import { ParentQuickActions } from '@/modules/dashboard/parent/components/ParentQuickActions';

export function ParentDashboard() {
  const t = useTranslations('ParentDashboard');

  return (
    <div className='flex flex-col gap-8'>
      <ParentDashboardHeader />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-1'>
          <ParentStudentsSummaryCard />
        </div>
        <div className='lg:col-span-1'>
          <ParentApplicationsSummaryCard />
        </div>
        <div className='lg:col-span-1'>
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
