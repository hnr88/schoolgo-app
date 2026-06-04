import { cn } from '@/lib/utils';
import type { EmptyStateProps } from '@/modules/core/types/component.types';

export function EmptyState({ icon: Icon, title, description, action, framed }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        framed
          ? 'rounded-lg border border-dashed border-border bg-card px-6 py-12'
          : 'py-12',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full',
          framed ? 'h-14 w-14 bg-rausch-50' : 'h-14 w-14 bg-muted',
        )}
      >
        <Icon className={cn('h-6 w-6', framed ? 'text-primary-strong' : 'text-muted-foreground')} />
      </div>
      <p className={cn('mt-4 font-semibold', framed ? 'text-base text-ink-900' : 'text-sm text-foreground')}>
        {title}
      </p>
      {description && (
        <p className={cn('mt-1 max-w-sm', framed ? 'text-sm text-foggy' : 'text-xs text-muted-foreground')}>
          {description}
        </p>
      )}
      {action && <div className={framed ? 'mt-5' : 'mt-4'}>{action}</div>}
    </div>
  );
}
