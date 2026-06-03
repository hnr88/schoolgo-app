import { Skeleton } from '@/components/ui/skeleton';

export function ToursSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between'
        >
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-48' />
            <Skeleton className='h-4 w-36' />
            <Skeleton className='h-4 w-28' />
          </div>
          <Skeleton className='h-9 w-28 rounded-md' />
        </div>
      ))}
    </div>
  );
}
