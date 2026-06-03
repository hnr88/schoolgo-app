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
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
      <ParentSectionHeader
        title={title}
        icon={icon}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
      />
      <div className='flex flex-1 flex-col px-5 py-4'>{children}</div>
    </section>
  );
}
