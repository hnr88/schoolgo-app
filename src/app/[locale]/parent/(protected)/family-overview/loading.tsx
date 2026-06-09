import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-10 w-64 rounded-lg' />
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-12 w-full rounded-xl' />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-14 w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
}
