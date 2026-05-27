import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ParentDashboardCardProps } from '@/modules/dashboard/parent/types/parent-dashboard.types';

export function ParentDashboardCard({
  title,
  icon: Icon,
  viewAllHref,
  viewAllLabel,
  children,
}: ParentDashboardCardProps) {
  return (
    <section className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-1'>
      <div className='flex items-center justify-between gap-3 border-b border-divider px-5 py-4'>
        <h2 className='flex items-center gap-2 text-base font-bold text-ink-900'>
          <Icon className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
          {title}
        </h2>
        {viewAllHref && viewAllLabel && (
          <Link
            href={viewAllHref}
            className='flex items-center gap-1 text-sm font-semibold text-primary no-underline hover:underline'
          >
            {viewAllLabel}
            <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
          </Link>
        )}
      </div>
      <div className='flex flex-1 flex-col'>{children}</div>
    </section>
  );
}
