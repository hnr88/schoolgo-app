import { cn } from '@/lib/utils';
import type { FeatureCardProps } from '@/modules/design-system/types/design-system.types';

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconTone = 'brand',
  size = 'sm',
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3',
        size === 'sm' && 'gap-3 p-6',
        size === 'md' && 'gap-4 p-6 md:p-8',
        className,
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-pill',
          size === 'sm' && 'h-11 w-11',
          size === 'md' && 'h-12 w-12',
          iconTone === 'brand'
            ? 'bg-rausch-50 text-primary'
            : 'bg-babu-50 text-babu-700',
        )}
      >
        <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
      </span>
      <h3
        className={cn(
          'font-semibold text-ink-900',
          size === 'sm' ? 'text-h4' : 'text-h3',
        )}
      >
        {title}
      </h3>
      <p className='text-body-sm text-foggy'>{description}</p>
    </article>
  );
}
