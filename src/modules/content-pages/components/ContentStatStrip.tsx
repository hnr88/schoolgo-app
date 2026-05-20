import { SectionContainer } from '@/modules/design-system';
import { ContentMetricCard } from '@/modules/content-pages/components/ContentMetricCard';
import type { ContentStatStripProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentStatStrip({ metrics }: ContentStatStripProps) {
  return (
    <section id='overview' className='bg-muted py-12'>
      <SectionContainer>
        <div className='grid gap-4 md:grid-cols-3'>
          {metrics.map((metric) => (
            <ContentMetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
