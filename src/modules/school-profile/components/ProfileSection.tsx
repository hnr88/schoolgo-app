import type { ComponentType, ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { SectionHeading, SurfaceCard } from '@/modules/core';

interface ProfileSectionProps {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  id?: string;
  children: ReactNode;
}

export function ProfileSection({ title, description, icon, id, children }: ProfileSectionProps) {
  return (
    <SurfaceCard
      id={id}
      elevation='raised'
      padding='lg'
      className='flex scroll-mt-6 flex-col gap-5'
    >
      <SectionHeading
        title={title}
        description={description}
        level={2}
        icon={icon}
        className='[&_span]:bg-arches-50 [&_span]:text-arches-700'
      />
      <Separator className='bg-divider' />
      {children}
    </SurfaceCard>
  );
}
