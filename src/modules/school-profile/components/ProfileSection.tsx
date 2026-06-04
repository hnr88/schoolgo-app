import type { ComponentType, ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { SectionHeading, SurfaceCard } from '@/modules/core';

interface ProfileSectionProps {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}

export function ProfileSection({ title, description, icon, children }: ProfileSectionProps) {
  return (
    <SurfaceCard
      elevation='flat'
      padding='lg'
      className='flex flex-col gap-5'
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
