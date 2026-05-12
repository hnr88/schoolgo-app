import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='min-h-screen w-full'>
      <div className='flex h-16 w-full items-center justify-between border-b border-border px-6'>
        <Skeleton className='h-8 w-32' />
        <div className='flex items-center gap-3'>
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-24' />
        </div>
      </div>

      <div className='mx-auto max-w-content px-6 py-8'>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-3 lg:w-72 lg:shrink-0'>
            <Skeleton className='h-10 w-full rounded-lg' />
            <Skeleton className='h-48 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
          </div>

          <div className='flex flex-1 flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-36' />
              <Skeleton className='h-8 w-28 rounded-lg' />
            </div>
            <Skeleton className='h-32 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
            <Skeleton className='h-32 w-full rounded-xl' />
          </div>
        </div>
      </div>
    </div>
  );
}
