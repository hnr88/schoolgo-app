import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-64' />
        </div>
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>

      <div className='flex gap-3'>
        <Skeleton className='h-10 w-48 rounded-md' />
        <Skeleton className='h-10 w-48 rounded-md' />
        <Skeleton className='h-10 w-44 rounded-md' />
      </div>

      <Skeleton className='h-64 w-full rounded-lg' />
    </div>
  );
}
