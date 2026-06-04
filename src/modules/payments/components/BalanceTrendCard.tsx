'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { BALANCE_TREND, TREND_STROKE } from '@/modules/payments/constants/payments.constants';
import { formatAud, formatMonthShort } from '@/modules/payments/lib/format-payments';

const TOOLTIP_STYLE = {
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)',
  backgroundColor: 'var(--card)',
  boxShadow: 'var(--shadow-2)',
  fontSize: '12px',
} as const;

export function BalanceTrendCard() {
  const t = useTranslations('ParentPayments');
  const locale = useLocale();
  const data = BALANCE_TREND.map((point) => ({
    month: formatMonthShort(point.monthIndex, locale),
    value: point.value,
  }));
  const lifetime = data[data.length - 1]?.value ?? 0;

  return (
    <section className='flex h-full flex-col gap-5 rounded-xl bg-card p-6 shadow-1'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-base font-semibold text-ink-900'>{t('trend.title')}</h2>
        <span className='font-display text-2xl font-bold tabular-nums text-ink-900'>
          {formatAud(lifetime)}
        </span>
        <span className='text-xs text-foggy'>{t('trend.caption')}</span>
      </div>
      <div className='h-40 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id='paymentsTrendFill' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={TREND_STROKE} stopOpacity={0.18} />
                <stop offset='100%' stopColor={TREND_STROKE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--foggy)', fontSize: 12 }}
              dy={6}
            />
            <Tooltip
              cursor={{ stroke: 'var(--divider)' }}
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: 'var(--ink-900)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--foggy)' }}
              formatter={(value) => formatAud(Number(value))}
            />
            <Area
              type='monotone'
              dataKey='value'
              name={t('trend.title')}
              stroke={TREND_STROKE}
              strokeWidth={2}
              fill='url(#paymentsTrendFill)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
