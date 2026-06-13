import { Skeleton } from '@/components/ui/skeleton';

export function PipelineForecastSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='h-24 w-full rounded-xl' />
        ))}
      </div>
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-72 w-full rounded-xl' />
    </div>
  );
}
