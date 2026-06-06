import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-10 w-64 rounded-lg' />
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-24 w-full rounded-lg' />
        ))}
      </div>
      <Skeleton className='h-72 w-full rounded-xl' />
    </div>
  );
}
