import { Skeleton } from '@/components/ui/skeleton';
import { SurfaceCard } from '@/modules/core';

export function SettingsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-11 w-full max-w-md rounded-lg' />
      <SurfaceCard elevation='flat' padding='lg'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-9 w-9 rounded-md' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-5 w-40' />
              <Skeleton className='h-4 w-56' />
            </div>
          </div>
          <Skeleton className='h-px w-full' />
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-32' />
        </div>
      </SurfaceCard>
    </div>
  );
}
