'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, EmptyState, SectionHeading } from '@/modules/core';
import { useSchoolFunnel } from '@/modules/school-dashboard/queries/use-school-funnel.query';
import { useSchoolForecast } from '@/modules/school-dashboard/queries/use-school-forecast.query';
import { SchoolFunnelChart } from '@/modules/school-dashboard/components/SchoolFunnelChart';
import { SchoolAgentSourceTable } from '@/modules/school-dashboard/components/SchoolAgentSourceTable';
import { SchoolForecastTable } from '@/modules/school-dashboard/components/SchoolForecastTable';
import { buildIntakeYearOptions } from '@/modules/school-dashboard/lib/school-analytics.lib';

const ALL_YEARS = 'all';

export function SchoolAnalyticsPage() {
  const t = useTranslations('SchoolAnalytics');
  const [yearValue, setYearValue] = useState<string>(ALL_YEARS);
  const yearOptions = buildIntakeYearOptions(new Date().getFullYear());
  const intakeYear = yearValue === ALL_YEARS ? undefined : Number(yearValue);

  const funnel = useSchoolFunnel({ intakeYear });
  const forecast = useSchoolForecast({ intakeYear });

  const isLoading = funnel.isLoading || forecast.isLoading;
  const isError = funnel.isError || forecast.isError;

  const handleRetry = () => {
    funnel.refetch();
    forecast.refetch();
  };

  const handleYearChange = (value: string | null) => {
    setYearValue(value ?? ALL_YEARS);
  };

  const yearSelector = (
    <Select value={yearValue} onValueChange={handleYearChange}>
      <SelectTrigger className='w-40' aria-label={t('intakeYearLabel')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_YEARS}>{t('allYears')}</SelectItem>
        {yearOptions.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className='flex flex-col gap-8'>
      <SectionHeading
        title={t('title')}
        description={t('subtitle')}
        level={1}
        icon={BarChart3}
        actions={yearSelector}
      />

      {isLoading ? (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-24 w-full rounded-xl' />
          <Skeleton className='h-64 w-full rounded-xl' />
          <Skeleton className='h-48 w-full rounded-xl' />
        </div>
      ) : isError || !funnel.data || !forecast.data ? (
        <ErrorState framed message={t('loadError')} onRetry={handleRetry} retryLabel={t('retry')} />
      ) : funnel.data.totals.received === 0 &&
        funnel.data.agentSource.length === 0 &&
        forecast.data.intakes.length === 0 ? (
        <EmptyState framed icon={BarChart3} title={t('empty')} description={t('emptyHint')} />
      ) : (
        <>
          <SchoolFunnelChart
            stages={funnel.data.stages}
            conversion={funnel.data.conversion}
            totals={funnel.data.totals}
          />
          <SchoolAgentSourceTable agentSource={funnel.data.agentSource} />
          <SchoolForecastTable intakes={forecast.data.intakes} />
        </>
      )}
    </div>
  );
}
