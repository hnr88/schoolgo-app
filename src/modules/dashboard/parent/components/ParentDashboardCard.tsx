import { SurfaceCard } from '@/modules/core';
import { ParentSectionHeader } from '@/modules/dashboard/parent/components/ParentSectionHeader';
import type { ParentDashboardCardProps } from '@/modules/dashboard/parent/types/parent-dashboard.types';

export function ParentDashboardCard({
  title,
  icon,
  viewAllHref,
  viewAllLabel,
  children,
}: ParentDashboardCardProps) {
  return (
    <SurfaceCard className='flex h-full flex-col gap-6'>
      <ParentSectionHeader
        title={title}
        icon={icon}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
      />
      <div className='flex flex-1 flex-col'>{children}</div>
    </SurfaceCard>
  );
}
