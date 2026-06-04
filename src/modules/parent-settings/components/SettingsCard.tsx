import type { ComponentType, ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { SectionHeading, SurfaceCard } from '@/modules/core';

interface SettingsCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsCard({ icon, title, description, children }: SettingsCardProps) {
  return (
    <SurfaceCard elevation='flat' padding='lg'>
      <div className='flex flex-col gap-6'>
        <SectionHeading icon={icon} title={title} description={description} level={2} />
        <Separator />
        {children}
      </div>
    </SurfaceCard>
  );
}
