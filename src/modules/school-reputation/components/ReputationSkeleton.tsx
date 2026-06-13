import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function ReputationSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[0, 1, 2, 3].map((index) => (
          <SurfaceCard key={index} padding='sm' className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-24 rounded-md' />
            <Skeleton className='h-9 w-16 rounded-md' />
          </SurfaceCard>
        ))}
      </div>
      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <Skeleton className='h-6 w-40 rounded-md' />
        <Skeleton className='h-40 w-full rounded-xl' />
      </SurfaceCard>
      {[0, 1].map((index) => (
        <SurfaceCard key={index} padding='lg' className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Skeleton className='h-6 w-48 rounded-md' />
            <Skeleton className='h-6 w-24 rounded-md' />
          </div>
          <Skeleton className='h-20 w-full rounded-xl' />
        </SurfaceCard>
      ))}
    </div>
  );
}
