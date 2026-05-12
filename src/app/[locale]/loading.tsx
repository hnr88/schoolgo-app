import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='min-h-screen w-full'>
      <div className='flex h-16 w-full items-center justify-between border-b border-border px-6'>
        <Skeleton className='h-8 w-32' />
        <div className='flex items-center gap-3'>
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-24' />
        </div>
      </div>
      <div className='mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-16'>
        <Skeleton className='h-10 w-2/3' />
        <Skeleton className='h-6 w-1/2' />
        <Skeleton className='h-12 w-40' />
      </div>
      <div className='mx-auto grid max-w-content grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3'>
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
      </div>
    </div>
  );
}
