import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-72' />
      </div>
      <div className='grid h-[calc(100vh-16rem)] min-h-96 grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]'>
        <div className='flex flex-col gap-3 rounded-xl border border-border bg-card p-4'>
          <Skeleton className='h-10 w-full' />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2 px-4 py-3'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-3 w-2/3' />
            </div>
          ))}
        </div>
        <div className='hidden rounded-xl border border-border bg-card p-4 lg:block'>
          <Skeleton className='h-full w-full rounded-xl' />
        </div>
      </div>
    </div>
  );
}
