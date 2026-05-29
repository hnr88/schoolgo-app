import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-9 w-48' />
      <div className='flex flex-col gap-3 rounded-xl border border-border bg-card p-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='flex items-start gap-3'>
            <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
            <div className='flex flex-1 flex-col gap-2'>
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-3 w-2/3' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
