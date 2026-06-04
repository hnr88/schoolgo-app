'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function NotificationsSkeleton() {
  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-3'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex items-start gap-3'>
          <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
          <div className='flex flex-1 flex-col gap-2'>
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-3 w-2/3' />
          </div>
        </div>
      ))}
    </SurfaceCard>
  );
}
