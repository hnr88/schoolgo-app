import { Skeleton } from '@/components/ui/skeleton';

export function ParentOffersSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-5 w-40' />
              <Skeleton className='h-4 w-28' />
            </div>
            <Skeleton className='h-6 w-20 rounded-full' />
          </div>
          <Skeleton className='h-16 w-full rounded-md' />
          <div className='flex gap-3'>
            <Skeleton className='h-9 flex-1 rounded-md' />
            <Skeleton className='h-9 flex-1 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
