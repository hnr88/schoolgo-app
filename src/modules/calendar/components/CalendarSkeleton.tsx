import { Skeleton } from '@/components/ui/skeleton';

export function CalendarSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]'>
      <Skeleton className='h-80 w-full rounded-lg lg:w-80' />
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-5 w-40' />
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='h-20 w-full rounded-lg' />
        ))}
      </div>
    </div>
  );
}
