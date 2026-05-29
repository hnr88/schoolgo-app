import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-40' />
        <Skeleton className='h-4 w-72' />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-20 w-full rounded-xl' />
        ))}
      </div>
      <Skeleton className='h-48 w-full rounded-xl' />
      <Skeleton className='h-48 w-full rounded-xl' />
    </div>
  );
}
