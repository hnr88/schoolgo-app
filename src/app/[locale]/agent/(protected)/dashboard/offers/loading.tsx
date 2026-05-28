import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-4 w-72' />
      </div>

      <div className='flex flex-col gap-4'>
        <Skeleton className='h-5 w-40' />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Skeleton className='h-48 w-full rounded-xl' />
          <Skeleton className='h-48 w-full rounded-xl' />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <Skeleton className='h-5 w-40' />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Skeleton className='h-48 w-full rounded-xl' />
          <Skeleton className='h-48 w-full rounded-xl' />
        </div>
      </div>
    </div>
  );
}
