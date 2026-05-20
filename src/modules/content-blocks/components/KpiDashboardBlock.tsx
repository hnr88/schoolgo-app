import { BarChart3, TrendingUp } from 'lucide-react';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function KpiDashboardBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='KPI dashboard'
      title='Executive snapshot'
      description='A dashboard-style block for enterprise pages that need measurable health, readiness, or conversion signals.'
      tone='dark'
    >
      <div className='grid gap-5 lg:grid-cols-3'>
        {page.metrics.map((metric) => (
          <div key={metric.label} className='rounded-lg border border-background bg-background p-6 text-ink-900 transition-transform duration-300 hover:-translate-y-1'>
            <BarChart3 className='h-6 w-6 text-primary' aria-hidden='true' />
            <p className='mt-5 text-3xl font-bold'>{metric.value}</p>
            <p className='mt-2 text-sm font-semibold uppercase text-foggy'>{metric.label}</p>
          </div>
        ))}
      </div>
      <div className='mt-5 grid gap-4 lg:grid-cols-3'>
        {page.proofPoints.map((point) => (
          <div key={point.label} className='rounded-lg border border-background p-5 transition-colors hover:bg-background/10'>
            <p className='flex items-center gap-2 text-sm font-semibold text-background'>
              <TrendingUp className='h-4 w-4 text-background' aria-hidden='true' />
              {point.label}
            </p>
            <p className='mt-3 text-2xl font-bold text-background'>{point.confidence}</p>
            <p className='mt-1 text-sm text-background'>{point.detail}</p>
            <StatusBadge tone='muted' className='mt-4 bg-background text-ink-900'>Visible proof</StatusBadge>
          </div>
        ))}
      </div>
    </BlockShell>
  );
}
