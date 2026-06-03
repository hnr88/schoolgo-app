import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ComponentProps } from 'react';
import type { IconComponent } from '@/modules/design-system';

interface ParentSectionHeaderProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: ComponentProps<typeof Link>['href'];
  viewAllLabel?: string;
}

export function ParentSectionHeader({
  title,
  icon: Icon,
  viewAllHref,
  viewAllLabel,
}: ParentSectionHeaderProps) {
  return (
    <div className='flex items-center justify-between gap-3 border-b border-divider px-5 py-4'>
      <h2 className='flex items-center gap-2 text-base font-bold text-ink-900'>
        <Icon className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className='flex items-center gap-1 text-sm font-semibold text-primary-strong no-underline hover:underline'
        >
          {viewAllLabel}
          <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
        </Link>
      )}
    </div>
  );
}
