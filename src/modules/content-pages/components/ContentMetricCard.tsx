import type { ContentMetricCardProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentMetricCard({ metric }: ContentMetricCardProps) {
  return (
    <div className='rounded-lg border border-border bg-card p-5 shadow-1'>
      <p className='text-3xl font-bold text-ink-900'>{metric.value}</p>
      <p className='mt-2 text-sm leading-6 text-foggy'>{metric.label}</p>
    </div>
  );
}
