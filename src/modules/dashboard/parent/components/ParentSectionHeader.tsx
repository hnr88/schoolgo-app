import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ComponentProps } from 'react';
import { FOCUS_RING } from '@/modules/core';
import { cn } from '@/lib/utils';
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
    <div className='flex items-center justify-between gap-3'>
      <h2 className='flex items-center gap-2 text-card-title font-semibold text-ink-900'>
        <Icon className='h-5 w-5 text-foggy' strokeWidth={1.75} aria-hidden='true' />
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className={cn(
            'group inline-flex items-center gap-1 rounded-md text-sm font-semibold text-primary-strong no-underline transition-colors duration-200 ease-out-quart hover:text-ink-900',
            FOCUS_RING,
          )}
        >
          {viewAllLabel}
          <ArrowRight
            className='h-3.5 w-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5'
            strokeWidth={2}
            aria-hidden='true'
          />
        </Link>
      )}
    </div>
  );
}
