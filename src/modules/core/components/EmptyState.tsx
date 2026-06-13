import { cn } from '@/lib/utils';
import type { EmptyStateProps } from '@/modules/core/types/component.types';

export function EmptyState({ icon: Icon, title, description, action, framed }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        framed && 'rounded-lg border border-divider bg-card shadow-2',
      )}
    >
      <span className='flex size-12 items-center justify-center rounded-pill bg-gray-50'>
        <Icon className='size-5 text-foggy' aria-hidden='true' />
      </span>
      <p className='mt-4 font-display text-section-h2 font-semibold text-ink-900'>
        {title}
      </p>
      {description && (
        <p className='mt-2 max-w-xs text-sm text-foggy'>{description}</p>
      )}
      {action && <div className='mt-6'>{action}</div>}
    </div>
  );
}
