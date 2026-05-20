import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function MetricStripBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='overview' eyebrow='Metrics' title='Fast page proof' description='A compact proof strip works across hubs, detail pages, and policy pages.' tone='muted'>
      <div className='grid gap-4 md:grid-cols-3'>
        {page.metrics.map((metric) => (
          <div key={metric.label} className='rounded-lg border border-border bg-card p-5 shadow-1'>
            <p className='text-3xl font-bold text-ink-900'>{metric.value}</p>
            <p className='mt-2 text-sm text-foggy'>{metric.label}</p>
          </div>
        ))}
      </div>
    </BlockShell>
  );
}
