import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function ParentReviewsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {[0, 1].map((index) => (
        <SurfaceCard key={index} padding='lg' className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Skeleton className='h-6 w-48 rounded-md' />
            <Skeleton className='h-9 w-32 rounded-md' />
          </div>
          <Skeleton className='h-24 w-full rounded-xl' />
        </SurfaceCard>
      ))}
    </div>
  );
}
