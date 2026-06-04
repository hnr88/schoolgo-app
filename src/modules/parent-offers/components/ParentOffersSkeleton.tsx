import { Skeleton } from '@/components/ui/skeleton';

export function ParentOffersSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'
        >
          <div className='h-1 w-full bg-muted' />
          <div className='flex flex-col gap-4 p-5'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-5 w-40' />
                <Skeleton className='h-4 w-28' />
              </div>
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
            <Skeleton className='h-28 w-full rounded-md' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-11 w-full rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
