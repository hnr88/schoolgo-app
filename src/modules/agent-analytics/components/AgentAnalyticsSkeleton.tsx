import { Skeleton } from '@/components/ui/skeleton';

export function AgentAnalyticsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className='h-24 w-full rounded-xl' />
        ))}
      </div>
      <Skeleton className='h-72 w-full rounded-xl' />
      <Skeleton className='h-64 w-full rounded-xl' />
    </div>
  );
}
