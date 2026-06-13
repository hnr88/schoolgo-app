import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { FOCUS_RING } from '@/modules/core';
import { cn } from '@/lib/utils';
import type { IconComponent } from '@/modules/design-system';

interface DashboardSectionHeaderProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: ComponentProps<typeof Link>['href'];
  viewAllLabel?: string;
}

export function DashboardSectionHeader({
  title,
  icon: Icon,
  viewAllHref,
  viewAllLabel,
}: DashboardSectionHeaderProps) {
  return (
    <div className='flex items-center justify-between gap-3 border-b border-divider px-6 py-4'>
      <h2 className='flex items-center gap-2 text-card-title font-semibold text-ink-900'>
        <Icon className='h-5 w-5 text-foggy' strokeWidth={1.75} aria-hidden='true' />
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className={cn(
            'flex items-center gap-1 rounded-md text-sm font-semibold text-primary-strong no-underline hover:underline',
            FOCUS_RING,
          )}
        >
          {viewAllLabel}
          <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
        </Link>
      )}
    </div>
  );
}
