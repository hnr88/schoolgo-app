'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import {
  EARNING_OVERVIEW,
  EARNING_SERIES_COLORS,
} from '@/modules/payments/constants/payments.constants';
import { formatAud, formatMonthShort } from '@/modules/payments/lib/format-payments';

const TOOLTIP_STYLE = {
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)',
  backgroundColor: 'var(--card)',
  boxShadow: 'var(--shadow-2)',
  fontSize: '12px',
} as const;

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className='inline-flex items-center gap-1.5 text-xs font-medium text-foggy'>
      <span className='h-2 w-2 rounded-full' style={{ backgroundColor: color }} aria-hidden='true' />
      {label}
    </span>
  );
}

export function EarningOverviewCard() {
  const t = useTranslations('ParentPayments');
  const locale = useLocale();
  const data = EARNING_OVERVIEW.map((point) => ({
    month: formatMonthShort(point.monthIndex, locale),
    paid: point.paid,
    scheduled: point.scheduled,
  }));

  return (
    <section className='flex h-full flex-col gap-5 rounded-xl bg-card p-6 shadow-1'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-base font-semibold text-ink-900'>{t('earning.title')}</h2>
        <div className='flex items-center gap-4'>
          <LegendDot color={EARNING_SERIES_COLORS.paid} label={t('earning.paid')} />
          <LegendDot color={EARNING_SERIES_COLORS.scheduled} label={t('earning.scheduled')} />
        </div>
      </div>
      <div className='h-64 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} barGap={4} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke='var(--divider)' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--foggy)', fontSize: 12 }}
              dy={6}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: 'var(--ink-900)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--foggy)' }}
              formatter={(value) => formatAud(Number(value))}
            />
            <Bar dataKey='paid' name={t('earning.paid')} fill={EARNING_SERIES_COLORS.paid} radius={[4, 4, 0, 0]} maxBarSize={16} />
            <Bar dataKey='scheduled' name={t('earning.scheduled')} fill={EARNING_SERIES_COLORS.scheduled} radius={[4, 4, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
