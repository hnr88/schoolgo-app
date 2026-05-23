import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { ContentFeatureCard } from '@/modules/content-pages/components/ContentFeatureCard';
import type { ContentFeatureGridProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentFeatureGrid({ title, description, features }: ContentFeatureGridProps) {
  return (
    <section id='details' className='bg-background py-12 md:py-16'>
      <SectionContainer>
        <SectionHeader eyebrow='Details' heading={title} subheading={description} />
        <div className='mt-8 grid gap-5 md:grid-cols-3'>
          {features.map((feature) => (
            <ContentFeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
