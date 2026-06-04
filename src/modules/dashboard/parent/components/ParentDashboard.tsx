'use client';

import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';
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

      <section className='overflow-hidden rounded-3xl border border-gray-100 bg-card shadow-2'>
        <div className='relative overflow-hidden border-b border-rausch-100 bg-primary-light p-6 md:p-7'>
          <span
            aria-hidden='true'
            className='pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-rausch-100/70'
          />
          <span
            aria-hidden='true'
            className='pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rotate-12 rounded-3xl bg-rausch-100/50'
          />

          <div className='relative flex items-center gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground'>
              <Zap className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
            </span>
            <div className='min-w-0 flex-1'>
              <h2 className='font-display text-xl font-bold tracking-tight text-ink-900'>
                {t('quickActionsTitle')}
              </h2>
              <p className='truncate text-sm text-foggy'>{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <div className='p-6 md:p-7'>
          <ParentQuickActions />
        </div>
      </section>
    </div>
  );
}
