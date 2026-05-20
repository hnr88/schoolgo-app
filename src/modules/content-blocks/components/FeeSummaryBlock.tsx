import { Wallet } from 'lucide-react';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function FeeSummaryBlock({ page }: ContentBlockProps) {
  const rows = [
    { label: 'Planning range', value: page.metrics[0]?.value ?? '3 steps' },
    { label: 'Cost detail', value: 'Tuition, extras, deposits' },
    { label: 'Next action', value: 'Confirm with school' },
  ];
  return (
    <BlockShell eyebrow='Fees' title='Fee summary panel' description='This compact summary can appear inside tuition, boarding, or school profile pages.' tone='muted'>
      <div className='rounded-xl border border-border bg-card p-6 shadow-2'>
        <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
          <div className='flex items-center gap-3'>
          <span className='flex h-11 w-11 items-center justify-center rounded-lg bg-arches-50 text-arches-700'>
            <Wallet className='h-5 w-5' aria-hidden='true' />
          </span>
            <div>
              <h3 className='text-xl font-semibold text-ink-900'>Cost snapshot</h3>
              <p className='text-sm text-hof'>Starter values for reusable layout testing.</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            {page.searchSignals.slice(0, 3).map((signal) => (
              <StatusBadge key={signal.label} tone={signal.tone}>{signal.value}</StatusBadge>
            ))}
          </div>
        </div>
        <dl className='mt-6 grid gap-3 md:grid-cols-3'>
          {rows.map((row) => (
            <div key={row.label} className='rounded-lg bg-muted p-4'>
              <dt className='text-xs font-semibold uppercase text-foggy'>{row.label}</dt>
              <dd className='mt-2 text-sm font-semibold text-ink-900'>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </BlockShell>
  );
}
