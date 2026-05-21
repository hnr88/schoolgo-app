import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function MetricStripBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='overview' eyebrow='Metrics' title='Fast page proof' description='A compact proof strip works across hubs, detail pages, and policy pages.' tone='plain'>
      <div className='relative z-10 -mt-20 grid overflow-hidden rounded-lg border border-divider bg-card shadow-3 md:grid-cols-3'>
        {page.metrics.map((metric) => (
          <div key={metric.label} className='border-b border-divider p-5 text-center transition-colors hover:bg-muted md:border-b-0 md:border-r md:last:border-r-0'>
            <p className='text-xs font-semibold uppercase text-foggy'>{metric.label}</p>
            <p className='mt-3 text-3xl font-bold text-ink-900'>{metric.value}</p>
            <p className='mt-2 text-sm text-foggy'>{page.aiSummary.intent}</p>
          </div>
        ))}
      </div>
    </BlockShell>
  );
}
