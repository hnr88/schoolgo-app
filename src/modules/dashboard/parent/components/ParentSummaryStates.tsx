import { Skeleton } from '@/components/ui/skeleton';

export function ParentSummaryRowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className='flex flex-col divide-y divide-divider'>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className='flex items-center gap-3 px-5 py-3.5'>
          <Skeleton className='h-9 w-9 shrink-0 rounded-full' />
          <div className='flex flex-1 flex-col gap-1.5'>
            <Skeleton className='h-3.5 w-2/5' />
            <Skeleton className='h-3 w-1/4' />
          </div>
          <Skeleton className='h-5 w-16 rounded-full' />
        </div>
      ))}
    </div>
  );
}
