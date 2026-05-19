import type { ContentMetric } from '@/modules/content-pages/types/content-pages.types';

export function ContentMetricCard({ metric }: { metric: ContentMetric }) {
  return (
    <div className='rounded-lg border border-border bg-card p-5 shadow-1'>
      <p className='text-3xl font-bold text-ink-900'>{metric.value}</p>
      <p className='mt-2 text-sm leading-6 text-foggy'>{metric.label}</p>
    </div>
  );
}
