import { Skeleton } from '@/components/ui/skeleton';

export function CalendarSkeleton() {
  return (
    <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-3 2xl:grid-cols-4'>
      <Skeleton className='h-96 w-full rounded-xl lg:col-span-2 2xl:col-span-3' />
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-8 w-48 rounded-lg' />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-20 w-full rounded-lg' />
        ))}
      </div>
    </div>
  );
}
