'use client';

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
  const { icon: Icon, gradient, href } = config;

  return (
    <Link
      href={href as string}
      className={cn(
        'group relative flex min-h-32 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-background no-underline shadow-2 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        gradient,
      )}
    >
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-background/15'
      />
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-12 right-5 h-24 w-24 rotate-12 rounded-3xl bg-background/10'
      />

      <div className='relative flex items-center justify-between gap-2'>
        <span className='text-xs font-semibold uppercase tracking-wide text-background/85'>
          {label}
        </span>
        <Icon className='h-5 w-5 shrink-0 text-background/85' strokeWidth={1.75} aria-hidden='true' />
      </div>

      {isLoading ? (
        <Skeleton className='relative mt-2 h-10 w-16 bg-background/25' />
      ) : (
        <span className='relative font-display text-4xl font-bold leading-none tabular-nums text-background'>
          {count}
        </span>
      )}
    </Link>
  );
}
