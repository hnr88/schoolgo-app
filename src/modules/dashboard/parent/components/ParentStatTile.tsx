import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import type { ParentStatTileConfig } from '@/modules/dashboard/parent/types/parent-dashboard.types';

interface ParentStatTileProps {
  config: ParentStatTileConfig;
  label: string;
  count: number;
  isLoading: boolean;
}

export function ParentStatTile({ config, label, count, isLoading }: ParentStatTileProps) {
  const { href, icon: Icon, iconBg, iconColor } = config;

  return (
    <Link
      href={href}
      className='group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 no-underline shadow-1 transition-transform duration-200 ease-out-quart hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
          iconBg,
          iconColor,
        )}
      >
        <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
      </span>
      {isLoading ? (
        <Skeleton className='h-8 w-12' />
      ) : (
        <span className='text-3xl font-bold leading-none text-ink-900 tabular-nums'>{count}</span>
      )}
      <span className='text-sm font-medium text-foggy'>{label}</span>
    </Link>
  );
}
