import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function TrainingSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-24 rounded-xl' />
        ))}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <SurfaceCard key={i} className='flex flex-col gap-3'>
            <Skeleton className='h-5 w-2/3' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/2' />
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
