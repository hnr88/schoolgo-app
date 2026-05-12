import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-20 w-full rounded-xl' />

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <Skeleton className='h-24 w-full rounded-xl' />
        <Skeleton className='h-24 w-full rounded-xl' />
        <Skeleton className='h-24 w-full rounded-xl' />
        <Skeleton className='h-24 w-full rounded-xl' />
      </div>

      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-16 w-full rounded-lg' />
          <Skeleton className='h-16 w-full rounded-lg' />
          <Skeleton className='h-16 w-full rounded-lg' />
          <Skeleton className='h-16 w-full rounded-lg' />
        </div>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-6 w-28' />
          <Skeleton className='h-14 w-full rounded-lg' />
          <Skeleton className='h-14 w-full rounded-lg' />
          <Skeleton className='h-14 w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
}
