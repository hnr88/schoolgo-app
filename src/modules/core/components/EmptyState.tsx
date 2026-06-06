import { cn } from '@/lib/utils';
import type { EmptyStateProps } from '@/modules/core/types/component.types';

export function EmptyState({ icon: Icon, title, description, action, framed }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        framed
          ? 'rounded-xl border border-divider bg-card px-6 py-12 shadow-1'
          : 'py-8',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full',
          framed
            ? 'h-16 w-16 ring-1 ring-rausch-100'
            : 'h-12 w-12 bg-muted ring-1 ring-divider',
        )}
      >
        {framed ? (
          <span className='flex h-12 w-12 items-center justify-center rounded-full bg-rausch-50'>
            <Icon className='h-5 w-5 text-primary-strong' />
          </span>
        ) : (
          <Icon className='h-5 w-5 text-muted-foreground' />
        )}
      </div>
      <p
        className={cn(
          'font-semibold',
          framed ? 'mt-5 text-base text-ink-900' : 'mt-3 text-sm text-foreground',
        )}
      >
        {title}
      </p>
      {description && (
        <p
          className={cn(
            'max-w-xs',
            framed ? 'mt-2 text-sm text-foggy' : 'mt-1 text-xs text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
      {action && <div className={framed ? 'mt-6' : 'mt-4'}>{action}</div>}
    </div>
  );
}
