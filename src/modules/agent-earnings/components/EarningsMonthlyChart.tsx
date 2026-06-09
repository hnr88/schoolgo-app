'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { formatAud } from '@/modules/agent-payments';
import { formatMonthLabel } from '@/modules/agent-earnings/lib/format-month';
import { CHART_TOOLTIP_STYLE, MONTHLY_BAR_FILL } from '@/modules/agent-earnings/constants/agent-earnings.constants';
import type { MonthlyEarnings } from '@/modules/agent-earnings/types/agent-earnings.types';

interface EarningsMonthlyChartProps {
  byMonth: MonthlyEarnings[];
}

export function EarningsMonthlyChart({ byMonth }: EarningsMonthlyChartProps) {
  const t = useTranslations('AgentEarnings');
  const locale = useLocale();
  const data = byMonth.map((point) => ({
    month: formatMonthLabel(point.month, locale),
    completedAud: point.completedAud,
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
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--foggy)', fontSize: 12 }}
              dy={6}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelStyle={{ color: 'var(--ink-900)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--foggy)' }}
              formatter={(value) => formatAud(Number(value))}
            />
            <Bar
              dataKey='completedAud'
              name={t('chartSeries')}
              fill={MONTHLY_BAR_FILL}
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
