import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-8'>
      {/* header: greeting + primary action */}
      <div className='flex flex-wrap items-center justify-between gap-4 border-b border-divider pb-6'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-4 w-48' />
        </div>
        <Skeleton className='h-10 w-36 rounded-md' />
      </div>

      {/* stat tiles */}
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32 w-full rounded-lg' />
        ))}
      </div>

      {/* main grid: recent applications + right rail */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <Skeleton className='h-80 w-full rounded-lg lg:col-span-2' />
        <div className='flex flex-col gap-6 lg:col-span-1'>
          <Skeleton className='h-44 w-full rounded-lg' />
          <Skeleton className='h-44 w-full rounded-lg' />
        </div>
      </div>

      {/* quick actions */}
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-5 w-32' />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-20 w-full rounded-lg' />
          ))}
        </div>
      </div>
    </div>
  );
}
