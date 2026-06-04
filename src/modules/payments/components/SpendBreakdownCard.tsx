'use client';

import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SPEND_BREAKDOWN } from '@/modules/payments/constants/payments.constants';
import { formatAud } from '@/modules/payments/lib/format-payments';

const TOOLTIP_STYLE = {
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)',
  backgroundColor: 'var(--card)',
  boxShadow: 'var(--shadow-2)',
  fontSize: '12px',
} as const;

export function SpendBreakdownCard() {
  const t = useTranslations('ParentPayments');
  const total = SPEND_BREAKDOWN.reduce((sum, item) => sum + item.value, 0);
  const data = SPEND_BREAKDOWN.map((item) => ({ ...item, label: t(item.labelKey) }));

  return (
    <section className='flex h-full flex-col gap-5 rounded-xl bg-card p-6 shadow-1'>
      <h2 className='text-base font-semibold text-ink-900'>{t('breakdown.title')}</h2>
      <div className='relative mx-auto h-44 w-44'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              itemStyle={{ color: 'var(--foggy)' }}
              formatter={(value) => formatAud(Number(value))}
            />
            <Pie
              data={data}
              dataKey='value'
              nameKey='label'
              innerRadius={56}
              outerRadius={80}
              paddingAngle={2}
              stroke='var(--card)'
              strokeWidth={2}
            >
              {data.map((item) => (
                <Cell key={item.key} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-xs font-medium uppercase tracking-wide text-foggy'>
            {t('breakdown.total')}
          </span>
          <span className='font-display text-xl font-bold tabular-nums text-ink-900'>
            {formatAud(total)}
          </span>
        </div>
      </div>
      <ul className='flex flex-col gap-2.5'>
        {data.map((item) => (
          <li key={item.key} className='flex items-center justify-between gap-2 text-sm'>
            <span className='flex items-center gap-2 text-foggy'>
              <span className='h-2 w-2 rounded-full' style={{ backgroundColor: item.color }} aria-hidden='true' />
              {item.label}
            </span>
            <span className='font-semibold tabular-nums text-ink-900'>{formatAud(item.value)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
