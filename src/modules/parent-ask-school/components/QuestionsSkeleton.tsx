import { Skeleton } from '@/components/ui/skeleton';

export function QuestionsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-4 rounded-xl bg-card p-6 shadow-1'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-5 w-48' />
              <Skeleton className='h-4 w-32' />
            </div>
            <Skeleton className='h-6 w-20 rounded-full' />
          </div>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-16 w-full rounded-md' />
        </div>
      ))}
    </div>
  );
}
