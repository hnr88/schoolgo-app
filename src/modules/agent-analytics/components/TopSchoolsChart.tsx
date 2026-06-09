'use client';

import { useTranslations } from 'next-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import {
  CHART_TOOLTIP_STYLE,
  SUBMITTED_BAR_FILL,
  TOP_SCHOOLS_LIMIT,
} from '@/modules/agent-analytics/constants/agent-analytics.constants';
import { truncateChartLabel } from '@/modules/agent-analytics/lib/format-analytics';
import type { SchoolAnalyticsRow } from '@/modules/agent-analytics/types/agent-analytics.types';

interface TopSchoolsChartProps {
  bySchool: SchoolAnalyticsRow[];
}

export function TopSchoolsChart({ bySchool }: TopSchoolsChartProps) {
  const t = useTranslations('AgentAnalytics');
  const data = [...bySchool]
    .sort((a, b) => b.submitted - a.submitted)
    .slice(0, TOP_SCHOOLS_LIMIT)
    .map((row) => ({
      school: truncateChartLabel(row.schoolName ?? t('unnamedSchool')),
      submitted: row.submitted,
    }));

  return (
    <section className='flex flex-col gap-5 rounded-xl bg-card p-6 shadow-1'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-base font-semibold text-ink-900'>{t('chartTitle')}</h2>
        <span className='text-xs text-foggy'>{t('chartCaption')}</span>
      </div>
      <div className='h-48 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <XAxis
              dataKey='school'
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--foggy)', fontSize: 12 }}
              dy={6}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelStyle={{ color: 'var(--ink-900)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--foggy)' }}
            />
            <Bar
              dataKey='submitted'
              name={t('chartSeries')}
              fill={SUBMITTED_BAR_FILL}
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
