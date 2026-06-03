import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import type { IconComponent } from '@/modules/design-system';

interface SchoolSectionHeaderProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: ComponentProps<typeof Link>['href'];
  viewAllLabel?: string;
}

export function SchoolSectionHeader({
  title,
  icon: Icon,
  viewAllHref,
  viewAllLabel,
}: SchoolSectionHeaderProps) {
  return (
    <div className='flex items-center justify-between gap-3 border-b border-divider px-5 py-4'>
      <h2 className='flex items-center gap-2 text-base font-bold text-ink-900'>
        <Icon className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className='flex items-center gap-1 rounded-md text-sm font-semibold text-primary-strong no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          {viewAllLabel}
          <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
        </Link>
      )}
    </div>
  );
}
