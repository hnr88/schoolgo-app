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
    <section className='flex h-full flex-col gap-5 rounded-xl border border-gray-100 bg-gray-50 p-6'>
      <ParentSectionHeader
        title={title}
        icon={icon}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
      />
      <div className='flex flex-1 flex-col'>{children}</div>
    </section>
  );
}
