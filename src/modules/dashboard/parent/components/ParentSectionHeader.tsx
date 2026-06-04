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
    <div className='flex items-center justify-between gap-3'>
      <h2 className='flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink-900'>
        <Icon className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className='group inline-flex items-center gap-1 text-sm font-semibold text-primary-strong no-underline transition-colors duration-200 ease-out-quart hover:text-ink-900'
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
