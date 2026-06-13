import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function ShortlistSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 2 }).map((_, index) => (
        <SurfaceCard key={index} className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Skeleton className='h-6 w-40 rounded-md' />
            <Skeleton className='h-8 w-32 rounded-md' />
          </div>
          <Skeleton className='h-4 w-24 rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
        </SurfaceCard>
      ))}
    </div>
  );
}
