import { ArrowDownRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { surfaceCardVariants } from '@/modules/core/components/SurfaceCard';
import type { StatTileProps } from '@/modules/core/types/component.types';

function DeltaChip({ delta }: { delta: NonNullable<StatTileProps['delta']> }) {
  const isUp = delta.direction === 'up';
  const isDown = delta.direction === 'down';
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : ArrowRight;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums',
        isUp && 'bg-vivid-mint-soft text-vivid-mint',
        isDown && 'bg-vivid-coral-soft text-vivid-coral-strong',
        !isUp && !isDown && 'bg-muted text-foggy',
      )}
    >
      <Icon className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
      {delta.label}
    </span>
  );
}

/** Strip any pastel `bg-*` token so iconClassName only tints the icon, never boxes it. */
function iconTint(iconClassName?: string) {
  const tint = (iconClassName ?? '')
    .split(/\s+/)
    .filter((token) => token && !token.startsWith('bg-'))
    .join(' ');
  return tint || 'text-foggy';
}

function TileInner({
  icon: Icon,
  iconClassName,
  label,
  value,
  subMetric,
  delta,
  isLoading,
  href,
}: StatTileProps) {
  return (
    <>
      <div className='flex items-start justify-between gap-2'>
        <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>{label}</span>
        <span className='flex items-center gap-2'>
          {delta ? <DeltaChip delta={delta} /> : null}
          <Icon
            className={cn('h-4 w-4 shrink-0', iconTint(iconClassName))}
            strokeWidth={1.75}
            aria-hidden='true'
          />
          {href ? (
            <ArrowRight
              className='h-4 w-4 -translate-x-1 text-foggy opacity-0 transition duration-200 ease-out-quart group-hover:translate-x-0 group-hover:opacity-100'
              strokeWidth={2}
              aria-hidden='true'
            />
          ) : null}
        </span>
      </div>
      {isLoading ? (
        <Skeleton className='mt-1 h-9 w-16' />
      ) : (
        <span className='font-display text-3xl font-bold leading-none tracking-tight text-ink-900 tabular-nums'>
          {value}
        </span>
      )}
      {subMetric ? (
        <span className='text-xs text-muted-foreground'>{subMetric}</span>
      ) : null}
    </>
  );
}

export function StatTile(props: StatTileProps) {
  const { href, className } = props;
  const base = cn(
    surfaceCardVariants({ elevation: href ? 'interactive' : 'flat', padding: 'sm' }),
    'group flex flex-col gap-2',
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          base,
          'no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <TileInner {...props} />
      </Link>
    );
  }

  return (
    <div className={base}>
      <TileInner {...props} />
    </div>
  );
}
